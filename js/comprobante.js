// datos alumnos
let listaAlumnos = JSON.parse(localStorage.getItem("listaAlumnos")) || [];
let alumnoActivoId = localStorage.getItem("alumnoActivoId");

let contenedorMaterias = document.getElementById("listaConstancia");
let alumno = listaAlumnos.find(al => al.id === parseInt(alumnoActivoId));

function renderComprobante(alumno) {
    if (!alumno) {
        contenedorMaterias.innerHTML = "<p>No se encontró ningún alumno activo.</p>";
        return;
    }

    const datosDiv = document.createElement("div");
    datosDiv.innerHTML = `
        <h2>Datos del Estudiante</h2>
        <p><strong>Nombre:</strong> ${alumno.nombre}</p>
        <p><strong>Email:</strong> ${alumno.email}</p>
        <p><strong>Teléfono:</strong> ${alumno.telefono}</p>
        <button id="borrarDatosCompletos">Borrar Datos y Materias</button>
    `;
    contenedorMaterias.appendChild(datosDiv);

    // Materias inscritas
    if (alumno.materiasInscritas.length > 0) {
        alumno.materiasInscritas.forEach(clase => {
            const claseDiv = document.createElement("div");
            claseDiv.innerHTML = `
                <h3>${clase.materia}</h3>
                <p>${clase.horario}</p>
                <button class="borrarMateria" data-id="${clase.id}">Eliminar materia</button>
            `;
            contenedorMaterias.appendChild(claseDiv);
        });

        // botones de eliminar materias de a una
        const botonesBorrar = document.querySelectorAll(".borrarMateria");
        botonesBorrar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const idMateria = parseInt(e.currentTarget.dataset.id);
                alumno.materiasInscritas = alumno.materiasInscritas.filter(m => m.id !== idMateria);

                const index = listaAlumnos.findIndex(a => a.id === alumno.id);
                listaAlumnos[index] = alumno;
                localStorage.setItem("listaAlumnos", JSON.stringify(listaAlumnos));

                Swal.fire("Materia eliminada", "", "success").then(() => {
                    location.reload(); 
                });
            });
        });

    } else {
        const vacio = document.createElement("p");
        vacio.innerText = "No hay materias inscritas.";
        contenedorMaterias.appendChild(vacio);
    }

    // Boton para eliminar todo
    document.getElementById('borrarDatosCompletos').addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esto eliminará todos tus datos y materias.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar todo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const nuevosAlumnos = listaAlumnos.filter(a => a.id !== alumno.id);
                localStorage.setItem("listaAlumnos", JSON.stringify(nuevosAlumnos));
                localStorage.removeItem("alumnoActivoId");

                Swal.fire("Borrado", "El alumno fue eliminado.", "success").then(() => {
                    window.location.href = "../index.html";
                });
            }
        });
    });
}

renderComprobante(alumno);
