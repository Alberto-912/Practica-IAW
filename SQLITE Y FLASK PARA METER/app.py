from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Inicializar la base de datos
def init_db():
    conn = sqlite3.connect("reseñas.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reseñas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            comentario TEXT NOT NULL,
            calificacion INTEGER CHECK(calificacion BETWEEN 1 AND 5)
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def index():
    conn = sqlite3.connect("reseñas.db")
    cursor = conn.cursor()

    # Obtener todas las reseñas
    cursor.execute("SELECT nombre, comentario, calificacion FROM reseñas")
    reseñas = cursor.fetchall()

    # Calcular la media de calificación
    cursor.execute("SELECT AVG(calificacion) FROM reseñas")
    media_calificacion = cursor.fetchone()[0] or 0  # Si no hay reseñas, mostrar 0

    conn.close()
    return render_template("index.html", reseñas=reseñas, media_calificacion=media_calificacion)

@app.route("/agregar_resena", methods=["POST"])
def agregar_resena():
    nombre = request.form["nombre"]
    comentario = request.form["comentario"]
    calificacion = int(request.form["calificacion"])

    conn = sqlite3.connect("reseñas.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO reseñas (nombre, comentario, calificacion) VALUES (?, ?, ?)", 
                   (nombre, comentario, calificacion))
    conn.commit()
    conn.close()

    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
