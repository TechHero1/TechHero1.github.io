var i;
var nf = new Intl.NumberFormat('fr-FR');

function remote_open_tab(tab_name) {
    var tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        if (tab_name+"_tab" == tablinks[i].id) {
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
    button.innerHTML = `<i class="fa-solid fa-table-cells-large"></i>`;
    return
  }
  content_list.classList.add("grid-list-view");
  list.list_mode = "list";
  button.innerHTML = `<i class="fa-solid fa-bars"></i>`;
}

function switch_apoio() {
  if (!list.apoio) {
    list.apoio = true;
    hook = true;
    document.querySelector(".iichan_tab").classList.remove('hidden');
    document.querySelector(".iichan_nav").classList.remove('hidden');
    return
  }
  list.apoio = false;
  hook = true;
  document.querySelector(".iichan_tab").classList.add('hidden');
  document.querySelector(".iichan_nav").classList.add('hidden');
}

function switch_cores() {
  if (!list.cores) {
    list.cores = true;
    hook = true;
    document.querySelector(".cores_btn").classList.remove('opacity-30');
    document.querySelector(".cores_btn").classList.add('opacity-100');
    load_list();
    return
  }
  list.cores = false;
  hook = true;
  document.querySelector(".cores_btn").classList.remove('opacity-100');
  document.querySelector(".cores_btn").classList.add('opacity-30');
  load_list();
}

var cur_editing_id;
var scroll_y = window.scrollY;
var last_item_pos;

function edit_item(id) {
  hook = true;
  last_item_pos = window.scrollY;
  window.scrollTo(scroll_y, 0);
  cur_editing_id = id;
  remote_open_tab('Editar');

  if (id == "new") {
    document.querySelector(".edit_title").innerHTML = "<i class='fa-solid fa-plus'></i> Adicionar um novo item";
    document.querySelector(".name_input").value = "";
    document.querySelector(".progresso_input").value = 0;
    document.querySelector(".final_input").value = 0;
    document.querySelector(".volumes_input").value = 0;
    document.querySelector(".repeticoes_input").value = 0;
    document.querySelector(".horas_input").value = 0;
    document.querySelector(".minutos_input").value = 0;
    document.querySelector(".moji_input").value = 0;
    document.querySelector(".img_input").value = "";
    document.querySelector(".img_preview").src = "";
    document.querySelector(".img_preview").classList.add('hidden');
    document.querySelector(".nota_input").value = "";
    document.querySelector(".autotime_input").checked = false;
    document.querySelector(".prog_min_input").value = 0;
    document.querySelector(".values_input").value = "";
    update_autotime();
    update_preview_nota();
    update_item_values("");
  } else {
    document.querySelector(".edit_title").innerHTML = "<i class='fa-solid fa-pencil'></i> Editar item \""+list.itens[id].dados.titulo+"\"";
    document.querySelector(".tipo_input").value = list.itens[id].tipo;
    document.querySelector(".name_input").value = list.itens[id].dados.titulo;
    document.querySelector(".status_input").value = list.itens[id].dados.status;
    document.querySelector(".progresso_input").value = list.itens[id].dados.progresso;
    document.querySelector(".volumes_input").value = list.itens[id].dados.volumes;
    document.querySelector(".repeticoes_input").value = list.itens[id].dados.repeticoes;
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

    let custom_values = list.itens[id].dados.custom_values;
    if (!list.itens[id].dados.hasOwnProperty("custom_values")) custom_values = "";
    document.querySelector(".values_input").value = custom_values;

    let autotime = list.itens[id].dados.autotime;
    if (!list.itens[id].dados.hasOwnProperty("autotime")) autotime = false;
    document.querySelector(".autotime_input").checked = autotime;
    let prog_min = list.itens[id].dados.prog_min;
    if (!list.itens[id].dados.hasOwnProperty("prog_min")) prog_min = false;
    document.querySelector(".prog_min_input").value = prog_min;

    let final = list.itens[id].dados.final;
    if (!list.itens[id].dados.hasOwnProperty("final")) final = 0;
    document.querySelector(".final_input").value = final;
    update_autotime();
    update_preview_nota();
    update_item_values(custom_values);
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
        "repeticoes": document.querySelector(".repeticoes_input").value,
        "img": document.querySelector(".img_input").value,
        "nota": document.querySelector(".nota_input").value,
        "autotime": document.querySelector(".autotime_input").checked,
        "prog_min": document.querySelector(".prog_min_input").value,
        "final": document.querySelector(".final_input").value,
        "custom_values": document.querySelector(".values_input").value,
        "last_edited": Date.now()
      }
    };
    remote_open_tab('Visualizar');
    load_list();
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
      "repeticoes": document.querySelector(".repeticoes_input").value,
      "img": document.querySelector(".img_input").value,
      "nota": document.querySelector(".nota_input").value,
      "autotime": document.querySelector(".autotime_input").checked,
      "prog_min": document.querySelector(".prog_min_input").value,
      "final": document.querySelector(".final_input").value,
      "custom_values": document.querySelector(".values_input").value,
      "last_edited": Date.now()
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

  if (list.itens == "") hook = false;
}

function cancel_item(){
  remote_open_tab('Visualizar');
  window.scrollTo(scroll_y, last_item_pos);

  if (list.itens == "") hook = false;
}

var filters = {
  "Tudo_tipo": '["Novel","Anime","Mangá","Jogo","Filme","Áudio","Dorama/Série","Stage","Fanfic","Short Story","Ensaio"]',
  "Tudo_status": '["Progredindo","Planejo","Repetindo","Completo","Pausado","Abandonado"]',
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
  "Abandonado": '["Abandonado"]'
}

var site_colors = {
  "default": "#ffffff",
  "types": {
    "novel": "#e6cff2",
    "anime": "#bfe1f6",
    "manga": "#d4edbc",
    "jogo": "#ffcfc9",
    "filme": "#c6dbe1",
    "audio": "#ffc8aa",
    "dorama": "#fe3967",
    "stage": "#efe80e",
    "fanfic": "#a8a8a8",
    "shortstory": "#ce5add",
    "ensaio": "#ffffff"
  },
  "status": {
    "completo": "#4285f4",
    "progredindo": "#00ff00",
    "planejo": "#cfe2f3",
    "abandonado": "#ff0000",
    "repetindo": "#11734b",
    "pausado": "#ffe5a0"
  }
}

var list = {
    "itens": [],
    "list_mode": "grid",
    "cores": true,
    "apoio": false,
    "values_open": false,
    "last_filter": ['Tudo_tipo','Tudo_status']
};

var listname = "";

