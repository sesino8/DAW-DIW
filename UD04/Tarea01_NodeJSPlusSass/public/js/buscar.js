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
	const resultado=respuesta.features.filter(filtroLetra);

	let listado=document.querySelector(".resultados");

	resultado.forEach(falla=>{

		console.log(falla.properties.boceto_i)
		let celdaResultado = document.createElement("div");
		celdaResultado.classList.add("celdas");
		let parrafoResultado = document.createElement("p");
		parrafoResultado.innerText = falla.properties.nombre;
		let imagenResultado = document.createElement("img");
		imagenResultado.src = falla.properties.boceto_i;
		celdaResultado.appendChild(parrafoResultado);
		celdaResultado.appendChild(imagenResultado);
		
	    listado.appendChild(celdaResultado);	    
	});

	
    });

}

function init(){

    document.querySelector(`input[type="button"]`).addEventListener("click",buscar);    
    //document.querySelector(`input[type="text"]`).addEventListener("input",toUpp);
}


window.onload=init;
    

