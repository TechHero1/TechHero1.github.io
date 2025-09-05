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

//const size_tag = /\<CLT=size(\d)\>|\<CLT=size(\d\.\d)\>/g;
const size_tag = /\<CLT=size(\d|\d\.\d)\>/g;

function load_list() {
    let content_list = document.querySelector(".dialogue_list");
    content_list.innerHTML = "";
    for (i = 0; i < json_list.length; i++) {
        let current_string = json_list[i].Text;
        current_string = current_string.replaceAll(/[\n]/g,"<br>");

        //SIZE
        for (itag = 0; itag < (current_string.match(size_tag) || []).length; itag++) {
            let size_match;

            while ((size_match = size_tag.exec(current_string)) !== null) {
                console.log(size_match[1]);
                current_string = current_string.replaceAll(size_match[0],`<span class="text-[${size_match[1]}rem]">`);
            }
        }

        //NORMAL
        for (itag = 0; itag < (current_string.match("<CLT=cltNORMAL>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltNORMAL>",`<span class="text-white">`);
        }

        //AZUL - MIND
        for (itag = 0; itag < (current_string.match("<CLT=cltMIND>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltMIND>",`<span class="text-blue-200">`);
        }

        //AMARELO - STRONG
        for (itag = 0; itag < (current_string.match("<CLT=cltSTRONG>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltSTRONG>",`<span class="text-yellow-200">`);
        }

        //VERDE - SYSTEM
        for (itag = 0; itag < (current_string.match("<CLT=cltSYSTEM>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltSYSTEM>",`<span class="text-green-200">`);
        }

        //AZUL - AGREE
        for (itag = 0; itag < (current_string.match("<CLT=cltAGREE>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltAGREE>",`<span class="text-blue-200">`);
        }

        //AMARELO - WEAK
        for (itag = 0; itag < (current_string.match("<CLT=cltWEAK>") || []).length; itag++) {
            current_string = current_string.replaceAll("<CLT=cltWEAK>",`<span class="text-yellow-200">`);
        }

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