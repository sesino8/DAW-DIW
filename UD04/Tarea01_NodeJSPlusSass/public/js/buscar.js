const urlFallas = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";

function Falla (propiedades,geometria){

	this.propiedades = propiedades;
	this.geometria = geometria;

}

function filtroLetra(elemento){
    let letra=document.querySelector(`input[name="nombre"]`).value;
    return elemento.properties.nombre.startsWith(letra);
}

function init(){

	document.querySelector(`input[type="button"]`).addEventListener("click",buscar);    
	
	mapaDeFallas = new Map();

	
    const fetchPromesa = fetch(urlFallas);
    fetchPromesa.then(response => {
	return response.json();
    }).then(respuesta =>{
	const resultado=respuesta.features;

	resultado.forEach(falla=>{

		mapaDeFallas.set(falla.properties.id,new Falla(falla.properties,falla.geometry));

		let listado=document.querySelector(".resultados");

			
		let celdaResultado = document.createElement("div");
		celdaResultado.classList.add("celdas");
		celdaResultado.setAttribute("data-idfalla", falla.properties.id)
		let resultadoFallas = document.createElement("p");
		resultadoFallas.innerText = falla.properties.nombre;
		let imagenFalla = document.createElement("img");
		imagenFalla.src = falla.properties.boceto; // Quedan hacer cosas aqui

		celdaResultado.appendChild(resultadoFallas);
		celdaResultado.appendChild(imagenFalla);
		let valoracion = document.createElement("div");
		valoracion.classList.add("valoracion");
		for (let index = 1; index <= 5; index++) {
			let estrella = document.createElement("button");
				estrella.addEventListener("click", function(){
					colorEstrellaPulsada(this,index);
				});
				estrella.innerText = '★ ';
				estrella.dataset.index=index;
				estrella.dataset.fallaId=falla.properties.id;
				estrella.setAttribute("value", index)
				estrella.classList.add("estrellas");
				valoracion.appendChild(estrella); 
		}
		celdaResultado.appendChild(valoracion);
		let ubicacion = document.createElement("button");
		ubicacion.innerText = "Ubicación";
		ubicacion.onclick = function() { buscarUbicacion(falla.geometry.coordinates,falla.properties.boceto); };
		ubicacion.classList.add("bntUbicacion");
		celdaResultado.appendChild(ubicacion);
	    listado.appendChild(celdaResultado);

	});
});

console.log(mapaDeFallas);


}


function buscar(){

	let imagenes = document.querySelectorAll("img");
	let celdas = document.querySelectorAll('div.celdas');
	let idFallas = new Array;

	for (let index = 0; index < celdas.length; index++) {
		idFallas[index]= celdas[index].getAttribute("data-idfalla");
		
	}

	if (document.getElementById("boceto_i").checked) {
		for (let index = 0; index < imagenes.length; index++) {
			let falla = mapaDeFallas.get(idFallas[index]);
			imagenes[index].src = falla.propiedades.boceto_i;
			
		}
	} else {
		for (let index = 0; index < imagenes.length; index++) {
			let falla = mapaDeFallas.get(idFallas[index]);
			imagenes[index].src = falla.propiedades.boceto;
			
		}
	}

}

function valoracion(idFalla, valoracion){





}

function colorEstrellaPulsada(ev,index) {

	var estrellas = document.querySelectorAll(`[  data-falla-id = '${ev.dataset.fallaId}' ]`);
	var index = ev.dataset.index;

	if (estrellas[0].style.color == "yellow") {
		for (let i = 0; i < 5;i++) {
			estrellas[i].style.color = "black";
			
		}
		
	} 

	for (let i = 0; i < index ;i++) {
		estrellas[i].style.color = "yellow";
		
	}
	
}



function buscarUbicacion(coordenadas,urlImagen){
	let coordenadasMapa = getWGSCoordinates(coordenadas);

	var map = L.map('mapa').setView([coordenadasMapa[0], coordenadasMapa[1]], 16);
	let tilerMapUrl = 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=FeZF25xvZUuP463NS59g';
        L.tileLayer(tilerMapUrl, {
            attribution: 'Map data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Imagery © <a href="http://www.kartena.se/">Kartena</a>',
		}).addTo(map);
		

	/* var imagenFalla = L.icon({
		iconUrl: urlImagen,
	
		iconSize:     [50, 50], // size of the icon
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	}); */

	L.marker(coordenadasMapa).addTo(map);


}

function getWGSCoordinates(coordenadas) {
        
	// Cambiar la proyeccion de la referencia espacial 25830 a 4326
	let firstProjection  = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
	let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
	coordenadas = proj4(firstProjection, secondProjection, coordenadas);

	return [coordenadas[1], coordenadas[0]];
}


window.onload=init;
    

