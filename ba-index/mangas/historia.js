var yonkoma = {
    ja: [

    ],
    en: [

    ],
    aoharu: [

    ],
    translations: [

    ],
    translations_ja: [

    ]
}

var cur_serie;

async function procurarParam() {
    let searchParams = new URLSearchParams(window.location.search);
    cur_serie = searchParams.get('id');

    //fetch ja
    let ja_fetch_object = await fetch("https://m19e.github.io/bluearchive-4panel/panels/ja.json");
    yonkoma.ja = await ja_fetch_object.json();

    //fetch en
    let en_fetch_object = await fetch("https://m19e.github.io/bluearchive-4panel/panels/en.json");
    yonkoma.en = await en_fetch_object.json();

    //fetch aoharu
    let aoharu_fetch_object = await fetch("https://m19e.github.io/bluearchive-4panel/panels/aoharu.json");
    yonkoma.aoharu = await aoharu_fetch_object.json();
    /*
    //fetch playable characters
    let playable_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/playable/en.json");
    yonkoma.translations.playable = await playable_fetch_object.json();

    //fetch npcs
    let npc_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/npc/en.json");
    yonkoma.translations.npc = await npc_fetch_object.json();
    */
    //fetch playable characters
    let playable_ja_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/playable/ja.json");
    yonkoma.translations_ja = await playable_ja_fetch_object.json();

    //fetch npcs
    let npc_ja_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/npc/ja.json");
    //yonkoma.translations_ja = await npc_ja_fetch_object.json();
    yonkoma.translations_ja = Object.assign(yonkoma.translations_ja,await npc_ja_fetch_object.json());

    loadContent();
}

function loadContent() {
    for (var i = 0; i < yonkoma[cur_serie].length; i++) {
        let chapter_id = yonkoma[cur_serie][i].id;

        let chapter_title = "";
        if (yonkoma[cur_serie][i].title != "No Title") chapter_title = yonkoma[cur_serie][i].title;

        let chapter_tweet = yonkoma[cur_serie][i].href;

        let complete_title = "";

        if (chapter_id != "" && chapter_title != "") complete_title = chapter_id+" - "+chapter_title;
        else complete_title = chapter_id+chapter_title;

        //yonkoma[cur_serie][i].students = translate_students(yonkoma[cur_serie][i].students);

        let chapter_students = ""; 
        for (var is = 0; is < yonkoma[cur_serie][i].students.length; is++) {
            let cur_student_ja = yonkoma[cur_serie][i].students[is];
            let cur_student_en = yonkoma.translations_ja[cur_student_ja].en;
            //console.log(cur_student_ja);
            //console.log(cur_student_en);
            //chapter_students += `<span class="bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit break-keep text-base/9" onclick="switch_student('${yonkoma[cur_serie][i].students[is]}')">${yonkoma[cur_serie][i].students[is]}</span>
            //`
            chapter_students += `<span class="bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit break-keep text-base/9" onclick="switch_student('${cur_student_en}')">${cur_student_en}</span>
            `
        }
        /*
        if (cur_serie == "ja"  && !yonkoma[cur_serie][i].hasOwnProperty("deleted") || cur_serie == "aoharu" && !yonkoma[cur_serie][i].hasOwnProperty("deleted")) {
            document.querySelector(".historia-conteudo").innerHTML += `
                <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                    <div class="mb-2">${complete_title}</div>
                     ${chapter_students}
                    <hr class="m-5">
                    <div>Opções de leitura</div>
                    <div class="flex flex-row gap-4 place-content-center">
                        <a class="text-blue-500 bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit" href="${chapter_tweet}" target="_blank">Twitter</a>
                    </div>
                </div>
            `
        }

        if (cur_serie == "ja"  && yonkoma[cur_serie][i].hasOwnProperty("deleted") || cur_serie == "aoharu" && yonkoma[cur_serie][i].hasOwnProperty("deleted")) {
            document.querySelector(".historia-conteudo").innerHTML += `
                <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                    <div class="mb-2">${complete_title}</div>
                     ${chapter_students}
                    <hr class="m-5">
                    <div>Opções de leitura</div>
                    <div class="flex flex-row gap-4 place-content-center">
                        <a class="text-blue-500 bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit" href="${chapter_tweet}" target="_blank">Site</a>
                    </div>
                </div>
            `
        }

        if (cur_serie == "en") {
            document.querySelector(".historia-conteudo").innerHTML += `
                <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                    <div class="mb-2">${complete_title}</div>
                    ${chapter_students}
                    <hr class="m-5">
                    <div>Opções de leitura</div>
                    <div class="flex flex-row gap-4 place-content-center">
                        <a class="text-blue-500 bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit" href="${chapter_tweet}" target="_blank">Twitter</a>
                    </div>
                </div>
            `
        }

        if (yonkoma[cur_serie][i].hasOwnProperty("deleted")) console.log(i+" foi de lost media");
        */

        document.querySelector(".historia-conteudo").innerHTML += `
            <a class="h-[100%]" href="${chapter_tweet}" target="_blank">
                <div class="h-[100%] p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                    <div class="mb-2">${complete_title}</div>
                    ${chapter_students}
                </div>
            </a>
        `
    }
}

