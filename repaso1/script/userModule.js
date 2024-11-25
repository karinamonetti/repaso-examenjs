// Función para obtener el valor de una cookie por su nombre: Esta función se encarga de buscar y devolver el valor de una cookie específica por su nombre. Si la cookie no se encuentra, devuelve null.
function getCookie(name) {
    // Añade un prefijo "; " al string de cookies para asegurar que se pueda buscar "; nombreDeLaCookie="
    const value = `; ${document.cookie}`;
     // Divide el string de cookies en partes, usando el delimitador "; nombreDeLaCookie="
    const parts = value.split(`; ${name}=`);

    // Si hay exactamente dos partes, eso significa que la cookie se encontró
    if (parts.length === 2) 
        // Devuelve el valor de la cookie (la parte después de "nombreDeLaCookie=" y antes de un posible ";")
        {return parts.pop().split(';').shift()
    };
     // Si la cookie no se encuentra, devuelve null
    return null;
}

// Función para establecer una cookie: Esta función se encarga de establecer una cookie con el nombre y valor proporcionados. La cookie se establece con el path=/, lo que significa que es accesible en todo el dominio.
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}

/* 
Función saludar:
- Obtiene el elemento con id titulo.
- Utiliza getCookie para verificar si la cookie userName existe.
- Si la cookie no existe, solicita el nombre del usuario con prompt y guarda el nombre en una cookie usando setCookie.
- Si el elemento titulo existe, establece el contenido de texto del elemento para mostrar un saludo personalizado con el nombre del usuario.*/
export function saludar() {
    const saludo = document.getElementById("titulo");
    // Verificar si el nombre del usuario ya está guardado en las cookies
    let name = getCookie("userName");
    // Si no hay nombre guardado en las cookies
    if (!name) {
        name = prompt("Introduce tu nombre:");
        // Si el usuario introduce un nombre, se guarda en una cookie
        if (name) {
            setCookie("userName", name); 
        }
    }
    // Si se encontró el elemento "titulo" en la página
    if (saludo) {
        saludo.textContent = `Hola, ${name}! Estos son tus planes:`;
    }
}


// borrar la cookie
//deleteCookie('userName');