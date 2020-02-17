import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const urlPokemons = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
const contenedorPokemons = document.getElementById("pokemonContainer");
const filtroInput = document.querySelector("input");

var pokemonUrlPromise = [];
var pokemons = [];
var pokemonsRellenar = [];


function devuelvePomkemon(url) {
    return fetch(url).then(response => {
        return response.json();
    }).then(respuesta => { return respuesta });;
}

function init() {

    filtroInput.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            buscar();
        }
    });

    var button = document.querySelector("button");
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
        });

    });

}

async function buscar() {

    pokemonsRellenar = [];

    pokemonsRellenar = pokemons.filter(comprobarNombre);

    rellenarContainer();

}

function comprobarNombre(pokemon) {

    var valueFiltro = filtroInput.value;

    var nombre = pokemon.name;

    return nombre.includes(valueFiltro);

}

function rellenarContainer() {

    //contenedorPokemons

    contenedorPokemons.innerHTML = "";

    pokemonsRellenar.forEach(pokemon => {

        var celda = document.createElement("div");

        var imagenPokemon = document.createElement("img");
        imagenPokemon.src = pokemon.sprites.front_default;

        celda.appendChild(imagenPokemon);

        var h3 = document.createElement("h3");
        h3.innerText = pokemon.name.toUpperCase();

        celda.appendChild(h3);

        var celdaDescripcion = document.createElement("div");
        celdaDescripcion.id = "description";
        celda.appendChild(celdaDescripcion);

        var habilidades = document.createElement("div");
        var titulo = document.createElement("h4");
        titulo.innerText = "Abilities"

        habilidades.appendChild(titulo);

        for (let i = 0; i < pokemon.abilities.length; i++) {
            var p = document.createElement("p");
            p.innerText = pokemon.abilities[i].ability.name;
            habilidades.appendChild(p);

        }

        celdaDescripcion.appendChild(habilidades)

        var tiposDiv = document.createElement("div");
        var tituloTipos = document.createElement("h4");
        tituloTipos.innerText = "Types";

        tiposDiv.appendChild(tituloTipos);


        for (let i = 0; i < pokemon.types.length; i++) {
            var tipos = document.createElement("p");
            tipos.innerText = pokemon.types[i].type.name;
            tiposDiv.appendChild(tipos);

        }

        celdaDescripcion.appendChild(tiposDiv);


        var experienceDiv = document.createElement("div");
        var tituloExperiencia = document.createElement("h4");
        tituloExperiencia.innerText = "Experience";

        experienceDiv.appendChild(tituloExperiencia);

        tipos = document.createElement("p");
        tipos.innerText = pokemon.base_experience;
        experienceDiv.appendChild(tipos);



        celdaDescripcion.appendChild(experienceDiv);



        var measurementsDiv = document.createElement("div");
        var tituloMeasurements = document.createElement("h4");
        tituloMeasurements.innerText = "Measurements";

        measurementsDiv.appendChild(tituloMeasurements);

        tipos = document.createElement("p");
        tipos.innerText = "Height: " + pokemon.height;
        measurementsDiv.appendChild(tipos);

        tipos = document.createElement("p");
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
