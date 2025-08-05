var json_list = {};

function upload_json(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = JSON.parse(e.target.result);
      let formatted = JSON.stringify(result, null, 2);
      json_list = JSON.parse(formatted);
      document.querySelector(".file_name").innerHTML = files.name;
      load_list();
    }

    reader.readAsText(files);
  } catch (err) {
    console.error(err);
  }
}

const texto_azul = /\<CLT=cltMIND\>(.*?)\<CLT=cltNORMAL\>/g;
const texto_amarelo = /\<CLT=cltSTRONG\>(.*?)\<CLT=cltNORMAL\>/g;
const texto_verde = /\<CLT=cltSYSTEM\>(.*?)\<CLT=cltNORMAL\>/g;
const texto_azul_debate = /\<CLT=cltAGREE\>(.*?)\<CLT=cltNORMAL\>/g;
const texto_amarelo_debate = /\<CLT=cltWEAK\>(.*?)\<CLT=cltNORMAL\>/g;

//const texto_azul_noend = /\<CLT=cltMIND\>(.*?)(!\<CLT=cltNORMAL\>)/g;
const texto_azul_noend = /\<CLT=cltMIND\>(.*?)$/g;
//const texto_amarelo_noend = /\<CLT=cltSTRONG\>(.*?)(!\<CLT=cltNORMAL\>)/g;
const texto_amarelo_noend = /\<CLT=cltSTRONG\>(.*?)$/g;
//const texto_verde_noend = /\<CLT=cltSYSTEM\>(.*?)(!\<CLT=cltNORMAL\>)/g;
const texto_verde_noend = /\<CLT=cltSYSTEM\>(.*?)$/g;
//const texto_azul_debate_noend = /\<CLT=cltAGREE\>(.*?)(!\<CLT=cltNORMAL\>)/g;
const texto_azul_debate_noend = /\<CLT=cltAGREE\>(.*?)$/g;
//const texto_amarelo_debate_noend = /\<CLT=cltWEAK\>(.*?)(!\<CLT=cltNORMAL\>)/g;
const texto_amarelo_debate_noend = /\<CLT=cltWEAK\>(.*?)$/g;

