// ==UserScript==
// @name         FEMNSS Marble Skin (Original Version)
// @version      2025-12-28
// @description  Very Simple FEMNSS Skin for Blue Marble
// @author       Far Eastern Magic Napping Society of Summer
// @icon         https://files.catbox.moe/qcf3ju.png
// @match        *://*.wplace.live/*
// ==/UserScript==

(function() {
    'use strict';
    function replaceImages() {
        document.querySelectorAll("img").forEach((img) => {
            if (img.src.startsWith("https://raw.githubusercontent.com/SwingTheVine/Wplace-BlueMarble/main/dist/assets/Favicon.png")) {
                img.src = "https://files.catbox.moe/qcf3ju.png";
            }
        });

        document.querySelectorAll("h1").forEach((h1) => {
            if (h1.innerHTML.startsWith("Blue Marble")) {
                h1.innerHTML = "FEMNSS Marble";
            }
        });
    }

    replaceImages();
})();