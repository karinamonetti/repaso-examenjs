import { Tarea } from "./Tarea.js";
/*  Al agregar una tarea, esta debe aparecer en la lista de tareas en la página, acompañada de los siguientes botones: 
"Marcar como completada", 
"Eliminar tarea" y 
"Editar tarea". */

var btnAddTarea = document.querySelector("button");
btnAddTarea.addEventListener("click", function(){
        event.preventDefault();
        var nombreTarea = document.getElementsByClassName("nombre-tarea")[0].value;
    
        // validación que no esté vacío
        if (!nombreTarea.trim()) {
            alert("Por favor ingresa una tarea");
            return;
        }
        crearTarea(nombreTarea);
    
        document.getElementsByClassName("nombre-tarea")[0].value = '';
    
});

// Crear una tarea y actualizar el localStorage cuando se agregue, edite o elimine.
function crearTarea(descripcion, id, completada = false) {
    // Validación para evitar duplicados al agregar la tarea
    if (Tarea.tareasGuardadas.some(tarea => tarea.descripcion === descripcion)) {
        alert("Esta tarea ya está en la lista");
        return; // Si la tarea ya existe, no la crea
    }

    const contenedor = document.createElement("div");
    const li = document.createElement("li");
    li.textContent = descripcion;
    li.id = id;

    if (completada) {
        li.style.textDecoration = "line-through";
        li.style.color = "green";
    }

    contenedor.appendChild(li);

    const btnCompletada = document.createElement("button");
    btnCompletada.textContent = "Marcar como completada";
    btnCompletada.addEventListener("click", function() {
        tarea.marcarCompletada(li);
    });
    contenedor.appendChild(btnCompletada);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar tarea";
    btnEliminar.addEventListener("click", function() {
        tarea.eliminar(contenedor);
    });
    contenedor.appendChild(btnEliminar);

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar tarea";
    btnEditar.addEventListener("click", function() {
        tarea.editar(li);
    });
    contenedor.appendChild(btnEditar);

    const tarea = new Tarea(descripcion);
    Tarea.tareasGuardadas.push(tarea);
    Tarea.actualizarStorage();

    document.getElementsByClassName("lista")[0].appendChild(contenedor);
}

// Cargar las tareas desde localStorage al cargar la página.
function cargarTareas() {
    // Limpiar el array tareasGuardadas antes de cargar las tareas desde localStorage
    Tarea.tareasGuardadas = [];
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tarea => {
        crearTarea(tarea.descripcion, tarea.id, tarea.completada);
    });
}

// Cargar tareas desde localStorage al iniciar la página
cargarTareas();




// Implementa la funcionalidad para clasificar las tareas por su estado: "Todas", "Pendientes" y "Completadas".
const btnTodas = document.getElementsByClassName("mostrar-todas")[0];
const btnPendientes = document.getElementsByClassName("mostrar-pendientes")[0];
const btnCompletadas = document.getElementsByClassName("mostrar-completadas")[0];

// Eventos para filtrar las tareas
btnTodas.addEventListener("click", () => {
    mostrarTareas("todas");
});

btnPendientes.addEventListener("click", () => {
    mostrarTareas("pendientes");
});

btnCompletadas.addEventListener("click", () => {
    mostrarTareas("completadas");
});

// Función para mostrar tareas filtradas
function mostrarTareas(filtro) {
    // Obtener todas las tareas guardadas
    const tareas = Tarea.tareasGuardadas;

    // Filtrar según el estado de la tarea
    let tareasFiltradas;
    if (filtro === "todas") {
        tareasFiltradas = tareas; // Muestra todas las tareas
    } else if (filtro === "pendientes") {
        tareasFiltradas = tareas.filter(tarea => !tarea.completada); // Muestra solo las pendientes
    } else if (filtro === "completadas") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada); // Muestra solo las completadas
    }

    // Aquí deberías actualizar el DOM para mostrar las tareas filtradas
    actualizarVistaTareas(tareasFiltradas);
}

// El filtro debe actualizarse dinámicamente sin necesidad de recargar la página, y debe reflejarse en el listado de tareas visibles.
// Función para actualizar la vista con las tareas filtradas
function actualizarVistaTareas(tareas) {
    const lista = document.querySelector(".lista");
    lista.innerHTML = ""; // Limpiar la lista existente

    // Agregar cada tarea a la lista
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.descripcion;
        // Aquí puedes agregar otros elementos como botones de editar, eliminar, etc.
        lista.appendChild(li);
    });
}



//localStorage.clear(); 