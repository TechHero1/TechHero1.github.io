var i;

function remote_open_tab(tab_name) {
    var tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        if (tab_name == tablinks[i].innerHTML) {
            tablinks[i].click();
            return
        }
    }
}

function open_tab(evt, tab_name) {
  var tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab_name).style.display = "block";
  evt.currentTarget.className += " active";
}

function switch_view() {
  let content_list = document.querySelector(".content_list");
  let button = document.querySelector(".switch_view_btn");
  if (content_list.classList.contains("grid-list-view")) {
    content_list.classList.remove("grid-list-view");
    list.list_mode = "grid";
    //console.log(list.list_mode);
    button.innerHTML = `<i class="fa fa-th"></i>`;
    return
  }
  content_list.classList.add("grid-list-view");
  list.list_mode = "list";
  //console.log(list.list_mode);
  button.innerHTML = `<i class="fa fa-list"></i>`;
}

function switch_apoio() {
  if (!list.apoio) {
    list.apoio = true;
    //console.log(list.apoio);
    document.querySelector(".iichan_tab").classList.remove('hidden');
    document.querySelector(".iichan_nav").classList.remove('hidden');
    return
  }
  list.apoio = false;
  //console.log(list.apoio);
  document.querySelector(".iichan_tab").classList.add('hidden');
  document.querySelector(".iichan_nav").classList.add('hidden');
}

function switch_cores() {
  if (!list.cores) {
    list.cores = true;
    //console.log(list.cores);
    load_list();
    return
  }
  list.cores = false;
  //console.log(list.cores);
  load_list();
}

var cur_editing_id;
var scroll_y = window.scrollY;
var last_item_pos;

function edit_item(id) {
  last_item_pos = window.scrollY;
  window.scrollTo(scroll_y, 0);
  cur_editing_id = id;
  //console.log(list.itens);
  remote_open_tab('Editar');

  if (id == "new") {
    document.querySelector(".edit_title").innerHTML = "Adicionar um novo item";
    document.querySelector(".name_input").value = "";
    document.querySelector(".status_input").value = "Planejo";
    document.querySelector(".progresso_input").value = 0;
    document.querySelector(".volumes_input").value = 0;
    document.querySelector(".horas_input").value = 0;
    document.querySelector(".minutos_input").value = 0;
    document.querySelector(".moji_input").value = 0;
    document.querySelector(".img_input").value = "";
    document.querySelector(".img_preview").src = "";
    document.querySelector(".img_preview").classList.add('hidden');
    document.querySelector(".nota_input").value = "";
  } else {
    document.querySelector(".edit_title").innerHTML = "Editar item \""+list.itens[id].dados.titulo+"\"";
    document.querySelector(".tipo_input").value = list.itens[id].tipo;
    document.querySelector(".name_input").value = list.itens[id].dados.titulo;
    document.querySelector(".status_input").value = list.itens[id].dados.status;
    document.querySelector(".progresso_input").value = list.itens[id].dados.progresso;
    document.querySelector(".volumes_input").value = list.itens[id].dados.volumes;
    document.querySelector(".horas_input").value = list.itens[id].dados.horas;
    document.querySelector(".minutos_input").value = list.itens[id].dados.minutos;
    document.querySelector(".moji_input").value = list.itens[id].dados.moji;
    document.querySelector(".img_input").value = list.itens[id].dados.img;
    document.querySelector(".img_preview").src = list.itens[id].dados.img;
    if (document.querySelector(".img_input").value != "") {
      document.querySelector(".img_preview").classList.remove('hidden');
    } else {
      document.querySelector(".img_preview").classList.add('hidden');
    }
    let anotacao = list.itens[id].dados.nota;
    if (!list.itens[id].dados.hasOwnProperty("nota")) anotacao = "";
    document.querySelector(".nota_input").value = anotacao;
  }

  if (document.querySelector('.nota_link') != null) {
    window.addEventListener('click', function(e){   
      if (document.querySelector('.nota_link').contains(e.target)){
        remote_open_tab('Visualizar');
      }
    });
  }
}

