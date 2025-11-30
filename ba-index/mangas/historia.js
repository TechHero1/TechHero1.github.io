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

    set_filter_default();
}

function set_filter_default() {
    let all_students = Object.keys(yonkoma.translations);
    //console.log(all_students.length);
    //console.log(all_students);
    let all_students_en = [];
    for (let i = 0; i < all_students.length; i++) {
        //console.log(all_students[i]);
        students_selected.push(all_students[i]);

        let found = all_students.find((item_found) => item_found === all_students[i]);
        if (yonkoma.translations[found] != undefined) all_students_en.push(yonkoma.translations[found].en);
        else all_students_en.push(all_students[i]);
    }

    create_student_filters(all_students,all_students_en);

    loadContent();
}

function create_student_filters(students_ja,students_en) {
    //console.log(students_ja);
    //console.log(students_en);
    for (let i = 0; i < students_ja.length; i++) {
        document.querySelector(".filters").innerHTML += `<a tabindex="-1" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-150 cursor-pointer" onclick="switch_student('${students_ja[i]}',this)">${students_en[i]}</a>
        `
    }
}

function loadContent() {
    document.querySelector(".historia-conteudo").innerHTML = "";

    for (var i = 0; i < yonkoma[cur_serie].length; i++) {
        let chapter_id = yonkoma[cur_serie][i].id;

        let chapter_title = "";
        if (yonkoma[cur_serie][i].title != "No Title") chapter_title = yonkoma[cur_serie][i].title;

        let chapter_tweet = yonkoma[cur_serie][i].href;

        let complete_title = "";

        if (chapter_id != "" && chapter_title != "") complete_title = chapter_id+" - "+chapter_title;
        else complete_title = chapter_id+chapter_title;

        let chapter_students = "";
        //let chapter_students_tags = []; 
        for (var is = 0; is < yonkoma[cur_serie][i].students.length; is++) {
            //nome jp
            let cur_student_ja = yonkoma[cur_serie][i].students[is];
            //console.log("ja:"+ cur_student_ja);

            //all keys
            let all_students = Object.keys(yonkoma.translations);

            //pega id se key = nome jp
            let found = all_students.find((item_found) => item_found === cur_student_ja);
            //console.log("found: "+found);

            //nome en
            let cur_student_en;
            if (yonkoma.translations[found] != undefined) cur_student_en = yonkoma.translations[found].en;
            else cur_student_en = cur_student_ja;
            //else console.log("ainda não existe em ingles\n"+cur_student_ja);

            chapter_students += `<span class="bg-white border border-gray-200 rounded-md shadow-md py-1 px-2 h-min w-fit break-keep text-base/9" onclick="switch_student('${cur_student_ja}')">${cur_student_en}</span>
            `
        }

        let has_student = yonkoma[cur_serie][i].students.some(tags_result => students_selected.includes(tags_result));
        //console.log(yonkoma[cur_serie][i].students);
        //console.log(students_selected);
        //console.log(has_student);

        if (has_student) {

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
}

var students_selected = [];

function switch_student(student,element) {
    if (student == "none") {
        students_selected = [];
        loadContent();
        return;
    }
    if (student == "all") {
        students_selected = [];
        set_filter_default();
        return;
    }
    if (students_selected.includes(student)) {
        students_selected.splice(students_selected.indexOf(student), 1);
        loadContent();
        return;
    }
    students_selected.push(student);
    loadContent();
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

function switch_student_filter_dropdown() {
  if (document.querySelector(".student_filter_dropdown").classList.contains('hidden')) {
    document.querySelector(".student_filter_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".student_filter_dropdown").classList.add('hidden');
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.student_filter_dropdown_area').contains(e.target)){
    document.querySelector(".student_filter_dropdown").classList.add('hidden');
  }
});
