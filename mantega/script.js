function invejosoClicked(){
    if (document.getElementById("diamondo").paused){
        var diamondMusic = document.getElementById("diamondo");
        diamondMusic.volume = 0.9;
        diamondMusic.play();
    }
    var hitRandom = getRandomInt(1,10);
    var audio = new Audio("assets/audio/hit_sounds/hurt" + hitRandom + ".ogg");
    /*document.getElementById("debug").textContent = "assets/audio/hit_sounds/hurt" + hitRandom + ".ogg";*/
    audio.play();
    
    var invejaImg = document.getElementById("invejoso");
    
    invejaImg.src = "assets/invejoso_damagered.png";
    window.setTimeout(back2idle, 400);
    function back2idle(){
        invejaImg.src = "assets/invejoso_idle.png";
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}