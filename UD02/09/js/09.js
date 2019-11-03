
window.onload = function(){

    var keys = document.querySelectorAll(".key");

    keys.forEach(key => {
    
        key.addEventListener("transitionend", stop);
    
    });
    
    window.addEventListener('keydown', play);

}

function stop(e){
    e.target.classList.remove("reproduciendo");
    
}

function play(e){
    var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    key.classList.add("reproduciendo");
    audio.pause();
    audio.currentTime = 0;

    audio.play();
}