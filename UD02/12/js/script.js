
function init() {

    document.querySelector('button').addEventListener('click', add);

}

function add() {

    box = document.createElement('box');

    document.querySelector('container').appendChild(box);

    box.addEventListener('click', evolucionar)
    
    box.classList.add('noEvolucionado');

}

function evolucionar() {

    evolucion = this.classList;

    if (evolucion == "noEvolucionado") {
        this.classList.replace('noEvolucionado','evoluciona');

    } else if (evolucion == "evoluciona") {
        this.classList.remove('evoluciona');

    } else if (evolucion == "") {
        this.classList.add('ultimate');
        this.setAttribute('evolucion', "ultimate");
    }

}


window.onload = init;