function upload_list(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = JSON.parse(e.target.result);
      let formatted = JSON.stringify(result, null, 2);
      list = JSON.parse(formatted);
      if (!list.hasOwnProperty("last_filter")) list.last_filter = ['Tudo_tipo','Tudo_status'];
      change_filter(list.last_filter[0],list.last_filter[1]);
      load_list();
      listname = files.name.replaceAll(/.json/g,"");
      document.querySelector(".file_name_input").value = listname;
      remote_open_tab('Visualizar');
      hook = true;
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
  listname = document.querySelector(".file_name_input").value;
  dlAnchorElem.setAttribute("download", listname+".json");
  dlAnchorElem.click();
  hook = false;
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

  if (!list.cores) {
    document.querySelector(".cores_btn").classList.remove('opacity-100');
    document.querySelector(".cores_btn").classList.add('opacity-30');
  }

  if (!list.hasOwnProperty("values_open") || !list.values_open) list.values_open = false;
  document.querySelector(".values_details").open = list.values_open;

  //consertar cagada
  for (i = 0; i < list.itens.length; i++) {
    if (list.itens[i].dados.status == "Dropado") list.itens[i].dados.status = "Abandonado";
  }

  let filtered_list = [];
  for (i = 0; i < list.itens.length; i++) {
      if (JSON.parse(filters[cur_filter_tipo]).includes(list.itens[i].tipo) && JSON.parse(filters[cur_filter_status]).includes(list.itens[i].dados.status)) {
        filtered_list.push(i);
      }
  }

  for (i = 0; i < list.itens.length; i++) {
    if (filtered_list.includes(i)) {
    let progresso_string;
    let volumes_string;
    let repeticoes_string = "";
    let progresso_traço;

    //if (list.itens[i].dados.hasOwnProperty("last_edited")) console.log(list.itens[i].dados.last_edited);
    //if (list.itens[i].dados.hasOwnProperty("last_edited")) console.log(new Date(list.itens[i].dados.last_edited));
    //if (list.itens[i].dados.hasOwnProperty("last_edited")) console.log(`${String(new Date(list.itens[i].dados.last_edited).getDate()).padStart(2, '0')}/${String((new Date(list.itens[i].dados.last_edited).getMonth())+1).padStart(2, '0')}/${new Date(list.itens[i].dados.last_edited).getFullYear()} ${String(new Date(list.itens[i].dados.last_edited).getHours()).padStart(2, '0')}:${String(new Date(list.itens[i].dados.last_edited).getMinutes()).padStart(2, '0')}`);
    //if (list.itens[i].dados.hasOwnProperty("last_edited")) console.log(new Date(list.itens[i].dados.last_edited).toLocaleString());

    let final_progresso = list.itens[i].dados.final;
    let final_string = "";
    if (!list.itens[i].dados.hasOwnProperty("final")) final_progresso = 0;
    if (list.itens[i].dados.hasOwnProperty("final") && final_progresso > 0) {
      final_string = " de " + nf.format(final_progresso);
    } else {
      final_string = "";
    }

    if (list.itens[i].dados.repeticoes > 0 && list.itens[i].dados.repeticoes != "0" && list.itens[i].dados.repeticoes != "" && list.itens[i].dados.repeticoes != null) {
      repeticoes_string = " - <i class='fa-solid fa-rotate-right'></i> " + nf.format(list.itens[i].dados.repeticoes);
    }

    if (list.itens[i].tipo == "Novel" || list.itens[i].tipo == "Mangá") {
      if ((list.itens[i].dados.progresso == 1 && final_progresso == 0) || final_progresso == 1) {
        progresso_string = nf.format(list.itens[i].dados.progresso) + final_string + " capítulo";
      }
      else {
        progresso_string = nf.format(list.itens[i].dados.progresso) + final_string + " capítulos";
      }

      if (list.itens[i].dados.volumes <= 1) {
        volumes_string = nf.format(list.itens[i].dados.volumes) + " volume";
        progresso_traço = " - ";
      } else {
        volumes_string = nf.format(list.itens[i].dados.volumes) + " volumes";
        progresso_traço = " - ";
      }
    }
    if (list.itens[i].tipo == "Anime" || list.itens[i].tipo == "Filme" || list.itens[i].tipo == "Áudio" || list.itens[i].tipo == "Dorama/Série" || list.itens[i].tipo == "Stage") {
      if ((list.itens[i].dados.progresso == 1 && final_progresso == 0) || final_progresso == 1) {
        progresso_string = nf.format(list.itens[i].dados.progresso) + final_string + " episódio";
      }
      else {
        progresso_string = nf.format(list.itens[i].dados.progresso) + final_string + " episódios";
      }

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

    let progress_element = "";
    if (list.itens[i].dados.progresso > 0 && list.itens[i].dados.final > 0) {
      progress_element = `<progress class="rounded-md shadow-md border border-gray-400" id="progress_bar" value="${list.itens[i].dados.progresso}" max="${list.itens[i].dados.final}"></progress>`;
    } else {
      progress_element = "";
    }

    let moji_string;
    if (list.itens[i].dados.moji == 0) {
      moji_string = "";
    } else if (list.itens[i].dados.moji == 1) {
      moji_string = nf.format(list.itens[i].dados.moji) + " caractere";
    } else {
      moji_string = nf.format(list.itens[i].dados.moji) + " caracteres";
    }

    if (!list.itens[i].dados.hasOwnProperty("autotime")) list.itens[i].dados.autotime = false;
    let autotime = list.itens[i].dados.autotime;

    let horas = String(list.itens[i].dados.horas).padStart(2, '0');
    let minutos = String(list.itens[i].dados.minutos).padStart(2, '0');
    let tempo_string;
    if (!autotime) {
      if (list.itens[i].dados.horas == 0 && list.itens[i].dados.minutos == 0) {
        tempo_string = "";
      } else {
        tempo_string = horas+":"+minutos;
      }
    } else {
      if (list.itens[i].dados.prog_min == 0 && list.itens[i].dados.autotime) {
        tempo_string = "";
      } else {
        tempo_string = String(Math.trunc((list.itens[i].dados.progresso*list.itens[i].dados.prog_min)/60)).padStart(2, '0')+":"+String((list.itens[i].dados.progresso*list.itens[i].dados.prog_min)%60).padStart(2, '0');
      }
    }

    let bg_color = site_colors.default;
    if (list.cores) {
      switch(list.itens[i].tipo) {
        default:
          bg_color = site_colors.default;
          break;
        case "Novel":
          bg_color = site_colors.types.novel;
          break;
        case "Anime":
          bg_color = site_colors.types.anime;
          break;
        case "Mangá":
          bg_color = site_colors.types.manga;
          break;
        case "Jogo":
          bg_color = site_colors.types.jogo;
          break;
        case "Filme":
          bg_color = site_colors.types.filme;
          break;
        case "Áudio":
          bg_color = site_colors.types.audio;
          break;
        case "Dorama/Série":
          bg_color = site_colors.types.dorama;
          break;
        case "Stage":
          bg_color = site_colors.types.stage;
          break;
        case "Fanfic":
          bg_color = site_colors.types.fanfic;
          break;
        case "Short Story":
          bg_color = site_colors.types.shortstory;
          break;
        case "Ensaio":
          bg_color = site_colors.types.ensaio;
          break;
      }
    }

    let img_hidden = "";
    if (list.itens[i].dados.img == "") img_hidden = "hidden";

    //consertar cagada
    list.itens[i].dados.nota = update_old_style_tags(list.itens[i].dados.nota);

    let anotacao = list.itens[i].dados.nota;
    if (!list.itens[i].dados.hasOwnProperty("nota")) anotacao = "";
    anotacao = anotacao.linkify({
      className: "nota_link text-blue-500",
      target: "_blank"
    });
    anotacao = style_text_with_tags(anotacao,list.itens[i].dados);

    document.querySelector(".content_list").innerHTML += `
    <div class="bg-[${bg_color}] flex flex-col p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group/title hover:border-gray-400" id="${i}" onclick="edit_item(this.id)">
      <div class="p-1 flex flex-row gap-2">
        <img src="${list.itens[i].dados.img}" class="w-[170px] h-[225px] aspect-[1/1.33] object-contain ${img_hidden}">
        <div class="w-[100%]">
          <b>${list.itens[i].dados.titulo}</b>
          <button class="pl-2 float-right sm:opacity-0 group-hover/title:opacity-100"><i class="fa-solid fa-pencil"></i></button>
          <br><br>
          <p>${list.itens[i].tipo}</p>
          <p>${list.itens[i].dados.status}${repeticoes_string}</p>
          <p class="flex flex-row gap-2 items-center">
            <span>${progresso_string}${progresso_traço}${volumes_string}</span>
          </p>
          <p>${progress_element}</p>
          <p>${tempo_string}</p>
          <p>${moji_string}</p>
        </div>
      </div>
      <div class="nota_div p-1">${anotacao}</div>
    </div>
    `
  }
  }
}

function upload_image(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = e.target.result;
      document.querySelector(".img_input").value = result;
      update_preview_image();
    }

    reader.readAsDataURL(files);
  } catch (err) {
    console.error(err);
  }
}

function clear_image() {
  document.querySelector(".img_input").value = "";
  document.querySelector(".img_preview").classList.add('hidden');
}

function update_preview_image() {
  document.querySelector(".img_preview").src = document.querySelector(".img_input").value;
  document.querySelector(".img_preview").classList.remove('hidden');
}

var cur_preview_item = "";

function get_preview_item() {
  cur_preview_item = {
    "tipo":document.querySelector(".tipo_input").value,
    "dados": {
      "titulo": document.querySelector(".name_input").value,
      "status": document.querySelector(".status_input").value,
      "progresso": document.querySelector(".progresso_input").value,
      "moji": document.querySelector(".moji_input").value,
      "horas": document.querySelector(".horas_input").value,
      "minutos": document.querySelector(".minutos_input").value,
      "volumes": document.querySelector(".volumes_input").value,
      "repeticoes": document.querySelector(".repeticoes_input").value,
      "img": document.querySelector(".img_input").value,
      "nota": document.querySelector(".nota_input").value,
      "autotime": document.querySelector(".autotime_input").checked,
      "prog_min": document.querySelector(".prog_min_input").value,
      "final": document.querySelector(".final_input").value
    }
  };
}

function update_preview_nota() {
  get_preview_item();

  let nota_input = document.querySelector(".nota_input").value;
  document.querySelector(".nota_input_preview").innerHTML = style_text_with_tags(nota_input,cur_preview_item.dados);
  if (nota_input.includes("\\") || nota_input.includes("[") || nota_input.includes("$") || nota_input.includes("{")) document.querySelector(".nota_preview_container").classList.remove('hidden');
  else document.querySelector(".nota_preview_container").classList.add('hidden');
}

//filtros da lista
var cur_filter_tipo = "Tudo_tipo";
var cur_filter_status = "Tudo_status";

function switch_filter() {
  if (document.querySelector(".filter_dropdown").classList.contains('hidden')) {
    document.querySelector(".filter_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".filter_dropdown").classList.add('hidden');
}

function change_filter(filter_tipo,filter_status) {
  if (filter_tipo != "") cur_filter_tipo = filter_tipo;
  if (filter_status != "") cur_filter_status = filter_status;
  load_list();
  list.last_filter = [cur_filter_tipo,cur_filter_status];
  hook = true;
  update_filter_checks();
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.filter_dropdown_area').contains(e.target)){
    document.querySelector(".filter_dropdown").classList.add('hidden');
  }
});

