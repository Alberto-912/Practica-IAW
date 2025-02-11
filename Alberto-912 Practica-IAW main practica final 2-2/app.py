from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Crea la Base de Datos si no existe, si existe conecta con ella
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

    # Obtener todas las reseñas de la BDD
    cursor.execute("SELECT nombre, comentario, calificacion FROM reseñas")
    reseñas = cursor.fetchall()

    # Calcular la media de calificación de la BDD
    cursor.execute("SELECT AVG(calificacion) FROM reseñas")
    media_calificacion = cursor.fetchone()[0] or 0

    conn.close()
    return render_template("index.html", reseñas=reseñas, media_calificacion=media_calificacion)

# Añadir reseñas a la base de datos
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

#Cargar las rutas de todos los html

@app.route('/locations')
def locations():
    return render_template('locations.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/flota')
def flota():
    return render_template('flota.html')

# En alquiler.html carga los datos que recoge del coche en flota.html
@app.route('/alquiler')
def alquiler():
    car_id = request.args.get('id')
    car_name = request.args.get('name')
    car_price = request.args.get('price')
    return render_template('alquiler.html', car_id=car_id, car_name=car_name, car_price=car_price)

if __name__ == "__main__":
    app.run(debug=True)
