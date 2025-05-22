//datos del estudiantes

const form = document.getElementById('formDatos');

function guardarDatosEstudiante() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    const datosEstudiante = { nombre, email, telefono };
    localStorage.setItem('datosEstudiante', JSON.stringify(datosEstudiante));

    Swal.fire({
        icon: 'success',
        title: '¡Datos guardados!',
        text: 'Tu información fue registrada correctamente.'
    });

}
document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('guardarDatos');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarDatosEstudiante);
    }
});

//materias

const clases=[
    {
        id: 1,
        materia: "Bandoneon",
        horario: "L a V 10hs",
    },
    {
        id: 2,
        materia: "Teoria Musical",
        horario: "Martes 14 a 15hs",
    },
    {
        id: 3,
        materia: "Armonia",
        horario: "viernes 19 a 20hs",
    },    {
        id: 4,
        materia: "Historia",
        horario: "Jueves 17 a 18hs",
    },
]

let materiasDisponibles = document.getElementById("listaMateria")

function renderMaterias(materiasArray){
    materiasArray.forEach(clases => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${clases.materia}</h3>
                          <p>${clases.horario}</p>
                          <button class="agregarMateria" id="${clases.id}">Anotarse</button>`
        materiasDisponibles.appendChild(card)                  
    })
    botonAgregarClases()
}
renderMaterias(clases)

let clasesAnotadas = JSON.parse(localStorage.getItem("clasesAnotadas")) || [];


function botonAgregarClases () {
    
    const addButton = document.querySelectorAll(".agregarMateria");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const clasesId = e.currentTarget.id;
            const materiaSeleccionada = clases.find(clase => clase.id == clasesId);
            const yaInscripto = clasesAnotadas.some(clase => clase.id === materiaSeleccionada.id);

            if (!yaInscripto) {
                clasesAnotadas.push(materiaSeleccionada);
                localStorage.setItem("clasesAnotadas", JSON.stringify(clasesAnotadas));
                Swal.fire({
                    title: "¡Materia agregada!",
                    icon: "success",
                    draggable: true
                  });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya estás inscripto en esta materia.",
                  });
                  
            }

            console.log(clasesAnotadas); 
        };
    });
}

