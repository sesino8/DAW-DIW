/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function startMigration(){

    
var p = document.querySelectorAll('progress'); 

for (let j = 0; j < p.length; j++) {
for (let index = 1; index <= 10; index++) {

    val = index * 10; 
    p[j].setAttribute('value', val);
    
}
}



}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click",startMigration);
}

// Init the environment when all is ready
window.onload=init;