function update_filter_checks() {
  document.querySelector(".icon_tipo_tudo").classList.add("hidden");
  document.querySelector(".icon_tipo_novel").classList.add("hidden");
  document.querySelector(".icon_tipo_anime").classList.add("hidden");
  document.querySelector(".icon_tipo_manga").classList.add("hidden");
  document.querySelector(".icon_tipo_jogo").classList.add("hidden");
  document.querySelector(".icon_tipo_filme").classList.add("hidden");
  document.querySelector(".icon_tipo_audio").classList.add("hidden");
  document.querySelector(".icon_tipo_doramaserie").classList.add("hidden");
  document.querySelector(".icon_tipo_stage").classList.add("hidden");
  document.querySelector(".icon_tipo_fanfic").classList.add("hidden");
  document.querySelector(".icon_tipo_shortstory").classList.add("hidden");
  document.querySelector(".icon_tipo_ensaio").classList.add("hidden");

  switch(cur_filter_tipo) {
    case "Mídia":
      document.querySelector(".icon_tipo_tudo").classList.remove("hidden");
      break;
    case "Short Stories e Fanfics":
      document.querySelector(".icon_tipo_tudo").classList.remove("hidden");
      break;
    case "Tudo_tipo":
      document.querySelector(".icon_tipo_tudo").classList.remove("hidden");
      break;
    case "Novel":
      document.querySelector(".icon_tipo_novel").classList.remove("hidden");
      break;
    case "Anime":
      document.querySelector(".icon_tipo_anime").classList.remove("hidden");
      break;
    case "Mangá":
      document.querySelector(".icon_tipo_manga").classList.remove("hidden");
      break;
    case "Jogo":
      document.querySelector(".icon_tipo_jogo").classList.remove("hidden");
      break;
    case "Filme":
      document.querySelector(".icon_tipo_filme").classList.remove("hidden");
      break;
    case "Áudio":
      document.querySelector(".icon_tipo_audio").classList.remove("hidden");
      break;
    case "Dorama/Série":
      document.querySelector(".icon_tipo_doramaserie").classList.remove("hidden");
      break;
    case "Stage":
      document.querySelector(".icon_tipo_stage").classList.remove("hidden");
      break;
    case "Fanfic":
      document.querySelector(".icon_tipo_fanfic").classList.remove("hidden");
      break;
    case "Short Story":
      document.querySelector(".icon_tipo_shortstory").classList.remove("hidden");
      break;
    case "Ensaio":
      document.querySelector(".icon_tipo_ensaio").classList.remove("hidden");
      break;
  }

  document.querySelector(".icon_status_tudo").classList.add("hidden");
  document.querySelector(".icon_status_pendente").classList.add("hidden");
  document.querySelector(".icon_status_planejando").classList.add("hidden");
  document.querySelector(".icon_status_repetindo").classList.add("hidden");
  document.querySelector(".icon_status_concluido").classList.add("hidden");
  document.querySelector(".icon_status_pausado").classList.add("hidden");
  document.querySelector(".icon_status_abandonado").classList.add("hidden");

  switch(cur_filter_status) {
    case "Tudo_status":
      document.querySelector(".icon_status_tudo").classList.remove("hidden");
      break;
    case "Pendente":
      document.querySelector(".icon_status_pendente").classList.remove("hidden");
      break;
    case "Planejamento":
      document.querySelector(".icon_status_planejando").classList.remove("hidden");
      break;
    case "Repetindo":
      document.querySelector(".icon_status_repetindo").classList.remove("hidden");
      break;
    case "Concluído":
      document.querySelector(".icon_status_concluido").classList.remove("hidden");
      break;
    case "Pausado":
      document.querySelector(".icon_status_pausado").classList.remove("hidden");
      break;
    case "Abandonado":
      document.querySelector(".icon_status_abandonado").classList.remove("hidden");
      break;
  }
}

//filtros de streaming
function switch_streaming_filter() {
  if (document.querySelector(".streaming_filter_dropdown").classList.contains('hidden')) {
    document.querySelector(".streaming_filter_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".streaming_filter_dropdown").classList.add('hidden');
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.streaming_filter_dropdown_area').contains(e.target)){
    document.querySelector(".streaming_filter_dropdown").classList.add('hidden');
  }
});

function change_streaming_filter(midia) {
  let streaming_items;
  streaming_items = document.getElementsByClassName("streaming_item");

  if (midia != "tudo") {
    for (i = 0; i < streaming_items.length; i++) {
      streaming_items[i].classList.add('hidden');
      if (streaming_items[i].classList.contains("streaming_item_"+midia)) {
          streaming_items[i].classList.remove('hidden');
      }
    }
  } else {
    for (i = 0; i < streaming_items.length; i++) {
      streaming_items[i].classList.remove('hidden');
    }
  }

  switch_streaming_filter();
}

//configs de streaming
var exibir_eos = false;

function switch_streaming_config() {
  if (document.querySelector(".streaming_config_dropdown").classList.contains('hidden')) {
    document.querySelector(".streaming_config_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".streaming_config_dropdown").classList.add('hidden');
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.streaming_config_dropdown_area').contains(e.target)){
    document.querySelector(".streaming_config_dropdown").classList.add('hidden');
  }
});

function change_streaming_config(option) {
  if (option == "eos") {
    if (exibir_eos) {
      exibir_eos = false;
      update_streaming_config();
      load_streaming_items();
      return
    } else {
      exibir_eos = true;
      update_streaming_config();
      load_streaming_items();
      return
    }
  }
}

function update_streaming_config() {
  if (exibir_eos) {
    document.querySelector(".check_exibir_eos").classList.remove('hidden');
  } else {
    document.querySelector(".check_exibir_eos").classList.add('hidden');
  }
}

var streaming_items_data = [];

async function fetch_streaming_items() {
  if (streaming_items_data == "") {
    let file_object = await fetch("data/streamings.json");
    let json_data = await file_object.json();

    streaming_items_data = json_data;
  }

  load_streaming_items();
}

function load_streaming_items() {
  document.querySelector(".streaming_list").innerHTML = "";

  for (var i = 0; i<streaming_items_data.sites.length; i++){
    let item_nome = streaming_items_data.sites[i].nome;
    let item_midia = streaming_items_data.sites[i].midia;
    let item_classes = streaming_items_data.sites[i].classes;
    let item_link = streaming_items_data.sites[i].link;
    let item_tags = streaming_items_data.sites[i].tags;
    let item_descricao = streaming_items_data.sites[i].desc;
    let item_ativo = streaming_items_data.sites[i].ativo;

    let item_ativo_classe = "";
    if (!item_ativo) item_ativo_classe = " streaming_item_eos opacity-50";

    let item_html_tags = create_streaming_tags(item_tags);

    if (exibir_eos || !exibir_eos && item_ativo) {
      document.querySelector(".streaming_list").innerHTML += `
        <a class="streaming_item ${item_classes}${item_ativo_classe}" href="${item_link}" target="_blank">
            <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                <div class="p-1 w-[100%]">
                    <b>${item_nome}</b>
                    <br>
                    <p>${item_midia}</p>
                    <br>
                    <p class="streaming_tags flex flex-col gap-2">${item_html_tags}</p>
                    <br>
                    <div class="streaming_notas flex flex-col gap-4 items-stretch">${item_descricao}</div>
                </div>
            </div>
        </a>`;
    }
  }
}

function create_streaming_tags(array) {
  let result = "";

  for (var i = 0; i<array.length; i++) {
    result += `<span class="bg-item-${array[i].tipo} rounded-md shadow-md py-1 px-2 h-min w-fit">${array[i].texto}</span>`;
  }

  return result;
}


