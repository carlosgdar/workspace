function validar() {
    let nombre = document.getElementById("inputEmail").value;
    let pass = document.getElementById("inputPassword").value;
    if ((nombre !== "") && (pass !== "")) {
        // Aprovechamos la función que toma los datos
     //   let myStorage = window.localStorage; 
        localStorage.setItem('usuario', nombre);
        // Nos redirige a la pantalla de productos, ojo cambia la página por lo cual validar() no existe más.
        window.location.href = "index.html";
    } else {
        alert("debe completar los campos");
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});