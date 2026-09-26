var tab = "home";
var bg = "blue";

function saveValue(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadValue(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getTabDisplay() {
    switch (tab) {
        case "home":
            return "grid";
        case "browser":
            return "flex";
        case "wallpaper":
            return "flex";
    }
}

function changeTab(selTab) {
    tab = selTab;
    document.querySelectorAll(".tab").forEach(el => {
        if (el.classList.contains("tab-"+selTab)) {
            changeElementVisibility(el,getTabDisplay());
        } else {
            changeElementVisibility(el,"none");
        }
    });
    
}

function updateElementDisplay(element,value,loop) {
    if (loop) {
        element.forEach(el => {
            el.innerHTML = value;
        });
    } else {
        element.innerHTML = value;
    }
}

function changeElementVisibility(element,value) {
    element.style.display = value;
    //console.log(element.classList+" "+value);
}

function changeUrl(value) {
    document.getElementsByName('url-input')[0].value = value;
    if (value == "") {
        document.querySelector(".browser-iframe").src = "default.html";
        return
    }
    if (value.indexOf("https")) {
        document.querySelector(".browser-iframe").src = "https://"+value;
    } else {
        document.querySelector(".browser-iframe").src = value;
    }
}

function setBGColor(color) {
    if (bg == null) color = "default";
    let randomColors = ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"];

    if (color == "default") {
        let defaultColor = "blue";
        for (var i = 0; i < randomColors.length; i++) {
            if (randomColors[i] !== defaultColor) document.querySelector(".phone-bg").classList.remove(`bg-${randomColors[i]}-200`);
        };
        document.querySelector(".phone-bg").classList.add(`bg-${defaultColor}-200`);
        bg = defaultColor;
        saveValue("bg",bg);
        return
    }
    if (color == "random") {
        let randomChoice = Math.floor(Math.random() * randomColors.length);
        if (randomColors[randomChoice] == bg) {
            setBGColor('random');
            return
        }
        for (var i = 0; i < randomColors.length; i++) {
            if (i !== randomChoice) document.querySelector(".phone-bg").classList.remove(`bg-${randomColors[i]}-200`);
        };
        document.querySelector(".phone-bg").classList.add(`bg-${randomColors[randomChoice]}-200`);
        bg = randomColors[randomChoice];
        saveValue("bg",bg);
        return
    }
    document.querySelector(".phone-bg").classList.add(`bg-${color}-200`);
    bg = color;
    saveValue("bg",bg);
}

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if(hours.toString().length == 1) {
        hours = '0'+hours;
    }
    if(minutes.toString().length == 1) {
        minutes = '0'+minutes;
    }
    updateElementDisplay(document.querySelector(".clock"),hours+":"+minutes,false);
}

if (document.querySelector(".clock") !== null) {
    window.setInterval(function(){
	    updateClock();
    }, 1000);
}