//stats
function gerar_stats() {
  let base_types = ['Anime', 'Novel', 'Mangá', 'Jogo', 'Filme', 'Áudio', 'Dorama/Série', 'Stage', 'Fanfic', 'Short Story', 'Ensaio'];
  let base_types_colors = [site_colors.types.anime, site_colors.types.novel, site_colors.types.manga, site_colors.types.jogo, site_colors.types.filme, site_colors.types.audio, site_colors.types.dorama, site_colors.types.stage, site_colors.types.fanfic, site_colors.types.shortstory, site_colors.types.ensaio];
  let graph_types = [];
  let graph_types_values = [];
  let graph_types_colors = [];
  let graph_types_lines = '#000000';
  let last_items = 0;
  let cur_valid_id = 0;

  for (let tipo_id = 0; tipo_id < base_types.length; tipo_id++) {

    if (last_items > 0) cur_valid_id++;
    last_items = 0;

    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].tipo == base_types[tipo_id]) {
        if (!graph_types.includes(base_types[tipo_id])) {
          //primeira aparição = cria
          last_items++;
          graph_types.push(base_types[tipo_id]);
          graph_types_colors.push(base_types_colors[tipo_id]);
          graph_types_values.push(1);
        } else {
          //próximas aparições = adiciona
          graph_types_values[graph_types.indexOf(graph_types[cur_valid_id])]++;
        }
      }
    }
  }

  //tipo pie

  let tipo_pie_data = [{
    values: graph_types_values,
    labels: graph_types,
    textinfo: "label+percent",
    hoverinfo: "label+value+percent",
    marker: {
      colors: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'pie',
    automargin: true
  }];

  let tipo_pie_layout = {
    title: {
      text: 'Formatos (pizza)'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let tipo_pie_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'tipo_pie_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".tipo_pie"), tipo_pie_data, tipo_pie_layout, tipo_pie_config);

  //tipo bar

  let tipo_bar_data = [{
    x: graph_types_values,
    y: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    orientation: 'h',
    text: graph_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'y+x'
  }];

  let tipo_bar_layout = {
    title: {
      text: 'Formatos (barras)'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let tipo_bar_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'tipo_bar_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".tipo_bar"), tipo_bar_data, tipo_bar_layout, tipo_bar_config);

  let base_status = ['Completo', 'Progredindo', 'Planejo', 'Abandonado', 'Repetindo', 'Pausado'];
  let base_status_colors = [site_colors.status.completo, site_colors.status.progredindo, site_colors.status.planejo, site_colors.status.abandonado, site_colors.status.repetindo, site_colors.status.pausado];
  let graph_status = [];
  let graph_status_values = [];
  let graph_status_colors = [];
  let graph_status_lines = '#000000';
  let last_status_items = 0;
  let cur_valid_status_id = 0;

  //aqui a mudança
  for (let status_id = 0; status_id < base_status.length; status_id++) {

    if (last_status_items > 0) cur_valid_status_id++;
    last_status_items = 0;

    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].dados.status == base_status[status_id]) {
        if (!graph_status.includes(base_status[status_id])) {
          //primeira aparição = cria
          last_status_items++;
          graph_status.push(base_status[status_id]);
          graph_status_colors.push(base_status_colors[status_id]);
          graph_status_values.push(1);
        } else {
          //próximas aparições = adiciona
          graph_status_values[graph_status.indexOf(graph_status[cur_valid_status_id])]++;
        }
      }
    }
  }

  //status pie

  let status_pie_data = [{
    values: graph_status_values,
    labels: graph_status,
    textinfo: "label+percent",
    hoverinfo: "label+value+percent",
    marker: {
      colors: graph_status_colors,
      line: {
        color: graph_status_lines,
        width: 1.5
      }
    },
    type: 'pie',
    automargin: true
  }];

  let status_pie_layout = {
    title: {
      text: 'Status (pizza)'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let status_pie_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'status_pie_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".status_pie"), status_pie_data, status_pie_layout, status_pie_config);

  //status bar

  let status_bar_data = [{
    x: graph_status_values,
    y: graph_status,
    marker: {
      color: graph_status_colors,
      line: {
        color: graph_status_lines,
        width: 1.5
      }
    },
    type: 'bar',
    orientation: 'h',
    text: graph_status_values.map(String),
    textposition: 'auto',
    hoverinfo: 'y+x'
  }];

  let status_bar_layout = {
    title: {
      text: 'Status (barras)'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let status_bar_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'status_bar_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".status_bar"), status_bar_data, status_bar_layout, status_bar_config);

  //progresso por formato - calculo

  let graph_prog_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let graph_total_ep = 0;
  let graph_total_cap = 0;

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_prog_types_values[tipo_id] += Number(list.itens[item_id].dados.progresso);

        if (list.itens[item_id].tipo == 'Anime' || list.itens[item_id].tipo == 'Filme' || list.itens[item_id].tipo == 'Áudio' || list.itens[item_id].tipo == 'Dorama/Série' || list.itens[item_id].tipo == 'Stage') {
          graph_total_ep += Number(list.itens[item_id].dados.progresso);
        }
        if (list.itens[item_id].tipo == 'Novel' || list.itens[item_id].tipo == 'Mangá' || list.itens[item_id].tipo == 'Jogo' || list.itens[item_id].tipo == 'Fanfic' || list.itens[item_id].tipo == 'Short Story' || list.itens[item_id].tipo == 'Ensaio') {
          graph_total_cap += Number(list.itens[item_id].dados.progresso);
        }
      }
    }
  }

  //progresso por formato - grafico

  let prog_tipo_bar_data = [{
    x: graph_prog_types_values,
    y: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    orientation: 'h',
    text: graph_prog_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'y+x'
  }];

  let prog_tipo_bar_layout = {
    title: {
      text: 'Progresso por formato'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let prog_tipo_bar_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'prog_tipo_bar_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".prog_tipo_bar"), prog_tipo_bar_data, prog_tipo_bar_layout, prog_tipo_bar_config);

  //moji por formato - calculo

  let graph_moji_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_moji_types_values[tipo_id] += Number(list.itens[item_id].dados.moji);
      }
    }
  }

  //moji por formato - grafico

  let moji_tipo_bar_data = [{
    x: graph_moji_types_values,
    y: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    orientation: 'h',
    text: graph_moji_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'y+x'
  }];

  let moji_tipo_bar_layout = {
    title: {
      text: 'Caracteres por formato'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let moji_tipo_bar_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'moji_tipo_bar_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".moji_tipo_bar"), moji_tipo_bar_data, moji_tipo_bar_layout, moji_tipo_bar_config);

  //horas por formato - calculo

  let graph_horas_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        if (!list.itens[item_id].dados.autotime) {
          graph_horas_types_values[tipo_id] += Number(list.itens[item_id].dados.horas);
        } else {
          graph_horas_types_values[tipo_id] += Math.trunc((list.itens[item_id].dados.progresso*list.itens[item_id].dados.prog_min)/60);
        }
      }
    }
  }

  let graph_minutos_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        if (!list.itens[item_id].dados.autotime) {
          graph_minutos_types_values[tipo_id] += Number(list.itens[item_id].dados.minutos);
        } else {
          graph_minutos_types_values[tipo_id] += Number((list.itens[item_id].dados.progresso*list.itens[item_id].dados.prog_min)%60);
        }
      }
    }
  }

  let graph_total_horas = 0;
  let graph_total_minutos = 0;

  for (let tipo_id = 0; tipo_id < graph_minutos_types_values.length; tipo_id++) {
    graph_horas_types_values[tipo_id] += Math.trunc(Number(graph_minutos_types_values[tipo_id])/60);
    graph_total_horas += graph_horas_types_values[tipo_id];

    graph_total_minutos += Math.trunc(Number(graph_minutos_types_values[tipo_id])%60);
  }

  graph_total_horas += Math.trunc(graph_total_minutos/60);
  graph_total_minutos = Math.trunc(graph_total_minutos%60);

  //horas por formato - grafico

  let horas_tipo_bar_data = [{
    x: graph_horas_types_values,
    y: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    orientation: 'h',
    text: graph_horas_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'y+x'
  }];

  let horas_tipo_bar_layout = {
    title: {
      text: 'Horas por formato'
    },
    font:{
      family: 'Arial, sans-serif'
    },
    yaxis: {
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    }
  };

  let horas_tipo_bar_config = {
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'horas_tipo_bar_chart',
      scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".horas_tipo_bar"), horas_tipo_bar_data, horas_tipo_bar_layout, horas_tipo_bar_config);

  let graph_total_moji = 0;
  let graph_total_vol = 0;

  for (let item_id = 0; item_id < list.itens.length; item_id++) {
    graph_total_moji += Number(list.itens[item_id].dados.moji);
    graph_total_vol += Number(list.itens[item_id].dados.volumes);
  }

  document.querySelector(".time_counter").innerHTML = `${String(graph_total_horas).padStart(2, '0')}:${String(graph_total_minutos).padStart(2, '0')}`;
  document.querySelector(".ep_counter").innerHTML = nf.format(graph_total_ep);
  document.querySelector(".cap_counter").innerHTML = nf.format(graph_total_cap);
  document.querySelector(".moji_counter").innerHTML = nf.format(graph_total_moji);
  document.querySelector(".vol_counter").innerHTML = nf.format(graph_total_vol);
}

function update_autotime() {
  if (document.querySelector(".autotime_input").checked) {
    document.querySelector(".autotime_number").classList.remove("hidden");
    document.querySelector(".normaltime_number").classList.add("hidden");
  } else {
    document.querySelector(".autotime_number").classList.add("hidden");
    document.querySelector(".normaltime_number").classList.remove("hidden");
  }
}

//yomitan function
function convertToHiragana(text) {
  let newText = text.toLowerCase();
  for (const [romaji, kana] of Object.entries(ROMAJI_TO_HIRAGANA)) {
      newText = newText.replaceAll(romaji, kana);
  }
  newText = fillSokuonGaps(newText);
  return newText;
}

function convertToKatakana(text) {
  let newText = text.toLowerCase();
  for (const [romaji, kana] of Object.entries(ROMAJI_TO_KATAKANA)) {
      newText = newText.replaceAll(romaji, kana);
  }
  newText = fillSokuonGaps(newText);
  return newText;
}

//yomitan function
function fillSokuonGaps(text) {
    return text.replaceAll(/っ[a-z](?=っ)/g, 'っっ').replaceAll(/ッ[A-Z](?=ッ)/g, 'ッッ');
}

function kanaFullToHalf(text) {
  let newText = text.toLowerCase();
  for (const [full, half] of Object.entries(KATAKANA_FULLWIDTH_TO_HALFWIDTH)) {
      newText = newText.replaceAll(full, half);
  }
  return newText;
}

function kanaHalfToFull(text) {
  let newText = text.toLowerCase();
  for (const [full, half] of Object.entries(KATAKANA_FULLWIDTH_TO_HALFWIDTH)) {
      newText = newText.replaceAll(half, full);
  }
  return newText;
}

//GRADIENT TAG
const style_tag_gradient = /\[grd:(?<direction>.+?):(?<first_color>.+?):(?<second_color>.+?)](?<real_text>.+?)\[\/grd]/g;

//GRADIENT TAG WITH %
const style_tag_gradpercent = /\[grdp:(?<direction>.+?):(?<first_color>.+?):(?<second_color>.+?):(?<first_color_focus>.+?):(?<second_color_focus>.+?)](?<real_text>.+?)\[\/grdp]/g;

//COLOR TAG
const style_tag_color = /\[cor:(?<color>.+?)](?<real_text>.+?)\[\/cor]/g;

//BOLD TAG
const style_tag_bold = /\[b](?<real_text>.+?)\[\/b]/g;

//ITALIC TAG
const style_tag_italic = /\[i](?<real_text>.+?)\[\/i]/g;

//BG TAG
const style_tag_bg = /\[bg:(?<color>.+?)](?<real_text>.+?)\[\/bg]/g;

//BORDER TAG
const style_tag_border = /\[brd:(?<size>.+?):(?<color>.+?)](?<real_text>.+?)\[\/brd]/g;

//SHADOW TAG
const style_tag_shadow = /\[sdw:(?<size>.+?):(?<color>.+?):(?<opacity>.+?)](?<real_text>.+?)\[\/sdw]/g;

//SOLID SHADOW TAG
const style_tag_solid_shadow = /\[ssdw:(?<horizontal>.+?):(?<vertical>.+?):(?<color>.+?)](?<real_text>.+?)\[\/ssdw]/g;

//BADGE TAG
const style_tag_badge = /\[bdg:(?<text_color>.+?):(?<bg_color>.+?)](?<real_text>.+?)\[\/bdg]/g;

//HIRAGANA TAG
const style_tag_hiragana = /\[hira](?<real_text>.+?)\[\/hira]/g;

//KATAKANA TAG
const style_tag_katakana = /\[kata](?<real_text>.+?)\[\/kata]/g;

//KATAKANA TAG
const style_tag_halfkana = /\[hkat](?<real_text>.+?)\[\/hkat]/g;

//KATAKANA TAG
const style_tag_fullkana = /\[fkat](?<real_text>.+?)\[\/fkat]/g;

//FURIGANA TAG
const style_tag_furigana = /\[furi:(?<furigana>.+?)](?<real_text>.+?)\[\/furi]/g;

//ICON TAG
const style_tag_icon = /\[icon:(?<id>.+?):(?<style>.+?)]/g;

//PROGRESS TAG
const style_tag_progress = /\[bar:(?<value>.+?):(?<max>.+?)]/g;

