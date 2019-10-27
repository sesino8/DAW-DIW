marioVivo = true;
momias = [];
vidas = 5;
nivelPasado = false;
nivel = 1;
monedas = 0;

function listo() {

    mapa =
        [
            [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


    contadorPergaminos = 0;

    divSecreto = ["moneda", "peach", "moneda", "moneda", "moneda", "moneda", "pergamino", "momia", "llave", "moneda", "moneda", "moneda", "moneda", "nada", "nada", "nada", "nada", "nada", "nada", "nada"];
    if (nivel > 1) {
        for (let i = 0; i < nivel; i++) {

            var index = divSecreto.indexOf("moneda");

            divSecreto[index] = "momia";
        }


    } else {

        mapa[12][16] = 8;

    }

    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 21; j++) {
            var newDiv = document.createElement("div");
            if (mapa[i][j] == 0) {
                newDiv.classList.add("cesped");
                mapa[i][j] = newDiv;
            } else if (mapa[i][j] == 2) {
                newDiv.classList.add("mario");
                mapa[i][j] = newDiv;
                marioX = i;
                marioY = j;
            } else if (mapa[i][j] == 8) {
                newDiv.classList.add("momia");
                mapa[i][j] = newDiv;
                momias.push(i, j);

            } else if (mapa[i][j] == 3) {
                newDiv.classList.add("pisado");
                mapa[i][j] = newDiv;

            } else if (mapa[i][j] == 1) {
                newDiv.classList.add("pared");
                mapa[i][j] = newDiv;
            }
            document.querySelector(".mapa").appendChild(newDiv);
            window.addEventListener("keydown", function (e) {
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            }, false);
        }
    }

    document.addEventListener('keydown', teclado);
    interval = setInterval(mueveTodasLasMomias, 500);
    var para = document.createElement("p");
    var node = document.createTextNode("Vidas : " + vidas);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

    var para = document.createElement("p");
    var node = document.createTextNode("Nivel : " + nivel);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

    var para = document.createElement("p");
    var node = document.createTextNode("Monedas : " + monedas);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

}

window.onload = function () {

    listo()
};

function teclado(evento) {

    var key = evento.keyCode;

    if (key == 37) {
        mover(marioX, marioY - 1);
    }
    if (key == 38) {
        mover(marioX - 1, marioY);
    }
    if (key == 39) {
        mover(marioX, marioY + 1);
    }
    if (key == 40) {
        mover(marioX + 1, marioY);
    }
}


function mover(x, y) {

    if (marioX == 0 && marioY == 7 && nivelPasado) {

        for (var i = 0; i < momias.length / 2; i++) {
            x = i * 2;

            mapa[x][x + 1] = 8;
        }

        nivel++;
        document.getElementsByTagName("p")[1].innerHTML = "Nivel : " + nivel;

        nivelPasado = false;

        var list = document.getElementById("scores");
        var node = document.getElementsByTagName("p")[0];
        list.removeChild(node);
        var node2 = document.getElementsByTagName("p")[0];
        list.removeChild(node2);
        var node3 = document.getElementsByTagName("p")[0];
        list.removeChild(node3);





        var el = document.getElementById('mapa');

        while (el.firstChild) el.removeChild(el.firstChild);

        clearInterval(interval);


        listo();

    } else {

        if (marioVivo && (marioY >= 0) && (marioY < 21) && (marioX >= 0) && (marioX < 14) && (((mapa[x][y].classList.value.includes("cesped"))) || (mapa[x][y].classList.value.includes("pisado")))) {

            mapa[marioX][marioY].classList.remove("mario");
            mapa[marioX][marioY].classList.add("pisado");
            marioY = y;
            marioX = x;

            mapa[marioX][marioY].classList.add("mario");

            x = 2;
            for (var i = 2; i < 6; i++) {
                y = 1;
                for (var j = 1; j < 6; j++) {

                    comprobarColumna(x, y);
                    y = y + 4;

                }
                x = x + 3;
            }

            for (var i = 0; i < momias.length / 2; i++) {
                x = i * 2;

                if (marioX == momias[x] && marioY == momias[x + 1]) {

                    if (!divSecreto.includes("pergamino") && contadorPergaminos < 1) {
                        contadorPergaminos++;
                        momias.splice(x, 2);
                        mapa[marioX][marioY].classList.remove("momia");
                        mapa[marioX][marioY].classList.add("mario");

                    } else {
                        --vidas;
                        mostrarVidas(vidas);

                        momias.splice(x, 2);

                        if (vidas < 1) {
                            gameOver();
                        } else {
                            mapa[marioX][marioY].classList.remove("momia");
                            mapa[marioX][marioY].classList.add("mario");

                        }


                    }
                }
            }



            if (!divSecreto.includes("llave") && !divSecreto.includes("peach")) {
                nivelPasado = true;
            }

        }
    }
}


