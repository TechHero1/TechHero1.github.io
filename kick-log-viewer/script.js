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

const emote_tag = /\[emote:(?<id>.+?):(?<name>.+?)\]/g;

function load_list() {
    let content_list = document.querySelector(".content_list");
    content_list.innerHTML = "";
    for (i = 0; i < json_list.length; i++) {
        let current_msg = json_list[i];

        //TIMESTAMP
        current_msg.createdAt = current_msg.createdAt.split("Z")[0];
        let current_msg_timestamp = current_msg.createdAt.split("T");

        //EMOTE
        for (itag = 0; itag < (current_msg.content.match(emote_tag) || []).length; itag++) {
            let emote_match;

            while ((emote_match = emote_tag.exec(current_msg.content)) !== null) {
                current_msg.content = current_msg.content.replaceAll(emote_match[0],`<img class="inline" src="https://files.kick.com/emotes/${emote_match.groups.id}/fullsize" title="${emote_match.groups.name}" height="28px" width="28px">`);
            }
        }
       
        content_list.innerHTML += `
            <div class="dialogue p-2 bg-black text-white w-[100%]">
                <div class="relative">
                <div class="dialogue_id absolute right-2 top-1">
                    ${current_msg_timestamp[0]} ${current_msg_timestamp[1]}
                </div>
                </div>
                <div class="flex flex-row gap-4">
                <div class="dialogue_text flex flex-col p-2 gap-1">
                    <div class="dialogue_speaker">
                        <b>${current_msg.username}</b>
                    </div>
                    <div class="dialogue_string">
                        ${current_msg.content}
                    </div>
                </div>
                </div>
            </div>
        `
    }
    document.querySelector(".download_btn").classList.remove("hidden");
}

function convert() {
    let chat = `<!DOCTYPE html>

<!--generated with https://techhero1.github.io/kick-log-viewer/-->

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<div class="chat flex flex-col gap-1">${document.querySelector(".content_list").innerHTML}</div>`;

    var dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(chat);
    document.body.innerHTML += '<a class="download_link hidden"></a>';
    var dlAnchorElem = document.querySelector('.download_link');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", document.querySelector(".file_name").innerHTML+".html");
    dlAnchorElem.click();
}