function save_item(){
  //se id for "new", add[id], return
  if (cur_editing_id == "new") {
    let listnew = list.itens.length;
    
    list.itens[listnew] = {
      "tipo":document.querySelector(".tipo_input").value,
      "dados": {
        "titulo": document.querySelector(".name_input").value,
        "status": document.querySelector(".status_input").value,
        "progresso": document.querySelector(".progresso_input").value,
        "moji": document.querySelector(".moji_input").value,
        "horas": document.querySelector(".horas_input").value,
        "minutos": document.querySelector(".minutos_input").value,
        "volumes": document.querySelector(".volumes_input").value,
        "img": document.querySelector(".img_input").value,
        "nota": document.querySelector(".nota_input").value
      }
    };
    remote_open_tab('Visualizar');
    load_list();
    //console.log(list);
    window.scrollTo(scroll_y, last_item_pos);
    return
  }
  //substituir[id]
  list.itens[cur_editing_id] = {
    "tipo":document.querySelector(".tipo_input").value,
    "dados": {
      "titulo": document.querySelector(".name_input").value,
      "status": document.querySelector(".status_input").value,
      "progresso": document.querySelector(".progresso_input").value,
      "moji": document.querySelector(".moji_input").value,
      "horas": document.querySelector(".horas_input").value,
      "minutos": document.querySelector(".minutos_input").value,
      "volumes": document.querySelector(".volumes_input").value,
      "img": document.querySelector(".img_input").value,
      "nota": document.querySelector(".nota_input").value
    }
  };
  remote_open_tab('Visualizar');
  load_list();
  window.scrollTo(scroll_y, last_item_pos);
}

function delete_item(){
  //se id não for "new", remove[id]
  if (cur_editing_id != "new") {
    list.itens = list.itens.filter(item => item !== list.itens[cur_editing_id]);
  }
  remote_open_tab('Visualizar');
  load_list();
  window.scrollTo(scroll_y, last_item_pos);
}

function cancel_item(){
  remote_open_tab('Visualizar');
  window.scrollTo(scroll_y, last_item_pos);
}

var filters = {
  "Tudo": '["Novel","Anime","Mangá","Jogo","Filme","Áudio","Dorama/Série","Stage","Fanfic","Short Story","Ensaio"]',
  "Mídia": '["Novel","Anime","Mangá","Jogo","Filme","Áudio","Dorama/Série","Stage"]',
  "Short Stories e Fanfics": '["Fanfic","Short Story","Ensaio"]',
  "Novel": '["Novel"]',
  "Anime": '["Anime"]',
  "Mangá": '["Mangá"]',
  "Jogo": '["Jogo"]',
  "Filme": '["Filme"]',
  "Áudio": '["Áudio"]',
  "Dorama/Série": '["Dorama/Série"]',
  "Stage": '["Stage"]',
  "Fanfic": '["Fanfic"]',
  "Short Story": '["Short Story"]',
  "Ensaio": '["Ensaio"]',
  "Planejamento": '["Planejo"]',
  "Pendente": '["Progredindo"]',
  "Repetindo": '["Repetindo"]',
  "Concluído": '["Completo"]',
  "Pausado": '["Pausado"]',
  "Dropado": '["Dropado"]'
}

var list = {
    "itens": [],
    "list_mode": "grid",
    "cores": true,
    "apoio": false,
    "last_filter": ['Tudo','tipo']
};

function upload_list(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = JSON.parse(e.target.result);
      let formatted = JSON.stringify(result, null, 2);
      list = JSON.parse(formatted);
      if (!list.hasOwnProperty("last_filter")) list.last_filter = ['Tudo','tipo'];
      console.log(list.last_filter);
      change_filter(list.last_filter[0],list.last_filter[1]);
      load_list();
      remote_open_tab('Visualizar');
    }

    reader.readAsText(files);
  } catch (err) {
    console.error(err);
  }
}

function download_list() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
  var dlAnchorElem = document.querySelector('.download_link');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "lista.json");
  dlAnchorElem.click();
}

