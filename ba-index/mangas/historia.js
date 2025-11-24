var yonkoma = {
    ja: [

    ],
    en: [

    ],
    aoharu: [

    ],
    translations: [

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

    //fetch playable characters
    let playable_ja_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/playable/ja.json");
    yonkoma.translations = await playable_ja_fetch_object.json();

    //fetch npcs
    let npc_ja_fetch_object = await fetch("https://raw.githubusercontent.com/m19e/bluearchive-4panel/refs/heads/main/docs/students/npc/ja.json");
    yonkoma.translations = Object.assign(yonkoma.translations,await npc_ja_fetch_object.json());

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

        let chapter_students = ""; 
        for (var is = 0; is < yonkoma[cur_serie][i].students.length; is++) {
            let cur_student_ja = yonkoma[cur_serie][i].students[is];
            let cur_student_en = yonkoma.translations[cur_student_ja].en;

            chapter_students += `<span class="bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit break-keep text-base/9" onclick="switch_student('${cur_student_en}')">${cur_student_en}</span>
            `
        }

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

    students_string = JSON.stringify(students);

    //Jogável
    for (var i = 0; i < Object.keys(yonkoma.translations.playable).length; i++) {
        students_string = students_string.replace(new RegExp(`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].ja}\"`,"gm"),`\"${yonkoma.translations.playable[Object.keys(yonkoma.translations.playable)[i]].en}\"`);
    }

    //NPC
    for (var i = 0; i < Object.keys(yonkoma.translations.npc).length; i++) {
        students_string = students_string.replace(new RegExp(`\"${yonkoma.translations.npc[Object.keys(yonkoma.translations.npc)[i]].ja}\"`,"gm"),`\"${yonkoma.translations.npc[Object.keys(yonkoma.translations.npc)[i]].en}\"`);
    }

    translated_students = JSON.parse(students_string);

    return translated_students;
}