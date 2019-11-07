
function click() {
    document.querySelector('button').addEventListener('click', transicion);
}

function transicion() {

    var box = document.querySelectorAll('.caja');

    box.forEach(box => box.classList.toggle('transition'));

}

click();