//MARK TAG
const style_tag_marktxt = /\[mrk:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;

//MARK PERCENT TAG
const style_tag_marktxt_percent = /\[mrkp:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;

//PROGRESS MARK TAG
const style_tag_mark = /\[barm:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;

//ESTILO TAG
const style_tag_preset = /\[pre:(?<nome>.+?)](?<real_text>.+?)\[\/pre]/g;

function style_text_with_tags(text,item_data) {
  //SECRET TAGS
  text = text.replaceAll(/\{chap_prog_moji}/g,"[b]$atual [icon:solid:arrow-right] $proximo[/b]<br>[barm:$comeco:$moji:$fim]<br>[mrk:$comeco:$moji:$fim] ([mrkp:$comeco:$moji:$fim])");
  text = text.replaceAll(/\{chap_prog_page}/g,"[b]$atual [icon:solid:arrow-right] $proximo[/b]<br>[barm:$comeco:$pages:$fim]<br>[mrk:$comeco:$pages:$fim] ([mrkp:$comeco:$pages:$fim])");
  text = text.replaceAll(/\{mashutan}/g,"<img src='assets/img/mashutan.png' class='w-[59px] h-[68px] inline'>");
  text = text.replaceAll(/\{mashutan_med}/g,"<img src='assets/img/mashutan.png' class='w-[131px] h-[151px] inline'>");
  text = text.replaceAll(/\{mashutan_big}/g,"<img src='assets/img/mashutan.png' class='w-[227px] h-[262px] inline'>");
  text = text.replaceAll(/\{mashutanzilla}/g,"<img src='assets/img/mashutan.png' class='max-w-[revert] w-[717px] h-[830px] inline'>");
  text = text.replaceAll(/\{iichan}/g,"<img src='assets/img/iichan.png' class='w-full'>");
  text = text.replaceAll(/\{iichan_face}/g,"<img src='assets/img/iichan_face.png' class='w-[96px] h-[103px] inline'>");
  text = text.replaceAll(/\{eto_bleh}/g,"<img src='https://media.tenor.com/XnGK5CaQTt4AAAAd/ah-eto-bleh-anime.gif' class='w-full'>");

  //VALORES
  text = text.replaceAll(/\$progresso/g,item_data.progresso);
  text = text.replaceAll(/\$final/g,item_data.final);
  text = text.replaceAll(/\$moji/g,item_data.moji);
  text = text.replaceAll(/\$volumes/g,item_data.volumes);
  text = text.replaceAll(/\$repeticoes/g,item_data.repeticoes);
  text = text.replaceAll(/\$h/g,item_data.horas);
  text = text.replaceAll(/\$H/g,String(item_data.horas).padStart(2, '0'));
  text = text.replaceAll(/\$m/g,item_data.minutos);
  text = text.replaceAll(/\$M/g,String(item_data.minutos).padStart(2, '0'));
  text = text.replaceAll(/\$prog_min/g,item_data.prog_min);
  text = text.replaceAll(/\$tempo/g,String(Math.trunc((item_data.progresso*item_data.prog_min)/60)).padStart(2, '0')+":"+String((item_data.progresso*item_data.prog_min)%60).padStart(2, '0'));
  text = text.replaceAll(/\$tempo_h/g,Math.trunc((item_data.progresso*item_data.prog_min)/60));
  text = text.replaceAll(/\$tempo_H/g,String(Math.trunc((item_data.progresso*item_data.prog_min)/60)).padStart(2, '0'));
  text = text.replaceAll(/\$tempo_m/g,Math.trunc((item_data.progresso*item_data.prog_min)%60));
  text = text.replaceAll(/\$tempo_M/g,String(Math.trunc((item_data.progresso*item_data.prog_min)%60)).padStart(2, '0'));

  if(item_data.hasOwnProperty("custom_values")) update_item_values(item_data.custom_values);

  if (item_custom_values != "") {
    for (var i = 0; i < Object.keys(item_custom_values).length; i++) {
      let regex = new RegExp(String.raw`\$${Object.keys(item_custom_values)[i]}`, "g");
      text = text.replaceAll(regex,item_custom_values[Object.keys(item_custom_values)[i]]);
    }
  }

  //NEWLINE TAG
  text = text.replaceAll(/\\n/g,"<br>");

  //LINE TAG
  text = text.replaceAll(/\\l/g,"<hr>");

  //GRADIENT TAG
  for (itag = 0; itag < (text.match(style_tag_gradient) || []).length; itag++) {
    let style_tag_gradient_match;

    while ((style_tag_gradient_match = style_tag_gradient.exec(text)) !== null) {
      let dir;
      if (style_tag_gradient_match.groups.direction == "vertical") dir = "b";
      if (style_tag_gradient_match.groups.direction == "horizontal") dir = "r";

      text = text.replaceAll(style_tag_gradient_match[0],`<span class="bg-linear-to-${dir} from-[${style_tag_gradient_match.groups.first_color}] to-[${style_tag_gradient_match.groups.second_color}] bg-clip-text text-transparent">${style_tag_gradient_match.groups.real_text}</span>`);
    }
  }

  //GRADIENT TAG WITH %
  for (itag = 0; itag < (text.match(style_tag_gradpercent) || []).length; itag++) {
    let style_tag_gradpercent_match;

    while ((style_tag_gradpercent_match = style_tag_gradpercent.exec(text)) !== null) {
      let dir;
      if (style_tag_gradpercent_match.groups.direction == "vertical") dir = "b";
      if (style_tag_gradpercent_match.groups.direction == "horizontal") dir = "r";

      text = text.replaceAll(style_tag_gradpercent_match[0],`<span class="bg-linear-to-${dir} from-[${style_tag_gradpercent_match.groups.first_color}] from-[${style_tag_gradpercent_match.groups.first_color_focus}] to-[${style_tag_gradpercent_match.groups.second_color}] to-[${style_tag_gradpercent_match.groups.second_color_focus}] bg-clip-text text-transparent">${style_tag_gradpercent_match.groups.real_text}</span>`);
    }
  }

  //SHADOW TAG
  for (itag = 0; itag < (text.match(style_tag_shadow) || []).length; itag++) {
    let style_tag_shadow_match;

    while ((style_tag_shadow_match = style_tag_shadow.exec(text)) !== null) {
      text = text.replaceAll(style_tag_shadow_match[0],`<span class="text-shadow-${style_tag_shadow_match.groups.size} text-shadow-[${style_tag_shadow_match.groups.color}]/${style_tag_shadow_match.groups.opacity}">${style_tag_shadow_match.groups.real_text}</span>`);
    }
  }

  //SOLID SHADOW TAG
  for (itag = 0; itag < (text.match(style_tag_solid_shadow) || []).length; itag++) {
    let style_tag_solid_shadow_match;

    while ((style_tag_solid_shadow_match = style_tag_solid_shadow.exec(text)) !== null) {
      text = text.replaceAll(style_tag_solid_shadow_match[0],`<span class="drop-shadow-[${style_tag_solid_shadow_match.groups.horizontal}_${style_tag_solid_shadow_match.groups.vertical}_${style_tag_solid_shadow_match.groups.color}]">${style_tag_solid_shadow_match.groups.real_text}</span>`);
    }
  }

  //COLOR TAG
  for (itag = 0; itag < (text.match(style_tag_color) || []).length; itag++) {
    let style_tag_color_match;

    while ((style_tag_color_match = style_tag_color.exec(text)) !== null) {
      text = text.replaceAll(style_tag_color_match[0],`<span class="text-[${style_tag_color_match.groups.color}]">${style_tag_color_match.groups.real_text}</span>`);
    }
  }

  //BOLD TAG
  for (itag = 0; itag < (text.match(style_tag_bold) || []).length; itag++) {
    let style_tag_bold_match;

    while ((style_tag_bold_match = style_tag_bold.exec(text)) !== null) {
      text = text.replaceAll(style_tag_bold_match[0],`<b>${style_tag_bold_match.groups.real_text}</b>`);
    }
  }

  //ITALIC TAG
  for (itag = 0; itag < (text.match(style_tag_italic) || []).length; itag++) {
    let style_tag_italic_match;

    while ((style_tag_italic_match = style_tag_italic.exec(text)) !== null) {
      text = text.replaceAll(style_tag_italic_match[0],`<i>${style_tag_italic_match.groups.real_text}</i>`);
    }
  }

  //BG TAG
  for (itag = 0; itag < (text.match(style_tag_bg) || []).length; itag++) {
    let style_tag_bg_match;

    while ((style_tag_bg_match = style_tag_bg.exec(text)) !== null) {
      text = text.replaceAll(style_tag_bg_match[0],`<span class="bg-[${style_tag_bg_match.groups.color}]">${style_tag_bg_match.groups.real_text}</span>`);
    }
  }

  //BORDER TAG
  for (itag = 0; itag < (text.match(style_tag_border) || []).length; itag++) {
    let style_tag_border_match;

    while ((style_tag_border_match = style_tag_border.exec(text)) !== null) {
      text = text.replaceAll(style_tag_border_match[0],`<span class="border-${style_tag_border_match.groups.size} border-[${style_tag_border_match.groups.color}]">${style_tag_border_match.groups.real_text}</span>`);
    }
  }

  //BADGE TAG
  for (itag = 0; itag < (text.match(style_tag_badge) || []).length; itag++) {
    let style_tag_badge_match;

    while ((style_tag_badge_match = style_tag_badge.exec(text)) !== null) {
      text = text.replaceAll(style_tag_badge_match[0],`<span class="text-[${style_tag_badge_match.groups.text_color}] bg-[${style_tag_badge_match.groups.bg_color}] rounded-md shadow-md py-1 px-2 h-min w-fit">${style_tag_badge_match.groups.real_text}</span>`);
    }
  }

  //HIRAGANA TAG
  for (itag = 0; itag <= (text.match(style_tag_hiragana) || []).length; itag++) {
    let style_tag_hiragana_match;

    while ((style_tag_hiragana_match = style_tag_hiragana.exec(text)) !== null) {
      let converted_text = convertToHiragana(style_tag_hiragana_match.groups.real_text);
      text = text.replaceAll(style_tag_hiragana_match[0],`<span>${converted_text}</span>`);
    }
  }

  //KATAKANA TAG
  for (itag = 0; itag <= (text.match(style_tag_katakana) || []).length; itag++) {
    let style_tag_katakana_match;

    while ((style_tag_katakana_match = style_tag_katakana.exec(text)) !== null) {
      let converted_text = convertToKatakana(style_tag_katakana_match.groups.real_text);
      text = text.replaceAll(style_tag_katakana_match[0],`<span>${converted_text}</span>`);
    }
  }

  //HALFKANA TAG
  for (itag = 0; itag <= (text.match(style_tag_halfkana) || []).length; itag++) {
    let style_tag_halfkana_match;

    while ((style_tag_halfkana_match = style_tag_halfkana.exec(text)) !== null) {
      let converted_text = kanaFullToHalf(style_tag_halfkana_match.groups.real_text);
      text = text.replaceAll(style_tag_halfkana_match[0],`<span>${converted_text}</span>`);
    }
  }

  //FULLKANA TAG
  for (itag = 0; itag <= (text.match(style_tag_fullkana) || []).length; itag++) {
    let style_tag_fullkana_match;

    while ((style_tag_fullkana_match = style_tag_fullkana.exec(text)) !== null) {
      let converted_text = kanaHalfToFull(style_tag_fullkana_match.groups.real_text);
      text = text.replaceAll(style_tag_fullkana_match[0],`<span>${converted_text}</span>`);
    }
  }

  //FURIGANA TAG
  for (itag = 0; itag < (text.match(style_tag_furigana) || []).length; itag++) {
    let style_tag_furigana_match;

    while ((style_tag_furigana_match = style_tag_furigana.exec(text)) !== null) {
      text = text.replaceAll(style_tag_furigana_match[0],`<ruby>${style_tag_furigana_match.groups.real_text}<rt>${style_tag_furigana_match.groups.furigana}</rt></ruby>`);
    }
  }

  //ICON TAG
  for (itag = 0; itag < (text.match(style_tag_icon) || []).length; itag++) {
    let style_tag_icon_match;

    while ((style_tag_icon_match = style_tag_icon.exec(text)) !== null) {
      text = text.replaceAll(style_tag_icon_match[0],`<i class="fa-${style_tag_icon_match.groups.style} fa-${style_tag_icon_match.groups.id}"></i>`);
    }
  }

  //PROGRESS TAG
  for (itag = 0; itag < (text.match(style_tag_progress) || []).length; itag++) {
    let style_tag_progress_match;

    while ((style_tag_progress_match = style_tag_progress.exec(text)) !== null) {
      text = text.replaceAll(style_tag_progress_match[0],`<progress class="rounded-md shadow-md border border-gray-400" value="${style_tag_progress_match.groups.value}" max="${style_tag_progress_match.groups.max}"></progress>`);
    }
  }

  //MARK TAG
  for (itag = 0; itag < (text.match(style_tag_marktxt) || []).length; itag++) {
    let style_tag_marktxt_match;

    while ((style_tag_marktxt_match = style_tag_marktxt.exec(text)) !== null) {
      let value = Number(style_tag_marktxt_match.groups.value) - Number(style_tag_marktxt_match.groups.start);
      let max = Number(style_tag_marktxt_match.groups.end) - Number(style_tag_marktxt_match.groups.start);
      text = text.replaceAll(style_tag_marktxt_match[0],`<span>${value}/${max}</span>`);
    }
  }

  //MARK PERCENT TAG
  for (itag = 0; itag < (text.match(style_tag_marktxt_percent) || []).length; itag++) {
    let style_tag_marktxt_percent_match;

    while ((style_tag_marktxt_percent_match = style_tag_marktxt_percent.exec(text)) !== null) {
      let value = Number(style_tag_marktxt_percent_match.groups.value) - Number(style_tag_marktxt_percent_match.groups.start);
      let max = Number(style_tag_marktxt_percent_match.groups.end) - Number(style_tag_marktxt_percent_match.groups.start);
      let result = (100 * value) / max;
      let result_show = Math.trunc(result);
      text = text.replaceAll(style_tag_marktxt_percent_match[0],`<span>${result_show}%</span>`);
    }
  }

  //PROGRESS MARK TAG
  for (itag = 0; itag < (text.match(style_tag_mark) || []).length; itag++) {
    let style_tag_mark_match;

    while ((style_tag_mark_match = style_tag_mark.exec(text)) !== null) {
      let value = Number(style_tag_mark_match.groups.value) - Number(style_tag_mark_match.groups.start);
      let max = Number(style_tag_mark_match.groups.end) - Number(style_tag_mark_match.groups.start);
      text = text.replaceAll(style_tag_mark_match[0],`<progress class="rounded-md shadow-md border border-gray-400" value="${value}" max="${max}"></progress>`);
    }
  }

  //ESTILO TAG
  text = style_text_with_presets(text);

  return text;
}

function style_text_with_presets(text) {

  for (itag = 0; itag < (text.match(style_tag_preset) || []).length; itag++) {
    let style_tag_preset_match;

    while ((style_tag_preset_match = style_tag_preset.exec(text)) !== null) {
      if (style_tag_preset_match.groups.nome == "legenda") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-black text-white px-1">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "amarelo_deltarune") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--8bitoperator) text-[1.2rem] bg-linear-to-b from-[#ffffc3] from-[25%] to-[#ffff2c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#4c4c00]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "vermelho_deltarune") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--8bitoperator) text-[1.2rem] bg-linear-to-b from-[#ffc3c3] from-[25%] to-[#ff1c1c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#4c0000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "azul_deltarune") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--8bitoperator) text-[1.2rem] bg-linear-to-b from-[#c3c3ff] from-[25%] to-[#1c1cff] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#00004c]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "verde_deltarune") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--8bitoperator) text-[1.2rem] bg-linear-to-b from-[#a8ffa8] from-[25%] to-[#0cff0c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#004c00]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "amarelo_deltarune_cor") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-linear-to-b from-[#ffffc3] from-[25%] to-[#ffff2c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#4c4c00]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "vermelho_deltarune_cor") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-linear-to-b from-[#ffc3c3] from-[25%] to-[#ff1c1c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#4c0000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "azul_deltarune_cor") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-linear-to-b from-[#c3c3ff] from-[25%] to-[#1c1cff] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#00004c]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "verde_deltarune_cor") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-linear-to-b from-[#a8ffa8] from-[25%] to-[#0cff0c] to-[80%] bg-clip-text text-transparent drop-shadow-[1px_1px_#004c00]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "vermelho_umineko") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-[#F50000] drop-shadow-[1px_1px_#000000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "vermelho_umineko_mod") text = text.replaceAll(style_tag_preset_match[0],`<b class="bg-linear-to-b from-[#ff0000] from-[40%] to-[#ff8b8b] to-[95%] bg-clip-text text-transparent drop-shadow-[-0.04rem_0px_#000000,0px_-0.04rem_#000000,0px_0.04rem_#000000,0.04rem_0px_#000000]">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "azul_umineko") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-[#5DECFF] drop-shadow-[1px_1px_#000000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "azul_umineko_mod") text = text.replaceAll(style_tag_preset_match[0],`<b class="bg-linear-to-b from-[#1d97c9] from-[40%] to-[#7ff1f3] to-[95%] bg-clip-text text-transparent drop-shadow-[-0.04rem_0px_#000000,0px_-0.04rem_#000000,0px_0.04rem_#000000,0.04rem_0px_#000000]">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "roxo_umineko") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-[#CC99FF] drop-shadow-[1px_1px_#000000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "roxo_umineko_mod") text = text.replaceAll(style_tag_preset_match[0],`<b class="bg-linear-to-b from-[#6b5dab] from-[40%] to-[#e7d0f1] to-[80%] bg-clip-text text-transparent drop-shadow-[-0.04rem_0px_#000000,0px_-0.04rem_#000000,0px_0.04rem_#000000,0.04rem_0px_#000000]">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "dourado_umineko") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-[#DAA520] drop-shadow-[1px_1px_#000000]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "dourado_umineko_mod") text = text.replaceAll(style_tag_preset_match[0],`<b class="bg-linear-to-b from-[#d19214] from-[40%] to-[#f8df59] to-[75%] bg-clip-text text-transparent drop-shadow-[-0.04rem_0px_#000000,0px_-0.04rem_#000000,0px_0.04rem_#000000,0.04rem_0px_#000000]">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "verde_umineko_mod") text = text.replaceAll(style_tag_preset_match[0],`<b class="bg-linear-to-b from-[#78cf79] from-[40%] to-[#ddffef] to-[75%] bg-clip-text text-transparent drop-shadow-[-0.04rem_0px_#000000,0px_-0.04rem_#000000,0px_0.04rem_#000000,0.04rem_0px_#000000]">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "sombra") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-shadow-md text-shadow-black/20">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "sombra_deltarune") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--8bitoperator) text-[1.2rem] text-white drop-shadow-[1px_1px_#0f0f70]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "sombra_deltarune_cor") text = text.replaceAll(style_tag_preset_match[0],`<span class="text-white drop-shadow-[0.7px_0.7px_#0f0f70]">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "profecia") text = text.replaceAll(style_tag_preset_match[0],`<div class="text-center" style="animation: floating 3s ease-in-out alternate infinite;"><span class="font-(family-name:--ProphecyType) text-[1.85rem] bg-clip-text text-transparent bg-[url('assets/img/IMAGE_DEPTH.png')] bg-size-[256px 256px] bg-repeat" style="animation: scroll-background 30s linear infinite;">${style_tag_preset_match.groups.real_text}</span></div>`);
      if (style_tag_preset_match.groups.nome == "profecia_cor") text = text.replaceAll(style_tag_preset_match[0],`<div class="text-center" style="animation: floating 3s ease-in-out alternate infinite;"><span class="bg-clip-text text-transparent bg-[url('assets/img/IMAGE_DEPTH.png')] bg-size-[256px 256px] bg-repeat" style="animation: scroll-background 30s linear infinite;">${style_tag_preset_match.groups.real_text}</span></div>`);
      if (style_tag_preset_match.groups.nome == "profecia_simples") text = text.replaceAll(style_tag_preset_match[0],`<span class="font-(family-name:--ProphecyType) text-[1.85rem] bg-clip-text text-transparent bg-[url('assets/img/IMAGE_DEPTH.png')] bg-size-[256px 256px] bg-repeat" style="animation: scroll-background 30s linear infinite;">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "profecia_cor_simples") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-clip-text text-transparent bg-[url('assets/img/IMAGE_DEPTH.png')] bg-size-[256px 256px] bg-repeat" style="animation: scroll-background 30s linear infinite;">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "badge_pos") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-[#d4edbc] rounded-md shadow-md py-1 px-2 h-min w-fit">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "badge_neg") text = text.replaceAll(style_tag_preset_match[0],`<span class="bg-[#ff8787] rounded-md shadow-md py-1 px-2 h-min w-fit">${style_tag_preset_match.groups.real_text}</span>`);
      if (style_tag_preset_match.groups.nome == "rainbow_h") text = text.replaceAll(style_tag_preset_match[0],`<b style="background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)" class="bg-clip-text text-transparent">${style_tag_preset_match.groups.real_text}</b>`);
      if (style_tag_preset_match.groups.nome == "rainbow_v") text = text.replaceAll(style_tag_preset_match[0],`<b style="background-image: linear-gradient(to bottom, red,orange,yellow,green,blue,indigo,violet)" class="bg-clip-text text-transparent">${style_tag_preset_match.groups.real_text}</b>`);
    }
  }

  return text;
}

var custom_info_data = [];

async function fetch_custom_info() {
  if (custom_info_data == "") {
    let file_object = await fetch("data/estilos.json");
    let json_data = await file_object.json();

    custom_info_data = json_data;
  }

  create_custom_info();
}

function create_custom_info() {
  document.querySelector(".custom_info").innerHTML = "";

  document.querySelector(".custom_info").innerHTML += `
    <div>Informações sobre a estilização das anotações</div>
    <details>
      <summary class="cursor-pointer button w-fit">Caracteres e valores especiais</summary>
      <div class="caracteres_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
    <details>
      <summary class="cursor-pointer button w-fit">Tags de estilo</summary>
      <div class="comandos_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
    <details>
      <summary class="cursor-pointer button w-fit">Estilos predefinidos</summary>
      <div class="estilos_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
  `;

  //CRIAR CARACTERES
  for (var cur_caractere = 0; cur_caractere < custom_info_data.caracteres.length; cur_caractere++) {
    if (cur_caractere > 0) document.querySelector(".caracteres_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".caracteres_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${custom_info_data.caracteres[cur_caractere].funcao}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2">${custom_info_data.caracteres[cur_caractere].comando}</td>
              <td class="border-1 sm:p-2">${custom_info_data.caracteres[cur_caractere].render}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  //CRIAR COMANDOS
  for (var cur_comando = 0; cur_comando < custom_info_data.comandos.length; cur_comando++) {
    let cur_comando_data = custom_info_data.comandos[cur_comando];

    let render_modelo = cur_comando_data.modelo[0].render.replaceAll("$texto",cur_comando_data.modelo[0].texto);

    if (cur_comando > 0) document.querySelector(".comandos_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".comandos_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${cur_comando_data.nome}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2 comando-code-${cur_comando}"></td>
              <td class="border-1 sm:p-2 comando-render-${cur_comando}">${render_modelo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    //CRIAR COMANDO (MODELO)
    let modelo_code = "";
    let modelo_params = "";
    if (cur_comando_data.modelo[0].parametros.length > 0) {
      //MODELO COM PARAMETROS
      for (var param = 0; param < cur_comando_data.modelo[0].parametros.length; param++) {
        modelo_params += `<code class="text-[#013220]">:</code><code class="text-[#07a]">${cur_comando_data.modelo[0].parametros[param].nome}</code>`;

        if (cur_comando_data.modelo[0].texto == "") modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${modelo_params}<code class="text-[#013220]">]</code>`;
        else modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${modelo_params}<code class="text-[#013220]">]</code><code>${cur_comando_data.modelo[0].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
      }
    } else {
      //MODELO SEM PARAMETROS
      if (cur_comando_data.modelo[0].texto == "") modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
      else modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code><code>${cur_comando_data.modelo[0].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
    }
    document.querySelector(".comando-code-"+cur_comando).innerHTML = modelo_code;

    //CRIAR CADA EXEMPLO (SE TIVER)
    if (cur_comando_data.hasOwnProperty("exemplo")) {
      for (var cur_exemplo = 0; cur_exemplo < cur_comando_data.exemplo.length; cur_exemplo++) {
        let cur_exemplo_data = cur_comando_data.exemplo[cur_exemplo];

        let exemplo_label = "<br><br>Exemplo:<br>";
        if (cur_comando_data.exemplo.length > 1) exemplo_label = "<br><br>Exemplos:<br>";
        if (cur_exemplo == 0) document.querySelector(".comando-code-"+cur_comando).innerHTML += exemplo_label;

        let render_exemplo = cur_exemplo_data.render.replaceAll("$texto",cur_exemplo_data.texto);

        //CRIAR COMANDO (EXEMPLOS)
        let exemplo_code = "";
        let exemplo_params = "";
        let break_string = "";
        if (cur_comando_data.exemplo[cur_exemplo].parametros.length > 0) {
          //EXEMPLO COM PARAMETROS
          for (var param = 0; param < cur_comando_data.exemplo[cur_exemplo].parametros.length; param++) {
            let param_color = "#07a";
            if (cur_comando_data.exemplo[cur_exemplo].parametros[param].nome.includes("#")) param_color = cur_comando_data.exemplo[cur_exemplo].parametros[param].nome;

            exemplo_params += `<code class="text-[#013220]">:</code><code class="text-[${param_color}]">${cur_comando_data.exemplo[cur_exemplo].parametros[param].nome}</code>`;
            if (cur_comando_data.exemplo[cur_exemplo].texto == "") exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${exemplo_params}<code class="text-[#013220]">]</code>`;
            else exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${exemplo_params}<code class="text-[#013220]">]</code><code>${cur_comando_data.exemplo[cur_exemplo].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
            
            if (param > 0) break_string = "<br>";
            if (cur_comando_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
          }
        } else {
          //EXEMPLO SEM PARAMETROS
          if (cur_comando_data.exemplo[cur_exemplo].texto == "") exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
          else exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code><code>${cur_comando_data.exemplo[cur_exemplo].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;

          if (param > 0) break_string = "<br>";
          if (cur_comando_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
        }
        document.querySelector(".comando-code-"+cur_comando).innerHTML += exemplo_code+break_string;
        document.querySelector(".comando-render-"+cur_comando).innerHTML += render_exemplo+break_string;
      }
    }
    //CRIA NOTAS SE TIVER
    if (cur_comando_data.hasOwnProperty("notas")) {
      document.querySelector(".comando-code-"+cur_comando).innerHTML += "<br>"+cur_comando_data.notas;
    }
  }

  //CRIAR ESTILOS
  for (var cur_estilo = 0; cur_estilo < custom_info_data.estilos.length; cur_estilo++) {
    let cur_estilo_data = custom_info_data.estilos[cur_estilo];

    //if (cur_estilo > 0) document.querySelector(".estilos_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".estilos_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${cur_estilo_data.nome}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2 estilo-code-${cur_estilo}"></td>
              <td class="border-1 sm:p-2 estilo-render-${cur_estilo}"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    //PEGAR CADA EXEMPLO
    for (var cur_exemplo = 0; cur_exemplo < cur_estilo_data.exemplo.length; cur_exemplo++) {
      let cur_exemplo_data = cur_estilo_data.exemplo[cur_exemplo];
      let render = cur_exemplo_data.render.replaceAll("$texto",cur_exemplo_data.texto);
      let linebreak = "";
      let command_name = "pre";
      if (cur_exemplo > 0) linebreak = "<br><br>";

      document.querySelector(".estilo-code-"+cur_estilo).innerHTML += `
        ${linebreak}
        <code class="text-[#013220]">[</code><code class="text-[#905]">${command_name}</code><code class="text-[#013220]">:</code><code class="text-[#07a]">${cur_exemplo_data.id}</code><code class="text-[#013220]">]</code><code>${cur_exemplo_data.texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${command_name}</code><code class="text-[#013220]">]</code></code>
      `;

      document.querySelector(".estilo-render-"+cur_estilo).innerHTML += linebreak+render;
    }
  }
}

//CUSTOMIZAÇÃO - LAYOUT
function switch_custom_dropdown(dropdown_id) {
  if (document.querySelector(".custom_dropdown_"+dropdown_id).classList.contains('hidden')) {
    document.querySelector(".custom_dropdown_"+dropdown_id).classList.remove('hidden');
    document.querySelector(".custom_dropdown_icon_"+dropdown_id).classList.remove('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_"+dropdown_id).classList.add('fa-angle-up');
    nota_can_add_excecao = true;
    return
  }
  document.querySelector(".custom_dropdown_"+dropdown_id).classList.add('hidden');
  document.querySelector(".custom_dropdown_icon_"+dropdown_id).classList.add('fa-angle-down');
  document.querySelector(".custom_dropdown_icon_"+dropdown_id).classList.remove('fa-angle-up');
}

window.addEventListener('click', function(e){
  if (!document.querySelector(".custom_dropdown_button_gradient").contains(e.target)){
    document.querySelector(".custom_dropdown_gradient").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_gradient").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_gradient").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_shadow").contains(e.target)){
    document.querySelector(".custom_dropdown_shadow").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_shadow").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_shadow").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_mark").contains(e.target)){
    document.querySelector(".custom_dropdown_mark").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_mark").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_mark").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_progress").contains(e.target)){
    document.querySelector(".custom_dropdown_progress").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_progress").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_progress").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_styles").contains(e.target)){
    document.querySelector(".custom_dropdown_styles").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_styles").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_styles").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_values").contains(e.target)){
    document.querySelector(".custom_dropdown_values").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_values").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_values").classList.remove('fa-angle-up');
  }
  if (!document.querySelector(".custom_dropdown_button_kana").contains(e.target)){
    document.querySelector(".custom_dropdown_kana").classList.add('hidden');
    document.querySelector(".custom_dropdown_icon_kana").classList.add('fa-angle-down');
    document.querySelector(".custom_dropdown_icon_kana").classList.remove('fa-angle-up');
  }
});

//CUSTOMIZAÇÃO - FUNCIONALIDADE
var nota_can_add = false;
var nota_can_add_excecao = false;
var nota_pos_start = 0;
var nota_pos_end = 0;

function select_field (element,status) {
  if (status) nota_can_add = status;
  else setTimeout(function () {nota_can_add = status}, 1000);
}

function set_selection(start,end) {
  nota_pos_start = start;
  nota_pos_end = end;
}

function force_selection(element,start,end) {
  element.selectionStart = start;
  element.selectionEnd = end;
  set_selection(start,end);
}

var nota_tags = {
  //comandos
  "bold": "[b]$text[/b]",
  "italic": "[i]$text[/i]",
  "hr": "\\l",
  "newline": "\\n",
  "color": "[cor:#000000]$text[/cor]",
  "bg": "[bg:#FFFFFF]$text[/bg]",
  "border": "[brd:1:#000000]$text[/brd]",
  "gradient": "[grd:horizontal:#FF0000:#0000FF]$text[/grd]",
  "gradpercent": "[grdp:horizontal:#FF0000:#0000FF:0%:100%]$text[/grdp]",
  "shadow": "[sdw:md:#000000:80]$text[/sdw]",
  "solidshadow": "[ssdw:1px:1px:#FF0000]$text[/ssdw]",
  "badge": "[bdg:#000000:#00FFCF]$text[/bdg]",
  "furigana": "[furi:escreva_aqui]$text[/furi]",
  "hira": "[hira]$text[/hira]",
  "kata": "[kata]$text[/kata]",
  "halfkana": "[hkat]$text[/hkat]",
  "fullkana": "[fkat]$text[/fkat]",
  "icon": "[icon:face-smile:regular]",
  "mark": "[mrk:0:0:10]",
  "mark_p": "[mrkp:0:0:10]",
  "bar": "[bar:0:100]",
  "bar_mark": "[barm:0:0:10]",
  //presets
  "legenda": "[pre:legenda]$text[/pre]",
  "sombreado": "[pre:sombra]$text[/pre]",
  "sombra_deltarune": "[pre:sombra_deltarune]$text[/pre]",
  "sombra_deltarune_cor": "[pre:sombra_deltarune_cor]$text[/pre]",
  "profecia": "[pre:profecia]$text[/pre]",
  "profecia_cor": "[pre:profecia_cor]$text[/pre]",
  "profecia_simples": "[pre:profecia_simples]$text[/pre]",
  "profecia_cor_simples": "[pre:profecia_cor_simples]$text[/pre]",
  "amarelo_deltarune": "[pre:amarelo_deltarune]$text[/pre]",
  "vermelho_deltarune": "[pre:vermelho_deltarune]$text[/pre]",
  "azul_deltarune": "[pre:azul_deltarune]$text[/pre]",
  "verde_deltarune": "[pre:verde_deltarune]$text[/pre]",
  "amarelo_deltarune_cor": "[pre:amarelo_deltarune_cor]$text[/pre]",
  "vermelho_deltarune_cor": "[pre:vermelho_deltarune_cor]$text[/pre]",
  "azul_deltarune_cor": "[pre:azul_deltarune_cor]$text[/pre]",
  "verde_deltarune_cor": "[pre:verde_deltarune_cor]$text[/pre]",
  "vermelho_umineko": "[pre:vermelho_umineko]$text[/pre]",
  "vermelho_umineko_mod": "[pre:vermelho_umineko_mod]$text[/pre]",
  "azul_umineko": "[pre:azul_umineko]$text[/pre]",
  "azul_umineko_mod": "[pre:azul_umineko_mod]$text[/pre]",
  "roxo_umineko": "[pre:roxo_umineko]$text[/pre]",
  "roxo_umineko_mod": "[pre:roxo_umineko_mod]$text[/pre]",
  "dourado_umineko": "[pre:dourado_umineko]$text[/pre]",
  "dourado_umineko_mod": "[pre:dourado_umineko_mod]$text[/pre]",
  "verde_umineko_mod": "[pre:verde_umineko_mod]$text[/pre]",
  "badge_pos": "[pre:badge_pos]$text[/pre]",
  "badge_neg": "[pre:badge_neg]$text[/pre]",
  "rainbow_h": "[pre:rainbow_h]$text[/pre]",
  "rainbow_v": "[pre:rainbow_v]$text[/pre]",
  //variáveis
  "value_progresso": "$progresso",
  "value_final": "$final",
  "value_volumes": "$volumes",
  "value_moji": "$moji",
  "value_repeticoes": "$repeticoes",
  "value_h": "$h",
  "value_H": "$H",
  "value_m": "$m",
  "value_M": "$M",
  "value_prog_min": "$prog_min",
  "value_tempo": "$tempo",
  "value_tempo_h": "$tempo_h",
  "value_tempo_H": "$tempo_H",
  "value_tempo_m": "$tempo_m",
  "value_tempo_M": "$tempo_M"
};

function nota_add_style(tag,dropdown=false) {
  let element = document.querySelector(".nota_input");

  if (nota_can_add || (dropdown && nota_can_add_excecao)) {
    let replace_text = nota_tags[tag].replaceAll("$text",element.value.substring(nota_pos_start, nota_pos_end));
    if (nota_pos_start == nota_pos_end) replace_text = nota_tags[tag].replaceAll("$text","texto");

    element.value = element.value.slice(0, nota_pos_start) + replace_text + element.value.slice(nota_pos_end);
  } else element.value += nota_tags[tag].replaceAll("$text","texto");
  nota_can_add = false;
  if (tag=="newline") {
    force_selection(element,nota_pos_start+2,nota_pos_start+2);
    nota_can_add = true;
  }
  if (nota_can_add_excecao) set_selection(element.textLength,element.textLength);
  nota_can_add_excecao = false;
}

var item_custom_values = {};
const values_regex = /^(?<nome>.+?)=(?<valor>.+?)$/g;

function update_item_values(text) {
  item_custom_values = {};
  let text_lines = text.split("\n");
  for (var i = 0; i < text_lines.length; i++) {
    for (itag = 0; itag < (text_lines[i].match(values_regex) || []).length; itag++) {
      let values_regex_match;

      while ((values_regex_match = values_regex.exec(text_lines[i])) !== null) {
        item_custom_values[values_regex_match.groups.nome] = values_regex_match.groups.valor;
        update_preview_nota();
      }
    }
  }
}

function update_old_style_tags(text="") {
  //old umineko ids
  text = text.replaceAll("vermelho_umineko_ps3","vermelho_umineko_mod");
  text = text.replaceAll("azul_umineko_ps3","azul_umineko_mod");
  text = text.replaceAll("roxo_umineko_ps3","roxo_umineko_mod");
  text = text.replaceAll("dourado_umineko_ps3","dourado_umineko_mod");
  text = text.replaceAll("verde_umineko_ps3","verde_umineko_mod");

  //old preset tag
  text = text.replaceAll("[estilo:","[pre:");
  text = text.replaceAll("[/estilo]","[/pre]");

  //old old gradpercent tag
  text = text.replaceAll("[gradient_percent:","[grdp:");
  text = text.replaceAll("[/gradient_percent]","[/grdp]");

  //tags without att
  text = text.replaceAll("[bold]","[b]");
  text = text.replaceAll("[/bold]","[/b]");

  text = text.replaceAll("[italic]","[i]");
  text = text.replaceAll("[/italic]","[/i]");

  //tags with att
  text = text.replaceAll("[color:","[cor:");
  text = text.replaceAll("[/color]","[/cor]");

  text = text.replaceAll("[badge:","[bdg:");
  text = text.replaceAll("[/badge]","[/bdg]");

  text = text.replaceAll("[border:","[brd:");
  text = text.replaceAll("[/border]","[/brd]");

  text = text.replaceAll("[shadow:","[sdw:");
  text = text.replaceAll("[/shadow]","[/sdw]");

  text = text.replaceAll("[solidshadow:","[ssdw:");
  text = text.replaceAll("[/solidshadow]","[/ssdw]");

  text = text.replaceAll("[gradient:","[grd:");
  text = text.replaceAll("[/gradient]","[/grd]");

  text = text.replaceAll("[gradpercent:","[grdp:");
  text = text.replaceAll("[/gradpercent]","[/grdp]");

  text = text.replaceAll("[furigana:","[furi:");
  text = text.replaceAll("[/furigana]","[/furi]");

  text = text.replaceAll("[halfkana:","[hkat:");
  text = text.replaceAll("[/halfkana]","[/hkat]");

  text = text.replaceAll("[fullkana:","[fkat:");
  text = text.replaceAll("[/fullkana]","[/fkat]");

  text = text.replaceAll("[mark:","[mrk:");

  text = text.replaceAll("[mark_p:","[mrkp:");

  text = text.replaceAll("[bar_mark:","[barm:");

  return text;
}

document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.querySelector('#Arquivo');

  dropZone.addEventListener('dragover', (event) =>{
    event.preventDefault();

  });

  dropZone.addEventListener('drop', (event) =>{
    event.preventDefault();
    const files = event.dataTransfer.files;
    upload_list(files[0]);
  });
});
