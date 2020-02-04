
var imagenJugadores = new Array();
function cargar() {

    select();

    for (let i = 0; i < 36; i++) {
        imagenJugadores[i] = "./media/" + i + ".png";
    }
    // shuffle(imagenJugadores);


    divCampo = document.getElementById("campo");
    divCampo.addEventListener("dragover", allowDrop);
    divCampo.addEventListener("drop", drop);

    divBanquillo = document.getElementById("banquillo");
    divBanquillo.addEventListener("dragover", allowDrop);
    divBanquillo.addEventListener("drop", drop);

    for (var i = 0; i < 12; i++) {

        divAnadir = document.createElement("div");

        divAnadir.classList.add("jugador");

        imagen = document.createElement("img");
        imagen.addEventListener("dragstart", drag);
        imagen.setAttribute('draggable', true);
        imagen.src = imagenJugadores[i];
        imagen.width = "150";
        imagen.id = i;

        //imagen.src = "./media";

        divAnadir.appendChild(imagen);
        divCampo.appendChild(divAnadir);

    }

    for (let i = 12; i < 36; i++) {

        divAnadir = document.createElement("div");

        divAnadir.classList.add("jugador");

        imagen = document.createElement("img");
        imagen.addEventListener("dragstart", drag);
        imagen.setAttribute('draggable', true);
        imagen.id = i;
        imagen.src = imagenJugadores[i];
        imagen.width = "150";



        divAnadir.appendChild(imagen);
        divBanquillo.appendChild(divAnadir);

    }


}



function allowDrop(ev) {

    //Permitir que reciba algún elemento
    ev.preventDefault();

}

function drag(ev) {

    //Indicamos que valor y tipo de información vamos a arrastrar. En este caso texto e ID del elemento.
    ev.dataTransfer.setData("text", ev.target.id);

    contenedor = document.getElementById(ev.target.id).parentNode;

}

function drop(ev) {

    //Evitamos el comportamiento normal del navegador, que sería abrir el elemento en una nueva pestaña.
    ev.preventDefault();

    //Guardamos el elemento, llamado "text" en una variable.
    var id = ev.dataTransfer.getData("text");






    //Colgamos el elemeto arrastrado y soltado en el nuevo destino.
    if (ev.target.children.length != 0) {
        ev.target.appendChild(document.getElementById(id));
        contenedor.appendChild(ev.target.children[0]);

    } else {
        if (ev.target.nodeName == "IMG") {


            //donde se va a situar

            padreDiv = ev.target.parentNode;
            var equipo1 = padreDiv.parentNode;
            var jugador1 = ev.target.id;

            //situado
            padreDiv = document.getElementById(id).parentNode;
            var equipo2 = padreDiv.parentNode;
            var jugador2 = id;

            update(jugador1, equipo1);
            update(jugador2, equipo2);

            ev.target.parentNode.appendChild(document.getElementById(id));
            contenedor.appendChild(ev.target);

        } else {
            
            ev.target.appendChild(document.getElementById(id));

        }

    }
}

function update(idJugador, idEquipo) {

    if (idEquipo == "campo") {
        idEquipo = "1";
    } else {
        idEquipo = "2";
    }

    var formulario = new FormData();

    formulario.append("idJugador", idJugador);
    formulario.append("idEquipo", idEquipo);

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", descargar);
    xhr.open("POST", "http://localhost/post.php");
    xhr.send(formulario);

    function descargar() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log(respuesta);
        }
    }

}

function select() {


    xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", descargar2);
    xhr.open("POST", "http://localhost/get.php");
    xhr.send();

    function descargar2() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log(JSON.parse(respuesta));
            return JSON.parse(respuesta);

        }
    }

}



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
window.addEventListener("load", cargar);