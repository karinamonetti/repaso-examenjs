// cada vez que realizo una modificacion en el array, debo ejecutar esta función
export function guardarEnLocalStorage(planes){
    // guardo mi array en el localStorage como un STRING, 1° param: cómo se llama, 2° lo que estoy guardando
    localStorage.setItem('planes', JSON.stringify(planes));
}

