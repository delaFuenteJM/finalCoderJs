// let comprobanteMaterias = localStorage.getItem(clasesAnotadas)
// comprobanteMaterias = JSON.parse(comprobanteMaterias)

// let contenedorMaterias = document.getElementById("listaConstancia")

// function renderComprobante(carItems) {
//     carItems.forEach(clases => {
//       const cart = document.createElement("div")
//       cart.innerHTML = `<h2>${clases.materia}</h2>
//                         <p>${clases.horario}</p>`
//       contenedorMaterias.appendChild(cart)                    
//     })
// }
// renderComprobante(comprobanteMaterias)

// Obtener materias guardadas
let comprobanteMaterias = localStorage.getItem("clasesAnotadas");
comprobanteMaterias = JSON.parse(comprobanteMaterias);

// Obtener datos del estudiante
let datosEstudiante = localStorage.getItem("datosEstudiante");
datosEstudiante = JSON.parse(datosEstudiante);

// Obtener contenedor
let contenedorMaterias = document.getElementById("listaConstancia");

// Función para renderizar el comprobante completo
function renderComprobante(carItems) {
    // Mostrar datos del estudiante
    if (datosEstudiante) {
        const datosDiv = document.createElement("div");
        datosDiv.innerHTML = `
            <h2>Datos del Estudiante</h2>
            <p><strong>Nombre:</strong> ${datosEstudiante.nombre}</p>
            <p><strong>Email:</strong> ${datosEstudiante.email}</p>
            <p><strong>Teléfono:</strong> ${datosEstudiante.telefono}</p>
        `;
        contenedorMaterias.appendChild(datosDiv);
    }

    // Mostrar materias
    if (carItems && carItems.length > 0) {
        carItems.forEach(clases => {
            const cart = document.createElement("div");
            cart.innerHTML = `
                <h2>${clases.materia}</h2>
                <p>${clases.horario}</p>
            `;
            contenedorMaterias.appendChild(cart);
        });
    } else {
        const vacio = document.createElement("p");
        vacio.innerText = "No hay materias inscritas.";
        contenedorMaterias.appendChild(vacio);
    }
}

// Ejecutar
renderComprobante(comprobanteMaterias);
