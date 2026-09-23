import * as testeFile from "./js/teste.js";

testeFile.teste_export();

function teste_main() {
    console.log("teste_main: certo");
}

teste_main();

function teste_body_main() {
    console.log("teste_body_main: certo");
}

function teste_body_onload_main() {
    console.log("teste_body_onload_main: certo");
}

document.body.onload = teste_body_onload_main();

//obs: onload direto da página não funciona
//obs 2: onload é realmente útil?