function comprobarColumna(posicionX, posicionY) {

    seguir = true;
    rodeado = false;
    contador = 0;
    x = posicionX;
    y = posicionY;
    comprobadas = [0];

    while (seguir && !(rodeado)) {


        if (mapa[posicionX - 1][posicionY].classList.value.includes("pisado") || mapa[posicionX - 1][posicionY].classList.value.includes("pared")) {
            contador++;
        } else {
            seguir = false;
        }

        if (mapa[posicionX][posicionY - 1].classList.value.includes("pisado") || mapa[posicionX][posicionY - 1].classList.value.includes("pared")) {
            contador++;
        } else {
            seguir = false;
        }
        if (mapa[posicionX + 1][posicionY].classList.value.includes("pisado") || mapa[posicionX + 1][posicionY].classList.value.includes("pared")) {
            contador++;
        } else {
            seguir = false;
        }
        if (mapa[posicionX][posicionY + 1].classList.value.includes("pisado") || mapa[posicionX][posicionY + 1].classList.value.includes("pared")) {
            contador++;
        } else {
            seguir = false;

        }

        if (mapa[posicionX][posicionY + 1].classList.value.includes("pared")) {
            posicionY = posicionY + 1;
        } else if (mapa[posicionX + 1][posicionY].classList.value.includes("pared")) {
            posicionX = posicionX + 1;
        } else if (mapa[posicionX][posicionY - 1].classList.value.includes("pared")) {
            posicionY = posicionY - 1;
        } else if (mapa[posicionX - 1][posicionY].classList.value.includes("pared")) {
            posicionX = posicionX - 1;
        }

        if (contador / 4 == 6) {
            contador = 0;
            rodeado = true;
            stringX = x.toString();
            stringY = y.toString();

            if (!(comprobadas.includes(stringX + stringY))) {
                comprobadas.push(stringX + stringY);
                cambiarColumna(x, y);
            }

        }
    }

}

function cambiarColumna(x, y) {
    constanteY = y;
    secreto = divSecretoRandom();

    if (secreto == "moneda") {
        monedas += 50;
        document.getElementsByTagName("p")[2].innerHTML = "Monedas : " + monedas;
    }

    for (var j = 2; j <= 3; j++) {
        y = constanteY;
        for (var i = 1; i <= 3; i++) {

            mapa[x][y].classList.remove("pared");

            if (secreto != "momia") {

                if (j == 3 && i == 2) {
                    mapa[x][y].classList.add(secreto);
                }

            } else {

                if (j == 3 && i == 2) {
                    mapa[x][y].classList.add("momiaBloque");
                    mapa[0][7].classList.add("momia");
                    momias.push(0, 7);
                }



            }


            y++;
        }
        x++;
    }

}

