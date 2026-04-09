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

const emote_tag = /\[emote:(.*):(.*)\]/g;

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
                current_msg.content = current_msg.content.replaceAll(emote_match[0],`<img src="https://files.kick.com/emotes/${emote_match[1]}/fullsize" title="${emote_match[2]}" height="28px" width="28px">`);
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
}