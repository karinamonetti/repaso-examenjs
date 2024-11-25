import { saludar } from "./userModule.js";
import { addPlan, renderPlans } from "./plan-manager.js";


// al cargarse la página...
document.addEventListener("DOMContentLoaded", () => {
    saludar();


     // 2) evento btn agregar plan
     document.getElementById("agregarPlan").addEventListener("click", () => {
        // guarda el valor del input
        const nombrePlan = document.getElementById("nombrePlan").value.trim();
        // agrega el plan con el nombre pasado x el input
        addPlan(nombrePlan);
        // resetea el valor
        document.getElementById("nombrePlan").value = "";
    });

    //  2) evento enter en el input
    document.getElementById("nombrePlan").addEventListener("keypress", (tecla) => {
        // si aprieta enter
        if (tecla.key === 'Enter') {
            // guarda el valor del input
            const nombrePlan = document.getElementById("planInput").value.trim();
            // agrega el plan con el nombre pasado x el input
            addPlan(nombrePlan);
            // resetea el valor
            document.getElementById("nombrePlan").value = "";
        }
    });

    renderPlans();
});