function load_list() {
  document.querySelector(".content_list").innerHTML = "";
  
  let content_list = document.querySelector(".content_list");
  let button = document.querySelector(".switch_view_btn");
  if (content_list.classList.contains("grid-list-view") && list.list_mode == "grid") {
    button.click();
  }
  if (!content_list.classList.contains("grid-list-view") && list.list_mode == "list") {
    button.click();
  }

  if (list.apoio) {
    document.querySelector(".iichan_tab").classList.remove('hidden');
    document.querySelector(".iichan_nav").classList.remove('hidden');
  }

  let filtered_list = [];
  if (cur_filter_type == "tipo") {
    for (i = 0; i < list.itens.length; i++) {
      if (JSON.parse(filters[cur_filter]).includes(list.itens[i].tipo)) {
        filtered_list.push(i);
      }
    }
  }
  if (cur_filter_type == "status") {
    for (i = 0; i < list.itens.length; i++) {
      if (JSON.parse(filters[cur_filter]).includes(list.itens[i].dados.status)) {
        filtered_list.push(i);
      }
    }
  }

  for (i = 0; i < list.itens.length; i++) {
    if (filtered_list.includes(i)) {
    let progresso_string;
    let volumes_string;
    let progresso_traço;

    if (list.itens[i].tipo == "Novel" || list.itens[i].tipo == "Mangá") {
      progresso_string = list.itens[i].dados.progresso + " capítulos";
      if (list.itens[i].dados.volumes <= 1) {
        volumes_string = list.itens[i].dados.volumes + " volume";
        progresso_traço = " - ";
      } else {
        volumes_string = list.itens[i].dados.volumes + " volumes";
        progresso_traço = " - ";
      }
    }
    if (list.itens[i].tipo == "Anime" || list.itens[i].tipo == "Filme" || list.itens[i].tipo == "Áudio" || list.itens[i].tipo == "Dorama/Série" || list.itens[i].tipo == "Stage") {
      progresso_string = list.itens[i].dados.progresso + " episódios";
      volumes_string = "";
      progresso_traço = "";
    }
    if (list.itens[i].tipo == "Jogo" || list.itens[i].tipo == "Fanfic" || list.itens[i].tipo == "Short Story" || list.itens[i].tipo == "Ensaio") {
      progresso_string = "";
      progresso_traço = "";
      volumes_string = "";
    }

    if (list.itens[i].dados.status == "Planejo" && list.itens[i].dados.progresso == 0) {
      progresso_string = "";
      progresso_traço = "";
      volumes_string = "";
    }

    let moji_string;
    if (list.itens[i].dados.moji == 0) {
      moji_string = "";
    } else if (list.itens[i].dados.moji == 1) {
      moji_string = list.itens[i].dados.moji + " caractere";
    } else {
      moji_string = list.itens[i].dados.moji + " caracteres";
    }

    let horas = String(list.itens[i].dados.horas).padStart(2, '0');
    let minutos = String(list.itens[i].dados.minutos).padStart(2, '0');
    let tempo_string;
    if (list.itens[i].dados.horas == 0 && list.itens[i].dados.minutos == 0) {
      tempo_string = "";
    } else {
      tempo_string = horas+":"+minutos;
    }

    let bg_color = "#ffffff";
    if (list.cores) {
      switch(list.itens[i].tipo) {
        default:
          bg_color = "#ffffff";
          break;
        case "Novel":
          bg_color = "#e6cff2";
          break;
        case "Anime":
          bg_color = "#bfe1f6";
          break;
        case "Mangá":
          bg_color = "#d4edbc";
          break;
        case "Jogo":
          bg_color = "#ffcfc9";
          break;
        case "Filme":
          bg_color = "#c6dbe1";
          break;
        case "Áudio":
          bg_color = "#ffc8aa";
          break;
        case "Dorama/Série":
          bg_color = "#fe3967";
          break;
        case "Stage":
          bg_color = "#efe80e";
          break;
        case "Fanfic":
          bg_color = "#a8a8a8";
          break;
        case "Short Story":
          bg_color = "#ce5add";
          break;
        case "Ensaio":
          bg_color = "#ffffff";
          break;
      }
    }

    let img_hidden = "";
    if (list.itens[i].dados.img == "") img_hidden = "hidden";

    let anotacao = list.itens[i].dados.nota;
    if (!list.itens[i].dados.hasOwnProperty("nota")) anotacao = "";
    anotacao = anotacao.linkify({
      className: "nota_link text-blue-500",
      target: "_blank"
    });
    anotacao = anotacao.replaceAll(/[\n]/g,"<br>");

    document.querySelector(".content_list").innerHTML += `
    <div style="background-color:${bg_color}" class="flex flex-col p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group/title hover:bg-gray-200" id="${i}" onclick="edit_item(this.id)">
      <div class="p-1 flex flex-row gap-2 h-[225px]">
        <img src="${list.itens[i].dados.img}" class="aspect-[1/1.33] ${img_hidden}">
        <div class="w-[100%]">
          <b>${list.itens[i].dados.titulo}</b>
          <button class="pl-2 float-right sm:opacity-0 group-hover/title:opacity-100"><i class="fa fa-pencil"></i></button>
          <br><br>
          <p>${list.itens[i].tipo}</p>
          <p>${list.itens[i].dados.status}</p>
          <p class="flex flex-row gap-2 items-center">
            <span>${progresso_string}${progresso_traço}${volumes_string}</span>
          </p>
          <p>${tempo_string}</p>
          <p>${moji_string}</p>
        </div>
      </div>
      <p class="nota_div p-1">${anotacao}</p>
    </div>
    `
  }
  }
}

function update_preview_image() {
  document.querySelector(".img_preview").src = document.querySelector(".img_input").value;
  document.querySelector(".img_preview").classList.remove('hidden');
}

var cur_filter = "Tudo";

function switch_filter() {
  if (document.querySelector(".filter_dropdown").classList.contains('hidden')) {
    document.querySelector(".filter_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".filter_dropdown").classList.add('hidden');
}

var cur_filter_type = "tipo";

function change_filter(selected_filter,filter_type) {
  cur_filter = selected_filter;
  cur_filter_type = filter_type;
  load_list();
  document.querySelector(".filter_dropdown").classList.add('hidden');
  list.last_filter = [cur_filter,cur_filter_type];
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.filter_dropdown_area').contains(e.target)){
    document.querySelector(".filter_dropdown").classList.add('hidden');
  }
});