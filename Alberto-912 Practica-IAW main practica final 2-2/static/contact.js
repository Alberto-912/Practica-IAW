// funcion para validar el formulario
function validarFormulario(event) {
    let valido = true;
    
    // Eliminar los mensajes de error anteriores
    document.querySelectorAll('.error').forEach(function(element) {
        element.remove();
    });

    // Obtener los valores del html
    var nombre = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('message').value;

    // Validar que el nombre no esta vacio
    if (nombre.trim() === "") {
        mostrarError('name', "El campo nombre es obligatorio.");
        valido = false;
    }

    // Validar que el correo es un correo valido con una expresion regular que acepta correos
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(email)) {
        mostrarError('email', "Por favor, ingresa un correo electrónico válido.");
        valido = false;
    }

    // Validar que el mensaje no esta vacio
    if (mensaje.trim() === "") {
        mostrarError('message', "El campo mensaje es obligatorio.");
        valido = false;
    }

    // Si todo esta valido, mostrar alerta y refrescar página
    if (valido) {
        alert("Tu mensaje ha sido enviado correctamente, un agente contactará contingo pronto");
        window.location.href = "contact.html";
    }

    return valido; // Si hay un error, no envia el formulario
}
// Funcion para añadir el mensaje de error debajo de el campo que este mal
function mostrarError(id, mensaje) {
    var input = document.getElementById(id);
    var error = document.createElement("div");
    error.classList.add("error");
    error.textContent = mensaje;
    input.parentNode.appendChild(error);
}

// Validación en tiempo real, en cuanto se escribe algo erroneo en un campo salta el mensaje de error, cuando se soluciona, se quita
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
