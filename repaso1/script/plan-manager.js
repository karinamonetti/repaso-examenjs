import { Plan } from "./Plan.js";
import { AsistenciaAmigo } from "./AsistenciaAmigo.js";
import { guardarEnLocalStorage } from "./storageModule.js";
// 2)
let planes = [];
if(localStorage.getItem("planes")){
    // transformo mi string en un objeto
    let planesLocalStorage = JSON.parse(localStorage.getItem("planes"));
    // recorro el array del local storage
    planesLocalStorage.forEach(planLocal => {
        // tengo que crear una nueva instancia de plan para poder tener los métodos. Para que no me sobrescriba los atributos he tenido que modificar mi constructor
        let plan = new Plan(planLocal.nombre, planLocal.id, planLocal.asistencia, planLocal.asistentes);
        // ahora si, 
        planes.push(plan);
    });
}

// 2)
export function addPlan(nombrePlan){
      // Si el nombre está vacío (o es solo espacios) o si el nombre ya existe en los planes
    if(!nombrePlan || nombrePlan.trim() === "" || planes.some( plan => plan.nombre === nombrePlan)){
        alert("El nombre del plan no puede estar vacío ni ser duplicado.")
        return;
    // si no esta vacio, entonces crea un nuevo plan y lo añade al array planes
    } else{
        const plan1 = new Plan(nombrePlan);
        planes.push(plan1);
    }
    guardarEnLocalStorage(planes); // guardo en LocalStorage
    renderPlans();
}

function toggleAsistenciaUsuario(planID){
    //  find para verificar si el plan existe (retorna el primer elemento que coincida)
    const plan = planes.find(plan => plan.id === planID);

    // Si el plan existe, alterna la asistencia
    if(plan){
        Plan.toggleAsistenciaPlan(plan);
    } else {
        // Si no se encuentra el plan con ese ID, muestra un mensaje de error
        alert("El plan con este ID no existe.");
    }
    guardarEnLocalStorage(planes); // guardo en LocalStorage
    renderPlans();
}

function removePlan(planID){
    //  filter() es un método de los arrays en JavaScript que crea un nuevo array con todos los elementos que pasen una condición dada.
    // La función dentro de filter recibe cada plan (p) y evalúa si el id del plan (p.id) es diferente al planId que se pasa como parámetro.
    // Si el id del plan no coincide con el planId especificado, el plan se incluye en el nuevo array. Si coincide, el plan es filtrado fuera (eliminado).
    planes = planes.filter(plan => plan.id !== planID);
    guardarEnLocalStorage(planes); // guardo en LocalStorage
    renderPlans();
}


// 3) funcion para que el usuario pueda añadir asistentes a un plan especifico
function agregarAsistentes(nombreAsistente, planID){
    //  find para verificar si el plan existe (retorna el primer elemento que coincida)
    const plan = planes.find(plan => plan.id === planID);
     // Verifica si el plan existe, si el nombre del amigo es válido y si el amigo no está ya en la lista de asistentes
    if (plan && nombreAsistente && !plan.asistentes.some(asistente => asistente.nombre === nombreAsistente)){
        // agrega el asistente al array de asistentes que se encuentra en el plan
        plan.asistentes.push(new AsistenciaAmigo(nombreAsistente));
    } else {
        alert("El nombre no es válido o ya se encuentra en la lista de asistentes.");
    }
    guardarEnLocalStorage(planes); // guardo en LocalStorage
    renderPlans();
}

// 3) function que cambie la asistencia del invitado
function toggleAsistenciaInvitado(nombreInvitado, planID){
    //  find para verificar si el plan existe (retorna el primer elemento que coincida)
    const plan = planes.find(plan => plan.id === planID);
    // Si el plan no existe, mostrar un mensaje de error
    if (!plan) {
        alert("Plan no encontrado.");
        return;
    }

    // Buscar al invitado dentro del array de asistentes del plan (retorna el primer elemento que coincida)
    const invitado = plan.asistentes.find(asistente => asistente.nombre === nombreInvitado);
    // Si el invitado no existe, mostrar un mensaje de error
    if (!invitado) {
        alert("Invitado no encontrado en este plan.");
        return;
    }

    // si pasa los dos ifs, entonces cambia la asistencia del invitado.
    invitado.asistencia = !invitado.asistencia;
    
    guardarEnLocalStorage(planes); // guardo en LocalStorage
    renderPlans();
}

// 4)
export function renderPlans(){
    // selecciono la lista
    const planList = document.getElementById("planList");
    // resetea el contenido de la lista cada vez que se ejecuta.
    planList.innerHTML = '';

    // por cada plan dentro del array de planes deberá...
    planes.forEach(plan => {
        //creo el div
        const contenedor = document.createElement("div");
        // lo agrego en la lista
        planList.appendChild(contenedor);
        
        // creo el titulo
        const titulo = document.createElement("h3");
        // le asigno el nombre del plan como titulo.
        titulo.textContent = plan.nombre;
        // agrego el titulo al contenedor
        contenedor.appendChild(titulo); 


        // gestion del color de fondo del div, segun la asistencia.
        if(plan.asistencia){
            contenedor.style.backgroundColor = "green";
        } else{
            contenedor.style.backgroundColor = "red";
        }


        // btn gestion de la propia asistencia
        const btnMiAsistencia = document.createElement("button");
        btnMiAsistencia.textContent = "Modificar mi asistencia";
        // le creo un evento a btnMiAsistencia
        btnMiAsistencia.addEventListener("click", function(){
            // ejecuto la funcion que modifica mi asistencia pasándole el ID del plan donde estoy parada
            toggleAsistenciaUsuario(plan.id);
            guardarEnLocalStorage(planes); // guardo en LocalStorage
        })
        // lo agrego al contenedor
        contenedor.appendChild(btnMiAsistencia);


        // btn eliminarPlan
        const btnEliminarPlan = document.createElement("button");
        btnEliminarPlan.textContent = "Eliminar plan";
        btnEliminarPlan.addEventListener("click", function(){
            removePlan(plan.id);
        })
        contenedor.appendChild(btnEliminarPlan);

        //btn añadir asistentes
        const btnAddAsistentes = document.createElement("button");
        btnAddAsistentes.textContent = "Añadir asistentes";
        btnAddAsistentes.addEventListener("click", function(){
            const nombreAsistente = prompt("Dime el nombre del asistente:"); // le pido el nombre del asistente
            if (nombreAsistente && nombreAsistente.trim() !== ""){
                agregarAsistentes(nombreAsistente, plan.id);
            }
        })
        contenedor.appendChild(btnAddAsistentes);

        //lista de asistentes
        const listaAsistentes = document.createElement("ul");
        contenedor.appendChild(listaAsistentes);
        plan.asistentes.forEach(a => {
            const asistenteLi = document.createElement("li");
            asistenteLi.textContent = a.nombre;
            if (a.asistencia){
                asistenteLi.style.backgroundColor = "green";
            } else{
                asistenteLi.style.backgroundColor = "red";
            }
            const asistenciaAsistente = document.createElement("button");
            asistenciaAsistente.textContent = "Cambiar asistencia";
            asistenciaAsistente.addEventListener("click", function() {
                toggleAsistenciaInvitado(a.nombre, plan.id)
            });
            asistenteLi.appendChild(asistenciaAsistente);
            listaAsistentes.appendChild(asistenteLi);
        })
        


    });

}