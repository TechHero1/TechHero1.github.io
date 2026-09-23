export function teste_export() {
    console.log("teste_export: certo");
}

function teste_local() {
    console.log("teste_local: certo");
}

teste_local();

function teste_body_local() {
    console.log("teste_body_local: certo");
}

function teste_body_onload_local() {
    console.log("teste_body_onload_local: certo");
}

document.body.onload = teste_body_onload_local();
