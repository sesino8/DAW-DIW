const urlRelojes = "http://mapas.valencia.es/lanzadera/opendata/relojes/JSON";

function filtroLetra(elemento){
    let letra=document.querySelector(`input[name="calle"]`).value;
    return elemento.properties.emplazamiento.startsWith(letra);
}

function buscar(){

    const fetchPromesa = fetch(urlRelojes);
    fetchPromesa.then(response => {
	return response.json();
    }).then(respuesta =>{
	const resultado=respuesta.features.filter(filtroLetra);

	let listado=document.createElement("ul");

	resultado.forEach(reloj=>{
	    let calleli=document.createElement("li");
	    calleli.innerHTML=reloj.properties.emplazamiento+" -- ["+reloj.geometry.coordinates+"]";
	    listado.appendChild(calleli);	    
	});

	document.querySelector(".resultados").innerHTML="";
	document.querySelector(".resultados").appendChild(listado);
    });

}

function init(){

    document.querySelector(`input[type="button"]`).addEventListener("click",buscar);    
    document.querySelector(`input[type="text"]`).addEventListener("input",toUpp);
}


window.onload=init;
    