var students_selected = [];

function switch_student(student) {
    if (students_selected.includes(student)) students_selected.splice(students_selected.indexOf(student), 1);
    else students_selected.push(student);
}

function translate_students(students) {
    let translated_students;
    let students_string;

    //console.log(students);

    //Jogável
    students_string = JSON.stringify(students);
    /*
    students_string = students_string.replace("アイリ","Airi");
    students_string = students_string.replace("アカネ","Akane");
    students_string = students_string.replace("アカリ","Akari");
    students_string = students_string.replace("アコ","Ako");
    students_string = students_string.replace("アオバ","Aoba");
    students_string = students_string.replace("アリス","Arisu");
    students_string = students_string.replace("アル","Aru");
    students_string = students_string.replace("アスナ","Asuna");
    students_string = students_string.replace("アツコ","Atsuko");
    students_string = students_string.replace("アヤネ","Ayane");
    students_string = students_string.replace("アズサ","Azusa");
    students_string = students_string.replace("チェリノ","Cherino");
    students_string = students_string.replace("チアキ","Chiaki");
    students_string = students_string.replace("チヒロ","Chihiro");
    students_string = students_string.replace("チナツ","Chinatsu");
    students_string = students_string.replace("チセ","Chise");
    students_string = students_string.replace("エイミ","Eimi");
    students_string = students_string.replace("エリ","Eri");
    students_string = students_string.replace("シロコ","Shiroko");
    */
    
    for (var i = 0; i < Object.keys(yonkoma.translations.playable).length; i++) {
        students_string = students_string.replace(new RegExp(`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].ja}\"`,"gm"),`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].en}\"`);
        //console.log(yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].en);
        //console.log(students_string);
        //console.log(new RegExp(`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].ja}\"`,"gm"));
        //console.log(students_string.replace(new RegExp(`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].ja}\"`,"gm"),`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].en}\"`));
        //let test_string = "カリン\nリン\nカリン"
        //console.log(test_string.replace(new RegExp(`^リン+$`,"gm"),"Rin"));
    }

    //NPC
    /*
    students_string = students_string.replace("アケミ","Akemi");
    students_string = students_string.replace("アロナ","Arona");
    */

    for (var i = 0; i < Object.keys(yonkoma.translations.npc).length; i++) {
        students_string = students_string.replace(new RegExp(`\"${yonkoma.translations.npc[Object.keys(yonkoma.translations.npc)[i]].ja}\"`,"gm"),`\"${yonkoma.translations.npc[Object.keys(yonkoma.translations.npc)[i]].en}\"`);
        //console.log(yonkoma.translations.npc[Object.keys(yonkoma.translations.npc)[i]].en);
    }

    //console.log(students_string);

    translated_students = JSON.parse(students_string);

    //console.log(translated_students);

    return translated_students;
}