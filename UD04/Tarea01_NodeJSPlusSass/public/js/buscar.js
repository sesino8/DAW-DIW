const urlFallas = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";


function filtroLetra(elemento){
    let letra=document.querySelector(`input[name="nombre"]`).value;
    return elemento.properties.nombre.startsWith(letra);
}

function buscar(){

    const fetchPromesa = fetch(urlFallas);
    fetchPromesa.then(response => {
	return response.json();
    }).then(respuesta =>{
	const resultado=respuesta.features;

	var mapaDeFallas = new Map();

	function Falla (propiedades,geometria){

		this.propiedades = propiedades;
		this.geometria = geometria;

	}

	let listado=document.querySelector(".resultados");

	resultado.forEach(falla=>{

		mapaDeFallas.set(falla.properties.id,new Falla(falla.properties,falla.geometry));
		
		let celdaResultado = document.createElement("div");
		celdaResultado.classList.add("celdas");
		let resultadoFallas = document.createElement("p");
		resultadoFallas.innerText = falla.properties.nombre;
		let imagenFalla = document.createElement("img");
		imagenFalla.src = falla.properties.boceto_i;

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
	    listado.appendChild(celdaResultado);	    
	});

	
	});
	
	//proj4.defs('EPSG:25830', '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs');


}

function valoracion(idFalla, valoracion){





}

function colorEstrellaPulsada(ev,index) {

	console.log(ev);

	console.log(estrellas);

	var boton = ev;

	var estrellas = document.querySelectorAll(`[  data-falla-id = '${boton.data.fallaId}' ]`);

	if (estrellas[0].style.color == "yellow") {
		for (let i = 0; i < 5;i++) {
			estrellas[i].style.color = "black";
			
		}
		
	} 

	for (let i = 0; i < index ;i++) {
		estrellas[i].style.color = "yellow";
		
	}
	
	
	

	console.log(index)
}

function init(){

    document.querySelector(`input[type="button"]`).addEventListener("click",buscar);    
    //document.querySelector(`input[type="text"]`).addEventListener("input",toUpp);
}

function buscarUbicacion(){


	var geojson = {
		'type': 'Feature',
		'geometry': {
		  'type': 'Point',
		  'coordinates': [275815,4538291],
		},
		'properties': {
		  'name': 'Plaza Mayor de Salamanca'
		},
		'crs': {
		  'type': 'name',
		  'properties': {
			  'name': 'urn:ogc:def:crs:EPSG::25830'
			}
		  }
		};

}


window.onload=init;
    