function load_list() {
    let content_list = document.querySelector(".dialogue_list");
    for (i = 0; i < json_list.length; i++) {
        let current_string = json_list[i].Text;
        current_string = current_string.replaceAll(/[\n]/g,"<br>");

        //console.log(texto_azul);

        //AZUL - MIND - NORMAL
        for (itag = 0; itag < (current_string.match(texto_azul) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_azul)[itag]+" end");
            current_string = current_string.replaceAll(texto_azul,`<span class="text-blue-200">${current_string.match(texto_azul)[itag]}</span>`);
            current_string = current_string.replaceAll("<CLT=cltMIND>","");
        }

        //AZUL - MIND - NOEND
        for (itag = 0; itag < (current_string.match(texto_azul_noend) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_azul_noend)[itag]+" no_end");
            //current_string = current_string.replaceAll(current_string,`${current_string.split(current_string.match(texto_azul_noend)[itag])[0]}<span class="text-blue-200">${current_string.split(current_string.match(texto_azul_noend)[itag])[1]}</span>`);
            current_string = current_string.replaceAll(texto_azul_noend,`<span class="text-blue-200">${current_string.match(texto_azul_noend)[itag]}</span>`);
        }

        //AMARELO - STRONG - NORMAL
        for (itag = 0; itag < (current_string.match(texto_amarelo) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_amarelo)[itag]+" end");
            current_string = current_string.replaceAll(texto_amarelo,`<span class="text-yellow-200">${current_string.match(texto_amarelo)[itag]}</span>`);
            current_string = current_string.replaceAll("<CLT=cltSTRONG>","");
        }

        //AMARELO - STRONG - NOEND
        for (itag = 0; itag < (current_string.match(texto_amarelo_noend) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_amarelo_noend)[itag]+" no_end");
            //current_string = current_string.replaceAll(current_string,`${current_string.split(current_string.match(texto_amarelo_noend)[itag])[0]}<span class="text-yellow-200">${current_string.split(current_string.match(texto_amarelo_noend)[itag])[1]}</span>`);
            current_string = current_string.replaceAll(texto_amarelo_noend,`<span class="text-yellow-200">${current_string.match(texto_amarelo_noend)[itag]}</span>`);
        }

        //VERDE - SYSTEM - NORMAL
        for (itag = 0; itag < (current_string.match(texto_verde) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_verde)[itag]+" end");
            current_string = current_string.replaceAll(texto_verde,`<span class="text-green-200">${current_string.match(texto_verde)[itag]}</span>`);
            current_string = current_string.replaceAll("<CLT=cltSYSTEM>","");
        }

        //VERDE - SYSTEM - NOEND
        for (itag = 0; itag < (current_string.match(texto_verde_noend) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_verde_noend)[itag]+" no_end");
            //current_string = current_string.replaceAll(current_string,`${current_string.split(current_string.match(texto_verde_noend)[itag])[0]}<span class="text-green-200">${current_string.split(current_string.match(texto_verde_noend)[itag])[1]}</span>`);
            current_string = current_string.replaceAll(texto_verde_noend,`<span class="text-green-200">${current_string.match(texto_verde_noend)[itag]}</span>`);
        }

        //AZUL - AGREE - NORMAL
        for (itag = 0; itag < (current_string.match(texto_azul_debate) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_azul_debate)[itag]+" end");
            current_string = current_string.replaceAll(texto_azul_debate,`<span class="text-blue-200">${current_string.match(texto_azul_debate)[itag]}</span>`);
            current_string = current_string.replaceAll("<CLT=cltAGREE>","");
        }

        //AZUL - AGREE - NOEND
        for (itag = 0; itag < (current_string.match(texto_azul_debate_noend) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_azul_debate_noend)[itag]+" no_end");
            //current_string = current_string.replaceAll(current_string,`${current_string.split(current_string.match(texto_azul_debate_noend)[itag])[0]}<span class="text-blue-200">${current_string.split(current_string.match(texto_azul_debate_noend)[itag])[1]}</span>`);
            current_string = current_string.replaceAll(texto_azul_debate_noend,`<span class="text-blue-200">${current_string.match(texto_azul_debate_noend)[itag]}</span>`);
        }

        //AMARELO - WEAK - NORMAL
        for (itag = 0; itag < (current_string.match(texto_amarelo_debate) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_amarelo_debate)[itag]+" end");
            current_string = current_string.replaceAll(texto_amarelo_debate,`<span class="text-yellow-200">${current_string.match(texto_amarelo_debate)[itag]}</span>`);
            current_string = current_string.replaceAll("<CLT=cltWEAK>","");
        }

        //AMARELO - WEAK - NOEND
        for (itag = 0; itag < (current_string.match(texto_amarelo_debate_noend) || []).length; itag++) {
            //console.log(i+" "+current_string.match(texto_amarelo_debate_noend)[itag]+" no_end");
            //current_string = current_string.replaceAll(current_string,`${current_string.split(current_string.match(texto_amarelo_debate_noend)[itag])[0]}<span class="text-yellow-200">${current_string.split(current_string.match(texto_amarelo_debate_noend)[itag])[1]}</span>`);
            current_string = current_string.replaceAll(texto_amarelo_debate_noend,`<span class="text-yellow-200">${current_string.match(texto_amarelo_debate_noend)[itag]}</span>`);
        }

        //current_string = current_string.replaceAll(texto_azul,"<br>");

        if (json_list[i].hasOwnProperty("Speaker")) {
        content_list.innerHTML += `
            <div class="dialogue p-2 bg-black text-white w-[100%]">
                <div class="relative">
                <div class="dialogue_id absolute right-2 top-1">
                    ${json_list[i].Id}
                </div>
                </div>
                <div class="flex flex-row gap-4">
                <div class="dialogue_image p-2">
                    <img class="dialogue_img w-30 h-30" src="img/${json_list[i].Speaker}.png">
                </div>
                <div class="dialogue_text flex flex-col p-2 gap-1">
                    <div class="dialogue_speaker">
                    <b>${json_list[i].Speaker}</b>
                    </div>
                    <div class="dialogue_string">
                        ${current_string}
                    </div>
                </div>
                </div>
            </div>
        `
        }

        if (json_list[i].hasOwnProperty("Choice")) {
        content_list.innerHTML += `
            <div class="dialogue p-2 bg-black text-white w-[100%]">
                <div class="relative">
                <div class="dialogue_id absolute right-2 top-1">
                    ${json_list[i].Id}
                </div>
                </div>
                <div class="flex flex-row gap-4">
                <div class="dialogue_image p-2 opacity-0">
                    <img class="dialogue_img w-30 h-30" src="">
                </div>
                <div class="dialogue_text flex flex-col p-2 gap-1">
                    <div class="dialogue_speaker">
                    <b>Choice: ${json_list[i].Choice}</b>
                    </div>
                    <div class="dialogue_string">
                        ${json_list[i].Text}
                    </div>
                </div>
                </div>
            </div>
        `
        }
    }
}