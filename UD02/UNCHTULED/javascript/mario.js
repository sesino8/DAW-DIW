marioVivo = true;
momias = [];
vidas = 5;
nivelPasado = false;
nivel = 1;
monedas = 0;
var interval;

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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0]];

    //No permitimos que los pergaminos se acumulen
    contadorPergaminos = 0;

    //Array de divs que contiene nuestro juego, es decir de bloques que pueden aparecer
    divSecreto = ["moneda", "peach", "moneda", "moneda", "moneda", "moneda", "pergamino", "momia", "llave", "moneda", "moneda", "moneda", "moneda", "nada", "nada", "nada", "nada", "nada", "nada", "nada"];

    // Recorre todas las posiciones y además va añadiendo los divs a cada posicion
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

    //Añade al documento el listener del teclado y además añade parrafos para el cuenteo de vidas, nivel y monedas;
    document.addEventListener('keydown', teclado);
    interval = setInterval(mueveTodasLasMomias, 500);
    var para = document.createElement("p");
    var node = document.createTextNode("Vidas: " + vidas);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

    var para = document.createElement("p");
    var node = document.createTextNode("Nivel: " + nivel);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

    var para = document.createElement("p");
    var node = document.createTextNode("Coins: " + monedas);
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

}

window.onload = function () {

    listo()
};

//Hace que al tocar la tecla interactue.
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
        document.getElementsByTagName("p")[1].innerHTML = "Nivel: " + nivel;

        nivelPasado = false;

        var list = document.getElementById("scores");
        var node = document.getElementsByTagName("p")[0];
        list.removeChild(node);
        var node2 = document.getElementsByTagName("p")[0];
        list.removeChild(node2);
        var node3 = document.getElementsByTagName("p")[0];
        list.removeChild(node3);

        var el2 = document.getElementById('scores');

        while (el2.firstChild) el2.removeChild(el2.firstChild);

        clearInterval(interval);

        var el = document.getElementById('mapa');

        while (el.firstChild) el.removeChild(el.firstChild);




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
    var elem;

    if (secreto == "moneda") {
        monedas += 50;
        document.getElementsByTagName("p")[2].innerHTML = "Coins: " + monedas;
    } else if (secreto == "llave") {

        var elem = document.createElement("img");
        elem.setAttribute("src", "./img/llave.png");
        elem.setAttribute("height", "50");
        elem.setAttribute("width", "50");
        document.getElementById("scores").appendChild(elem);

    } else if (secreto == "pergamino") {

        var elem = document.createElement("img");
        elem.setAttribute("src", "./img/pergamino.png");
        elem.setAttribute("height", "50");
        elem.setAttribute("width", "50");
        document.getElementById("scores").appendChild(elem);

    } else if (secreto == "peach") {
        var elem = document.createElement("img");
        elem.setAttribute("src", "./img/peach.png");
        elem.setAttribute("height", "50");
        elem.setAttribute("width", "50");
        document.getElementById("scores").appendChild(elem);

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

    document.getElementsByTagName("p")[0].innerHTML = "Vidas: " + vidas;


}

function gameOver() {


    document.body.style.backgroundColor = "black";


    document.getElementsByTagName("h1")[0].innerHTML = "GAME OVER";

    document.getElementById("pagina").style.color = "white";

    marioVivo = false;

    var para = document.createElement("p");
    var node = document.createTextNode("Pulsa para volver a jugar!");
    para.appendChild(node);
    var element = document.getElementById("scores");
    element.appendChild(para);

    var a = document.createElement('a');
    a.setAttribute('href', '../index.html');
    a.innerHTML = "JUGAR!";
    var element = document.getElementById("scores");
    element.appendChild(a);
    



    //setTimeout(record, 2000);

}



/* function record() {

    var person = prompt("Guarda tú record con el nombre!", "Ej. Toni");
    function WriteFile() {

        var fh = fopen("../MyFile.txt", 3); // Open the file for writing

        if (fh != -1) // If the file has been successfully opened
        {
            var str = person;
            fwrite(fh, str); // Write the string to a file
            fclose(fh); // Close the file
        }

    }

    WriteFile();
}
 */
