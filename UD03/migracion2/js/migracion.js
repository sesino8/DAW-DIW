/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/
var hijosPasos;

function startMigration() {


    hijosPasos = document.querySelector('steps').children

    for (let index = 0; index < hijosPasos.length; index++) {

        hijosPasos[index].addEventListener("transitionend", transicionar);

    }


    hijosPasos[0].style.visibility = "visible";
    hijosPasos[0].classList.add("neon");
    


}



contador = 0;
var num;
var cambiaImagen;
function transicionar() {

        if (cambiaImagen) {
            hijosPasos[hijoSiguiente].style.visibility = "hidden";
            cambiaImagen = false;
        }

        num = this.getAttribute("data-step");
        hijoSiguiente = parseInt(num);

    console.log(num);
    hijosPasos[hijoSiguiente].style.visibility = "visible";



    if (num == 0 || num % 3 == 0) {

        hijosPasos[hijoSiguiente].classList.add("neon");
        hijosPasos[hijoSiguiente].style.opacity = "1";

    } else if (num == 1 || num % 3 == 1) {

        hijosPasos[hijoSiguiente].classList.add("neon");
        cambiaImagen = true;

    } else {

        hijosPasos[hijoSiguiente].classList.add('blink');

    }



}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);

}

// Init the environment when all is ready
window.onload = init;
