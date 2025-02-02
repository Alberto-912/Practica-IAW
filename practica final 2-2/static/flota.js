function seleccionarCoche(id, name, price) {
    window.location.href = `alquiler.html?id=${id}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
}