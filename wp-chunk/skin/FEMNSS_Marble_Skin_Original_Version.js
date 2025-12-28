// ==UserScript==
// @name         FEMNSS Marble Skin (Original Version)
// @version      2025-12-28
// @description  Very Simple FEMNSS Skin for Blue Marble
// @author       Far Eastern Magic Napping Society of Summer
// @icon         https://files.catbox.moe/qcf3ju.png
// @match        *://*.wplace.live/*
// @updateURL    http://techhero1.github.io/wp-chunk/skin/FEMNSS_Marble_Skin_Original_Version.user.js
// @downloadURL  http://techhero1.github.io/wp-chunk/skin/FEMNSS_Marble_Skin_Original_Version.user.js
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