function moverMomia(momiaX, momiaY, posicionX, posicionY) {


    x = momiaX;
    y = momiaY;

    hazY = false;
    hazX = false;

    contador = 0;



    if (Math.abs(momiaX - marioX) > Math.abs(momiaY - marioY)) {
        if (momiaX < marioX && (momiaX >= 0) && (momiaX < 14) && !(mapa[x + 1][y].classList.value.includes("momia")) && (((mapa[x + 1][y].classList.value.includes("pisado"))) || (mapa[x + 1][y].classList.value.includes("cesped")))) {
            x++;
            hazX = true;
        } else if (momiaX >= marioX && (momiaX >= 0) && (momiaX < 14) && !(mapa[x - 1][y].classList.value.includes("momia")) && (((mapa[x - 1][y].classList.value.includes("pisado"))) || (mapa[x - 1][y].classList.value.includes("cesped")))) {
            x--;
            hazX = true;
        } else if (momiaY < marioY && (momiaY >= 0) && (momiaY < 21) && !(mapa[x][y + 1].classList.value.includes("momia")) && (((mapa[x][y + 1].classList.value.includes("pisado"))) || (mapa[x][y + 1].classList.value.includes("cesped")))) {
            y++;
            hazY = true;
        } else if (momiaY >= marioY && (momiaY >= 0) && (momiaY < 21) && !(mapa[x][y - 1].classList.value.includes("momia")) && (((mapa[x][y - 1].classList.value.includes("pisado"))) || (mapa[x][y - 1].classList.value.includes("cesped")))) {
            y--;
            hazY = true;
        }
    } else {
        if (momiaY < marioY && (momiaY >= 0) && (momiaY < 21) && !(mapa[x][y + 1].classList.value.includes("momia")) && (((mapa[x][y + 1].classList.value.includes("pisado"))) || (mapa[x][y + 1].classList.value.includes("cesped")))) {
            y++;
            hazY = true;
        } else if (momiaY >= marioY && (momiaY >= 0) && (momiaY < 21) && !(mapa[x][y - 1].classList.value.includes("momia")) && (((mapa[x][y - 1].classList.value.includes("pisado"))) || (mapa[x][y - 1].classList.value.includes("cesped")))) {
            y--;
            hazY = true;
        } else if (momiaX < marioX && (momiaX >= 0) && (momiaX < 14) && !(mapa[x + 1][y].classList.value.includes("momia")) && (((mapa[x + 1][y].classList.value.includes("pisado"))) || (mapa[x + 1][y].classList.value.includes("cesped")))) {
            x++;
            hazX = true;
        } else if (momiaX >= marioX && (momiaX >= 0) && (momiaX < 14) && !(mapa[x - 1][y].classList.value.includes("momia")) && (((mapa[x - 1][y].classList.value.includes("pisado"))) || (mapa[x - 1][y].classList.value.includes("cesped")))) {
            x--;
            hazX = true;
        }
    }



    if (hazX) {

        mapa[momiaX][momiaY].classList.remove("momia");
        mapa[momiaX][momiaY].classList.add("cesped");

        momiaY = y;
        momiaX = x;
        momias[posicionX] = momiaX;
        momias[posicionY] = momiaY;

        mapa[momiaX][momiaY].classList.add("momia");

    }

    if (hazY) {

        mapa[momiaX][momiaY].classList.remove("momia");
        mapa[momiaX][momiaY].classList.add("cesped");

        momiaY = y;
        momiaX = x;
        momias[posicionX] = momiaX;
        momias[posicionY] = momiaY;

        mapa[momiaX][momiaY].classList.add("momia");

    }

    if (momiaX == marioX && momiaY == marioY) {

        mapa[momiaX][momiaY].classList.remove("momia");
        mapa[momiaX][momiaY].classList.add("cesped");

        momiaY = y;
        momiaX = x;
        momias[posicionX] = momiaX;
        momias[posicionY] = momiaY;

        if (!divSecreto.includes("pergamino") && contadorPergaminos < 1) {
            contadorPergaminos++;
            momias.splice(posicionX, 2);
            mapa[marioX][marioY].classList.remove("momia");
            mapa[marioX][marioY].classList.add("mario");

        } else {
            --vidas;
            mostrarVidas(vidas);



            momias.splice(posicionX, 2);


            if (vidas < 1) {
                gameOver();
            } else {
                mapa[marioX][marioY].classList.remove("momia");
                mapa[marioX][marioY].classList.add("mario");

            }


        }

    }

}

function divSecretoRandom() {

    var numeroRandom = Math.floor(Math.random() * divSecreto.length);

    var div = divSecreto[numeroRandom];

    divSecreto.splice(numeroRandom, 1);

    return div;

}

function mueveTodasLasMomias() {

    for (var i = 0; i < momias.length / 2; i++) {
        x = i * 2;
        moverMomia(momias[x], momias[x + 1], x, x + 1);


    }
}

function mostrarVidas(vidas) {

    document.getElementsByTagName("p")[0].innerHTML = "Vidas : " + vidas;


}

function gameOver() {


    document.body.style.backgroundColor = "black";


    document.getElementsByTagName("h1")[0].innerHTML = "GAME OVER";

    document.getElementById("pagina").style.color = "white";

    marioVivo = false;

    var para = document.createElement("p");
    var node = document.createTextNode("Hemos pasado un buen rato, para jugar otra vez tendrás que recargar la página");
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);


    /* var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    element.appendChild(x);

    puntos = document.getElementsByTagName("input").value;
    
    const fs = require('fs');

    fs.writeFile('records.txt', puntos, (err) => {

        if (err) throw err;
    }); */


}

