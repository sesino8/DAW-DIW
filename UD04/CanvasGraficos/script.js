window.onload = function(){
   var boton = this.document.getElementsByName("grafiqueame")[0];
    boton.addEventListener("click", crear)
}

function crear(){

    let nombre = document.querySelectorAll("input[class='left']");
    let poder = document.querySelectorAll("input[class='right']");
    let dioses = [];
    let color = ["green", "red", "grey", "purple"]
    for (let i = 0; i < nombre.length; i++) {

        dioses.push({
            "nombre": nombre[i].value,
            "poder": parseInt(poder[i].value),
            "color": color[i]
        });


    }

    //Grafico de barras

    const canvas = document.getElementById("barras");

    // contexto -> ctx
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 1;

    for (let i = 1; i <= dioses.length; i++) {
        var poderDioses = dioses[i - 1].poder / 100;
        var nombreDioses = dioses[i - 1].nombre;
        var principioLinea = canvas.width/10 + 40*1;

        console.log(poderDioses)

        ctx.beginPath();
        ctx.moveTo(i * principioLinea - canvas.width/10, canvas.height);
        ctx.lineTo(i * principioLinea - canvas.width/10, poderDioses);
        ctx.lineTo(i * principioLinea, poderDioses);
        ctx.lineTo(i * principioLinea, canvas.height);
        //ctx.fill();200
        ctx.fillStyle = dioses[i-1].color;
        ctx.fill();
        ctx.font = "12px Arial";
        ctx.fillStyle = "black"
        ctx.fillText(nombreDioses, i * principioLinea - canvas.width/10, 20);
        
        ctx.stroke();

    }


    //Fin grafico de barras

    const canvasCircle = document.getElementById("circulo");

    let ctx2 = canvasCircle.getContext("2d");


    var total = dioses.reduce((suma,{poder}) => suma += poder,0);

    var anguloPrincipal = 0;
    var anguloFinal = 0;


    for (var i = 0; i < dioses.length; i++) {
        // Angulo Principal
        anguloPrincipal = anguloFinal;
        // Angulo Final
        anguloFinal = anguloFinal + (dioses[i].poder * 100 / total / 100) * 2 * Math.PI;

        ctx2.beginPath();
        // Rellenar color

        var pieRadius = Math.min(ctx2.canvas.width / 2, ctx2.canvas.height / 2);
        var labelX = ctx2.canvas.width / 2 + (pieRadius / 2 ) * Math.cos(anguloPrincipal + (anguloFinal - anguloPrincipal) / 2);
        var labelY = ctx2.canvas.height / 2 + (pieRadius / 2 ) * Math.sin(anguloPrincipal + (anguloFinal - anguloPrincipal) / 2)
        ctx2.fillStyle = dioses[i].color;
        ctx2.moveTo(200, 200);
        ctx2.arc(200, 200, 120, anguloPrincipal, anguloFinal);
        ctx2.lineTo(200, 200);
        ctx2.stroke();
        ctx2.fill();
        
        ctx2.font = "bold 10px Arial";
        ctx2.fillStyle = "black";

        ctx2.fillText(dioses[i].nombre, labelX, labelY);

       

        
    }

    var canvasLineas = document.getElementById( "lineaPuntos" ); 
    var context = canvasLineas.getContext( "2d" );
    var principio = canvas.height;
    
    

    for (let i = 1; i <= dioses.length; i++) {
        var poderDioses = dioses[i - 1].poder / 10;
        var nombreDioses = dioses[i - 1].nombre;

        context.beginPath();
        context.moveTo(i*80-80, principio);
        context.lineTo(i * 80 , poderDioses);
        principio = poderDioses;
        context.stroke();


        context.beginPath();
        context.arc(i*80, principio,10, 0, 2 * Math.PI);
        context.fillStyle = dioses[i-1].color;
        context.fill();
        context.stroke();

        context.fillText(dioses[i-1].nombre, i*90, principio);

    }
}