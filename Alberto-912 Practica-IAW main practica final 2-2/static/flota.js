// Coge la información del coche para pasarlo a la pagina del alquiler.html
function seleccionarCoche(id, name, price) {
    window.location.href = `alquiler.html?id=${id}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
}