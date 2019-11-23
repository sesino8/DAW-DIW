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
    hijosPasos[0].style.opacity = "0";


    hijosPasos[0].style.visibility = "visible";

    hijosPasos[0].style.opacity = "1";

    
}



contador = 0;
var num;
function transicionar(p) {

    if (contador > 0) {
        
    }else{
        num = this.getAttribute("data-step");
        hijoSiguiente = parseInt(num) ;
    }

    console.log(num);
    hijosPasos[hijoSiguiente].style.visibility = "visible";
    hijosPasos[hijoSiguiente].style.opacity = "1";

    
    if (num == 0 || num % 3 == 0) {       

      
        
    }else if(num == 1 || num % 3 == 1){
        if (hijosPasos[hijoSiguiente].getAttribute("value") < 100) {
            contador = contador + 10;
            hijosPasos[hijoSiguiente].setAttribute('value', contador);
            transicionar(this);
        }else{
            contador = 0;
        }

    }else{

    }



}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);

}

// Init the environment when all is ready
window.onload = init;
