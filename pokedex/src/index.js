import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import * as serviceWorker from './serviceWorker';

//Getting the div root for render the banner component
ReactDOM.render(<App />, document.getElementById('root'));

const urlPokemons = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000";

//Container where are the pokemons
const contenedorPokemons = document.getElementById("pokemonContainer");
//Box for search some pokemon
const filtroInput = document.querySelector("input");

var pokemonUrlPromise = [];
var pokemons = [];

//Array where are the pokemons what we have to put it inside of contenedoPokemons
var pokemonsRellenar = [];

//Container for show if there is not results
var resultado = document.getElementById("resultado");

//Counter for the tabs index
var contador = 0;

//Return a pokemon later of a promise
function devuelvePomkemon(url) {
    return fetch(url).then(response => {
        return response.json();
    }).then(respuesta => { return respuesta });;
}

//The script starts here
/* We have an event listener where you put enter search a pokemon, another listener when you click in 
   the buscar button. There is a fetch for fill the arrays*/
function init() {

    filtroInput.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            buscar();
        }
    });

    var button = document.querySelector("a");
    button.addEventListener("click", buscar);


    const fetchPromesa = fetch(urlPokemons);
    fetchPromesa.then(response => {
        return response.json();
    }).then(respuesta => {
        respuesta.results.forEach(pokemon => {
            pokemonUrlPromise.push(devuelvePomkemon(pokemon.url));

        })

        Promise.all(pokemonUrlPromise).then(pokemon => {
            pokemons.push(...pokemon);
            document.getElementById("cargando").style.display = "none";

        });

    });

}

// Searching function 

async function buscar() {

    document.getElementById("cargando").style.display = "block";

    //Reset array to empty
    pokemonsRellenar = [];

    //Fill the array with the filter with the value of the input
    pokemonsRellenar = pokemons.filter(comprobarNombre);

    //Until the function not finished not pass to the another execution
    await rellenarContainer();

    document.getElementById("cargando").style.display = "none";

    //Make an scroll until div
    document.getElementById("pokemonContainer").scrollIntoView({
        behavior: 'smooth'
    });

}

//Funtion that check if the letters of the ipunt are included in the pokemons and return this nombre
function comprobarNombre(pokemon) {

    var valueFiltro = filtroInput.value.toLowerCase();

    var nombre = pokemon.name;

    contador = 0;

    return nombre.includes(valueFiltro);

}

//Async funtion for fill the pokemon container. The dom wins!
async function rellenarContainer() {

    contenedorPokemons.innerHTML = "";

    //If there is not pokemons show one div resultado
    pokemonsRellenar.length == 0 ? resultado.style.display = "block" : resultado.style.visibility = "none";

    //For each pokemon 
    pokemonsRellenar.forEach(pokemon => {


        var celda = document.createElement("div");

        //Creating image.
        //Check if there is not image for the pokemon and do things 
        var imagenPokemon = document.createElement("img");
        pokemon.sprites.front_default == null ? imagenPokemon.src = "../missingno.png" : imagenPokemon.src = pokemon.sprites.front_default;
        imagenPokemon.alt = "Imagen de: " + pokemon.name;
        celda.appendChild(imagenPokemon);

        //Creating h3 and properties
        var h3 = document.createElement("h3");
        h3.innerText = pokemon.name.toUpperCase();
        contador++;
        h3.tabIndex = contador;
        celda.appendChild(h3);

        //Creating the div which has the description of the pokemon
        var celdaDescripcion = document.createElement("div");
        celdaDescripcion.id = "description";
        celda.appendChild(celdaDescripcion);

        //Habilities and tittle in celda description
        var habilidades = document.createElement("div");
        var titulo = document.createElement("h4");
        titulo.innerText = "Abilities"
        contador++;
        titulo.tabIndex = contador;
        habilidades.appendChild(titulo);

        //If the array of moves pokemon is bigger than 2 tamanyo is 2
        var tamanyo;
        pokemon.moves.length <= 2 ? tamanyo = pokemon.moves.length : tamanyo = 2;

        //Add moves to the div habilidades
        for (let i = 0; i < tamanyo; i++) {

            var p = document.createElement("p");
            contador++;
            p.tabIndex = contador;
            p.innerText = pokemon.moves[i].move.name;
            habilidades.appendChild(p);

        }
        celdaDescripcion.appendChild(habilidades)

        //Div for the Types of pokemon
        var tiposDiv = document.createElement("div");
        var tituloTipos = document.createElement("h4");
        contador++;
        tituloTipos.tabIndex = contador;
        tituloTipos.innerText = "Types";
        tiposDiv.appendChild(tituloTipos);


        for (let i = 0; i < pokemon.types.length; i++) {
            var tipos = document.createElement("p");
            contador++;
            tipos.tabIndex = contador;
            tipos.innerText = pokemon.types[i].type.name;
            tiposDiv.appendChild(tipos);

        }
        celdaDescripcion.appendChild(tiposDiv);


        //Div for the base experience of pokemon
        var experienceDiv = document.createElement("div");
        var tituloExperiencia = document.createElement("h4");
        contador++;
        tituloExperiencia.tabIndex = contador;
        tituloExperiencia.innerText = "Experience";
        experienceDiv.appendChild(tituloExperiencia);


        tipos = document.createElement("p");
        contador++;
        tipos.tabIndex = contador;
        tipos.innerText = pokemon.base_experience;
        experienceDiv.appendChild(tipos);

        celdaDescripcion.appendChild(experienceDiv);


        //Div for the measurements of pokemon
        var measurementsDiv = document.createElement("div");
        var tituloMeasurements = document.createElement("h4");
        contador++;
        tituloMeasurements.tabIndex = contador;
        tituloMeasurements.innerText = "Measurements";
        measurementsDiv.appendChild(tituloMeasurements);


        tipos = document.createElement("p");
        contador++;
        tipos.tabIndex = contador;
        tipos.innerText = "Height: " + pokemon.height;
        measurementsDiv.appendChild(tipos);


        tipos = document.createElement("p");
        contador++;
        tipos.tabIndex = contador;
        tipos.innerText = "Weight: " + pokemon.weight;
        measurementsDiv.appendChild(tipos);
        celdaDescripcion.appendChild(measurementsDiv);

        contenedorPokemons.appendChild(celda);

    })



}




window.onload = init;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
