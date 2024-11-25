export class Tarea {

    static contador = 0; // Contador incremental para generar ids únicos
    static tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || []; // array que alojará las tareas

    constructor (descripcion){
        this.id = ++Tarea.contador; // Incrementa el contador y lo usa como id
        this.descripcion = descripcion; // Inicializa el texto de la tarea
        this.completada = false; // Inicializa la tarea como no completada
    }

    // Este método cambiará el valor de la propiedad completada de la tarea. Cuando una tarea esté marcada como completada, su texto debe cambiar de color para reflejar su estado
    marcarCompletada(li){
        this.completada = !this.completada;
        if (this.completada){
            li.style.color = "green";
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
            li.style.color = "black";
        }
        Tarea.actualizarStorage();
       
    }

    // eliminar(): Este método eliminará la tarea de la lista de tareas
    eliminar(li){
        li.remove();
        Tarea.eliminarDeStorage(this.id);
    }

    // editar(nuevoTexto): Este método permitirá cambiar el texto de la tarea. El usuario debe poder editar el contenido de la tarea directamente desde la lista.
    editar(li) {
        // Hacemos que el contenido sea editable
        li.setAttribute("contenteditable", true);
        li.focus(); // Enfoca el elemento para que el usuario empiece a escribir directamente
        li.addEventListener("blur", () => {
            // Cuando el usuario termine de editar (pierde el foco), se guarda el nuevo texto
            this.texto = li.textContent; // Actualiza el texto en la tarea
            li.setAttribute("contenteditable", false); // Deshabilita la edición
            Tarea.actualizarStorage();
        });
    }

    
    static actualizarStorage() {
        localStorage.setItem('tareas', JSON.stringify(Tarea.tareasGuardadas));
    }

    static eliminarDeStorage(id) {
        Tarea.tareasGuardadas = Tarea.tareasGuardadas.filter(tarea => tarea.id !== id);
        Tarea.actualizarStorage();
    }

}
