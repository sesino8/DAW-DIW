mapa =
    [
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0]];
marioVivo = true;

function listo() {

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
                momiaX = i;
                momiaY = j;
            } else if (mapa[i][j] == 3) {
                newDiv.classList.add("pisado");
                mapa[i][j] = newDiv;

            } else if (mapa[i][j] == 1) {
                newDiv.classList.add("pared");
                mapa[i][j] = newDiv;
            }
            document.querySelector(".mapa").appendChild(newDiv);
        }
    }

    document.addEventListener('keydown', teclado);
    setInterval(moverMomia, 500);


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

    if (marioVivo && (marioY >= 0) && (marioY < 21) && (marioX >= 0) && (marioX < 14) && (!(mapa[x][y].classList.value.includes("pared"))) && !(mapa[x][y].classList.value.includes("secreto"))) {

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

    for (var j = 2; j <= 3; j++) {
        y = constanteY;
        for (var i = 1; i <= 3; i++) {

            mapa[x][y].classList.remove("pared");
            mapa[x][y].classList.add(divSecretoRandom());

            y++;
        }
        x++;
    }

}

function moverMomia() {
    x = momiaX;
    y = momiaY;

    hazY = false;
    hazX = false;

    contador = 0;


    

    if (Math.abs(momiaX - marioX) > Math.abs(momiaY - marioY)) {
        if (momiaX < marioX && (momiaX >= 0) && (momiaX < 14) && (!(mapa[x + 1][y].classList.value.includes("pared"))) && !(mapa[x + 1][y].classList.value.includes("secreto"))) {
            x++;
            hazX = true;
        } else if (momiaX >= marioX && (momiaX >= 0) && (momiaX < 14) && (!(mapa[x - 1][y].classList.value.includes("pared"))) && !(mapa[x - 1][y].classList.value.includes("secreto"))) {
            x--;
            hazX = true;
        } else if (momiaY < marioY && (momiaY >= 0) && (momiaY < 21) && (!(mapa[x][y + 1].classList.value.includes("pared"))) && !(mapa[x][y + 1].classList.value.includes("secreto"))) {
            y++;
            hazY = true;
        } else if (momiaY >= marioY && (momiaY >= 0) && (momiaY < 21) && (!(mapa[x][y - 1].classList.value.includes("pared"))) && !(mapa[x][y - 1].classList.value.includes("secreto"))) {
            y--;
            hazY = true;
        }
    } else {
        if (momiaY < marioY && (momiaY >= 0) && (momiaY < 21) && (!(mapa[x][y + 1].classList.value.includes("pared"))) && !(mapa[x][y + 1].classList.value.includes("secreto"))) {
            y++;
            hazY = true;
        } else if (momiaY >= marioY && (momiaY >= 0) && (momiaY < 21) && (!(mapa[x][y - 1].classList.value.includes("pared"))) && !(mapa[x][y - 1].classList.value.includes("secreto"))) {
            y--;
            hazY = true;
        } else if (momiaX < marioX && (momiaX >= 0) && (momiaX < 14) && (!(mapa[x + 1][y].classList.value.includes("pared"))) && !(mapa[x + 1][y].classList.value.includes("secreto"))) {
            x++;
            hazX = true;
        } else if (momiaX >= marioX && (momiaX >= 0) && (momiaX < 14) && (!(mapa[x - 1][y].classList.value.includes("pared"))) && !(mapa[x - 1][y].classList.value.includes("secreto"))) {
            x--;
            hazX = true;
        }
    }



    if (hazX) {


        mapa[momiaX][momiaY].classList.remove("momia");
        mapa[momiaX][momiaY].classList.add("cesped");

        momiaY = y;
        momiaX = x;

        mapa[momiaX][momiaY].classList.add("momia");


    }

    if (hazY) {

        mapa[momiaX][momiaY].classList.remove("momia");
        mapa[momiaX][momiaY].classList.add("cesped");

        momiaY = y;
        momiaX = x;
        mapa[momiaX][momiaY].classList.add("momia");

    }

    if (momiaX == marioX && momiaY == marioY) {

    mapa[momiaX][momiaY].classList.remove("momia");
    mapa[momiaX][momiaY].classList.add("cesped");

    momiaY = y;
    momiaX = x;

    marioVivo = false; /*esto se tendra que cambiar por vidas -- para que te reste vidas*/

    mapa[marioX][marioY].classList.remove("mario"); /**/
    

    mapa[momiaX][momiaY].classList.remove("mario");
    mapa[momiaX][momiaY].classList.add("momia");
    
    }

}

function divSecretoRandom(){

    divSecreto = ["moneda","moneda","moneda","moneda","moneda","moneda","pergamino","momia","momia","llave","moneda","moneda","moneda","moneda"];

    numeroRandom = Math.floor(Math.random() * divSecreto.length);

    

return divSecretoRandom[numeroRandom];

}