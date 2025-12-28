// ==UserScript==
// @name         FEMNSS Marble Skin (Skirk Version)
// @version      2025-12-28
// @description  Very Simple FEMNSS Skin for Skirk Marble
// @author       Far Eastern Magic Napping Society of Summer
// @icon         https://files.catbox.moe/qcf3ju.png
// @match        *://*.wplace.live/*
// ==/UserScript==

(function() {
    'use strict';
    function replaceImages() {
        document.querySelectorAll("img").forEach((img) => {
            if (img.src.startsWith("https://raw.githubusercontent.com/Seris0/Wplace-SkirkMarble/main/dist/assets/Favicon.png")) {
                img.src = "https://files.catbox.moe/qcf3ju.png";
            }
        });

        document.querySelectorAll("h1").forEach((h1) => {
            if (h1.innerHTML.startsWith("Skirk Marble")) {
                h1.innerHTML = "FEMNSS Marble";
            }
        });
    }

    replaceImages();
})();