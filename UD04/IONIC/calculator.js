function onLoad() {
    rows = document.querySelectorAll("ion-row");

    for (let j = 1; j < 5; j++) {
        hijos = rows[j].children.length;
        for (let i = 0; i < hijos; i++) {
            rows[j].children[i].children[0].addEventListener("click", add)
            console.log(rows[j].children[i])
        }

    }

    document.addEventListener("ionChange", setStyle);
    setStyle();
}
function setStyle() {
    document.querySelectorAll("ion-content ion-button").forEach(function (b) {
        b.expand = "block";
        b.strong = "true";
        b.fill = document.getElementById("type").value;
        b.size = document.getElementById("size").value;
    });
}
function setResult(value) {
    document.getElementById("result").innerHTML = value;
}
function getResult() {
    return (document.getElementById("result").innerHTML);
}
function add() {

    var key = this.innerText;
    var result = getResult();
    if (result != "0" || isNaN(key)) setResult(result + key);
    else setResult(key);
}
function calc() {
    var result = eval(getResult());
    setResult(result);
}
function del() {
    setResult(0);
}
