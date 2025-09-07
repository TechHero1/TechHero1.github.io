function getImage() {
    let x = document.querySelector("#x").value;
    let y = document.querySelector("#y").value;
    document.querySelector(".img-preview").src = `https://backend.wplace.live/files/s0/tiles/${x}/${y}.png`;
    document.querySelector(".dl-btn").href = `https://backend.wplace.live/files/s0/tiles/${x}/${y}.png`;
    document.querySelector(".dl-btn").download = `${x}-${y}.png`;
}

function setBG(color) {
    document.querySelector(".img-bg").classList.remove("bg-white");
    document.querySelector(".img-bg").classList.remove("bg-[#9ebdff]");
    document.querySelector(".img-bg").classList.remove("bg-[#e3efd4]");
    document.querySelector(".img-bg").classList.add(color);
}