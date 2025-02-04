document.addEventListener("DOMContentLoaded", function () {
    // Para que se pongan correctamente los datos del coche seleccionado en flota.html
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("id");
    const carName = urlParams.get("name");
    const carPrice = parseFloat(urlParams.get("price")) || 0;
  
    const carTitleElem = document.getElementById("car-title");
    const carPriceElem = document.getElementById("car-price");
    const carImageElem = document.getElementById("car-image");
  
    if (carTitleElem) carTitleElem.textContent = carName;
    if (carPriceElem) carPriceElem.textContent = `${carPrice} €/día`;
    if (carImageElem) carImageElem.src = "/static/fotos coches/" + carId + ".webp";
  
    // Función para calcular el precio del alquiler con los dias seleccionados
    function calculateTotal() {
      const startDateField = document.getElementById("start-date");
      const endDateField = document.getElementById("end-date");
      const dateError = document.getElementById("date-error");
      const totalPriceElem = document.getElementById("total-price");
  
      const startDate = startDateField && startDateField.value ? new Date(startDateField.value) : null;
      const endDate = endDateField && endDateField.value ? new Date(endDateField.value) : null;
  
      if (!startDate || !endDate) {
        if (totalPriceElem) totalPriceElem.textContent = "0";
        if (dateError) dateError.textContent = "";
        return;
      }
  
      if (endDate > startDate) {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const totalPrice = days * carPrice;
        if (totalPriceElem) totalPriceElem.textContent = totalPrice.toFixed(2);
        if (dateError) dateError.textContent = "";
      } else {
        if (totalPriceElem) totalPriceElem.textContent = "0";
        if (dateError) dateError.textContent = "La fecha de fin debe ser posterior a la de inicio";
      }
    }
  
    // Actualizar el total al modificar las fechas
    const startDateField = document.getElementById("start-date");
    const endDateField = document.getElementById("end-date");
    if (startDateField) startDateField.addEventListener("input", calculateTotal);
    if (endDateField) endDateField.addEventListener("input", calculateTotal);
  
    // Función para validar un campo y mostrar mensajes de error
    function validateField(id, regex, errorMessage) {
      const field = document.getElementById(id);
      const errorDiv = document.getElementById(id + "-error");
  
      if (!field || !errorDiv) return; // Si alguno de los elementos no existe, salimos
  
      function validate() {
        // Para los campos de fecha se valida que tengan algun valor
        if (id === "start-date" || id === "end-date") {
          if (!field.value) {
            errorDiv.textContent = "Este campo es obligatorio";
          } else {
            errorDiv.textContent = "";
          }
        } else if (!field.value.trim()) {
          errorDiv.textContent = "Este campo es obligatorio";
        } else if (regex && !regex.test(field.value)) {
          errorDiv.textContent = errorMessage;
        } else {
          errorDiv.textContent = "";
        }
      }
  
      field.addEventListener("input", validate);
      field.addEventListener("change", validate);
    }
  
    // Configuración de validación para cada campo que no este vacio o cumpla una expresion regular
    validateField("name", null, "");
    validateField("lastname", null, "");
    validateField("nif", /^[0-9]{8}[A-Za-z]$/, "Debe tener 8 números seguidos de una letra");
    validateField("phone", /^[0-9]{9}$/, "Debe tener 9 dígitos");
    validateField("card-number", /^[0-9]{16}$/, "Debe tener 16 dígitos");
    validateField("cvv", /^[0-9]{3}$/, "Debe tener 3 dígitos");
    validateField("expiry-date", null, "");
    validateField("start-date", null, "");
    validateField("end-date", null, "");
  
    // Validación y envío del formulario
    const rentalForm = document.getElementById("rental-form");
    if (rentalForm) {
      rentalForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Que no se pueda enviar vacio
  
        let isValid = true;
        // Campos obligatorios
        const requiredFields = [
          "name",
          "lastname",
          "start-date",
          "end-date",
          "expiry-date",
          "nif",
          "phone",
          "card-number",
          "cvv"
        ];
  
        // Validar que cada campo tenga algo escrito
        requiredFields.forEach(id => {
          const field = document.getElementById(id);
          const errorDiv = document.getElementById(id + "-error");
          if (field && !field.value.trim()) {
            if (errorDiv) errorDiv.textContent = "Este campo es obligatorio";
            isValid = false;
          }
        });
  
        // Validar el error de las fechas 
        const dateError = document.getElementById("date-error");
        if (dateError && dateError.textContent !== "") {
          isValid = false;
        }
  
        // Si todo es válido, salta una alerta y te redirige a index.html, si hay algun campo no valido salta otra alerta diferente 
        if (isValid) {
          alert("¡Alquiler confirmado! Recibirás un sms con los detalles.");
          window.location.href = "index.html";
        } else {
          alert("Por favor, completa todos los campos correctamente.");
        }
      });
    }
  });
  