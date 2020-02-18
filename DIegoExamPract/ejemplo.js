

var partidas = new Array;



function init() {

    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);

}

function buscar() {

    var usuario = document.getElementById("usuario").value;

    var urlAjedrez = "https://api.chess.com/pub/player/" + usuario + "/games";


    const fetchPromesa = fetch(urlAjedrez);

    fetchPromesa.then(response => {
        return response.json();
    }).then(partida => {
        juego = partida.games;

        juego.forEach(datoPartida => {
            partidas.push(datoPartida);
            console.log(partidas);

            let contenedor = document.getElementById("container");

            let parrafo = document.createElement("p");

            usuarioBlancas = datoPartida.white;
            usuarioNegras = datoPartida.black;

            usuarioNegras = usuarioNegras.slice(33, usuarioNegras.length)
            usuarioBlancas = usuarioBlancas.slice(33, usuarioBlancas.length)

            parrafo.innerText = "BLANCAS :" + usuarioBlancas;

            parrafo = document.createElement("p");

            url = datoPartida.url;

            parrafo.innerText = url.slice(33,url.length);

            contenedor.appendChild(parrafo);



            let parrafo2 = document.createElement("p");

            parrafo2.innerText = "NEGRAS :" + usuarioNegras;

            contenedor.appendChild(parrafo);
            contenedor.appendChild(parrafo2);

            parrafo = document.createElement("p");
            parrafo.innerText = "RANKEADA :";
            let ranked = document.createElement("INPUT");
            ranked.setAttribute("type", "checkbox");

            if (datoPartida.rated) {
                ranked.checked = true;
            }else{
                ranked.checked = false;
            }

            parrafo.appendChild(ranked);
            contenedor.appendChild(parrafo);

            parrafo = document.createElement("p");
            var movimientos = datoPartida.pgn;

            //SUPER IMPORTANTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE//
            movimientos = movimientos.split('\n');
            movimientos = movimientos.slice(movimientos.indexOf('\n'),movimientos.length);

            parrafo.innerText = movimientos;
            
            contenedor.appendChild(parrafo);


        });

    });


}

window.onload = init;
