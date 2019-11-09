move = 0;
rotate = 0;

function init() {

    document.querySelectorAll('button')[0].addEventListener('click', add);
    document.querySelectorAll('button')[1].addEventListener('click', () => rotate++);
    document.querySelectorAll('button')[2].addEventListener('click', () => move++);

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
        this.classList.replace('noEvolucionado', 'evoluciona');


    } else if (evolucion == "evoluciona") {
        this.classList.remove('evoluciona');


    } else if (evolucion == "") {
        this.classList.add('ultimate');


    } else if (evolucion.contains( "ultimate")) {

        if (rotate == 1) {
            if (this.classList.contains("move")) {
                this.classList.remove("move");
            }
            this.classList.add('rotate');



        } else if (move == 1) {
            if (this.classList.contains("rotate")) {
                this.classList.remove("rotate");
            }
            this.classList.add('move');


        }
    }

    move = 0;
    rotate = 0;
}


window.onload = init;
