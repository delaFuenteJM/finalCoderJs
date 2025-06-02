//datos alumnos

let listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];
let alumnoActivoId = localStorage.getItem('alumnoActivoId'); 
let alumnoActivo = null;

const form = document.getElementById('formDatos');

function guardarDatosEstudiante() {

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    let alumnoExistente = listaAlumnos.find(alumno => alumno.email === email);

    if (alumnoExistente) {
        Swal.fire('Error', 'Ya existe un alumno registrado con este email.', 'error');

        alumnoActivoId = alumnoExistente.id;
        localStorage.setItem('alumnoActivoId', alumnoActivoId);
        Swal.fire({
            icon: 'info',
            title: '¡Alumno ya registrado!',
            text: 'Estás seleccionando este alumno para inscribir materias.'
        });

    } else {
        const nuevoAlumno = {
            id: Date.now(), 
            nombre,
            email,
            telefono,
            materiasInscritas: [] 
        };
        listaAlumnos.push(nuevoAlumno);
        localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos));

        alumnoActivoId = nuevoAlumno.id;
        localStorage.setItem('alumnoActivoId', alumnoActivoId);

        Swal.fire({
            icon: 'success',
            title: '¡Alumno registrado!',
            text: 'Puedes continuar inscribiendo materias.'
        });

        document.getElementById("seccionMaterias").style.display = "block";
    }

    alumnoActivo = listaAlumnos.find(alumno => alumno.id === parseInt(alumnoActivoId));
}

document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('guardarDatos');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarDatosEstudiante);
    }
});

//materias

let clases = []; 

document.addEventListener('DOMContentLoaded', () => {

    
    alumnoActivoId = localStorage.getItem('alumnoActivoId');
    listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];
    alumnoActivo = listaAlumnos.find(a => a.id === parseInt(alumnoActivoId));

    if (alumnoActivo) {
        document.getElementById("seccionMaterias").style.display = "block";

        fetch('../json/materias.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar materias.json');
                }
                return response.json();
            })
            .then(data => {
                clases = data;
                renderMaterias(clases);
            })
            .catch(error => {
                console.error('Error al cargar las materias:', error);
                Swal.fire('Error', 'No se pudieron cargar las materias disponibles.', 'error');
            });
    }
});



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

//clicks y alerts
function botonAgregarClases () {
    
    const addButton = document.querySelectorAll(".agregarMateria");
    addButton.forEach(button => {
        button.onclick = (e) => {
            if (!alumnoActivo) {
                Swal.fire("Error", "Primero completá tus datos personales.", "error");
                return;
            }
            const clasesId = e.currentTarget.id;
            const materiaSeleccionada = clases.find(clase => clase.id == clasesId);
            const yaInscripto = alumnoActivo.materiasInscritas.some(clase => clase.id === materiaSeleccionada.id);


            if (!yaInscripto) {
                alumnoActivo.materiasInscritas.push(materiaSeleccionada);
                const index = listaAlumnos.findIndex(a => a.id === alumnoActivo.id);
                listaAlumnos[index] = alumnoActivo;
                localStorage.setItem("listaAlumnos", JSON.stringify(listaAlumnos));
            
                Swal.fire({
                    title: "¡Materia agregada!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya estás inscripto en esta materia.",
                });
                
            }

            console.log("Materias del alumno:", alumnoActivo.materiasInscritas);
        };
    });
}

