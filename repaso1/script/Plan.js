// 2)
export class Plan {
    constructor(nombre, id = Date.now(), asistencia = confirm("¿Vas a asistir al plan?"), asistentes = []){
        this.id = id;
        this.nombre = nombre;
        this.asistencia = asistencia;
        this.asistentes = asistentes;
    }

    static toggleAsistenciaPlan(plan){
        plan.asistencia = !plan.asistencia;
    }
};