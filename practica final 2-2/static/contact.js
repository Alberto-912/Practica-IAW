// contact.js

function validarFormulario(event) {
    let valido = true;
    
    // Eliminar los mensajes de error anteriores
    document.querySelectorAll('.error').forEach(function(element) {
        element.remove();
    });

    // Obtener los valores de los campos
    var nombre = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('message').value;

    // Validación de nombre
    if (nombre.trim() === "") {
        mostrarError('name', "El campo nombre es obligatorio.");
        valido = false;
    }

    // Validación de correo electrónico
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(email)) {
        mostrarError('email', "Por favor, ingresa un correo electrónico válido.");
        valido = false;
    }

    // Validación de mensaje
    if (mensaje.trim() === "") {
        mostrarError('message', "El campo mensaje es obligatorio.");
        valido = false;
    }

    // Si todo es válido, mostrar alerta y refrescar página
    if (valido) {
        alert("Tu mensaje ha sido enviado correctamente, un agente contactará contingo pronto");
        window.location.href = "contact.html";
    }

    return valido; // Si hay un error, no se enviará el formulario
}

function mostrarError(id, mensaje) {
    var input = document.getElementById(id);
    var error = document.createElement("div");
    error.classList.add("error");
    error.textContent = mensaje;
    input.parentNode.appendChild(error);
}

// Validación en tiempo real
function validarCampo(campo) {
    var input = document.getElementById(campo.id);
    var error = input.parentNode.querySelector('.error');
    if (error) {
        error.remove();
    }

    if (campo.id === 'name' && campo.value.trim() === "") {
        mostrarError(campo.id, "El campo nombre es obligatorio.");
    } else if (campo.id === 'email') {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regexEmail.test(campo.value)) {
            mostrarError(campo.id, "Por favor, ingresa un correo electrónico válido.");
        }
    } else if (campo.id === 'message' && campo.value.trim() === "") {
        mostrarError(campo.id, "El campo mensaje es obligatorio.");
    }
}
