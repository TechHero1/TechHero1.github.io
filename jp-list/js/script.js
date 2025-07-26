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

/*var filters = {
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
}*/

var filters = {
  "Tudo_tipo": '["Novel","Anime","Mangá","Jogo","Filme","Áudio","Dorama/Série","Stage","Fanfic","Short Story","Ensaio"]',
  "Tudo_status": '["Progredindo","Planejo","Repetindo","Completo","Pausado","Dropado"]',
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
    "last_filter": ['Tudo_tipo','Tudo_status']
};

function upload_list(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = JSON.parse(e.target.result);
      let formatted = JSON.stringify(result, null, 2);
      list = JSON.parse(formatted);
      if (!list.hasOwnProperty("last_filter")) list.last_filter = ['Tudo_tipo','Tudo_status'];
      //console.log(list.last_filter);
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
  for (i = 0; i < list.itens.length; i++) {
      if (JSON.parse(filters[cur_filter_tipo]).includes(list.itens[i].tipo) && JSON.parse(filters[cur_filter_status]).includes(list.itens[i].dados.status)) {
        filtered_list.push(i);
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
      <div class="p-1 flex flex-row gap-2">
        <img src="${list.itens[i].dados.img}" class="w-[170px] h-[225px] aspect-[1/1.33] ${img_hidden}">
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
  //document.querySelector(".filter_dropdown").classList.add('hidden');
  list.last_filter = [cur_filter_tipo,cur_filter_status];
  //console.log([cur_filter_tipo,cur_filter_status]);
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
  document.querySelector(".icon_status_dropado").classList.add("hidden");

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
    case "Dropado":
      document.querySelector(".icon_status_dropado").classList.remove("hidden");
      break;
  }
}

//stats
function gerar_stats() {
  let graph_types = ['Anime', 'Novel', 'Mangá', 'Jogo', 'Filme', 'Áudio', 'Dorama/Série', 'Stage', 'Fanfic', 'Short Story', 'Ensaio'];
  let graph_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let graph_types_colors = ['#bfe1f6','#e6cff2','#d4edbc', '#ffcfc9', '#c6dbe1', '#ffc8aa', '#fe3967', '#efe80e', '#a8a8a8', '#ce5add', '#ffffff'];
  let graph_types_lines = '#000000';

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    //console.log(tipo_id+" "+graph_types[tipo_id]);
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      //console.log(list.itens[item_id].tipo);
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_types_values[tipo_id]++;
        //console.log(graph_types_values);
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
    type: 'pie'
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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'tipo_pie_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".tipo_pie"), tipo_pie_data, tipo_pie_layout, tipo_pie_config);

  //tipo bar

  let tipo_bar_data = [{
    y: graph_types_values,
    x: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    text: graph_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'x+y'
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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'tipo_bar_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".tipo_bar"), tipo_bar_data, tipo_bar_layout, tipo_bar_config);

  let graph_status = ['Completo', 'Progredindo', 'Planejo', 'Dropado', 'Repetindo', 'Pausado'];
  let graph_status_values = [0, 0, 0, 0, 0, 0];
  let graph_status_colors = ['#4285f4','#00ff00','#cfe2f3', '#ff0000', '#11734b', '#ffe5a0'];
  let graph_status_lines = '#000000';

  for (let status_id = 0; status_id < graph_status.length; status_id++) {
    //console.log(status_id+" "+graph_status[status_id]);
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      //console.log(list.itens[item_id].tipo);
      if (list.itens[item_id].dados.status == graph_status[status_id]) {
        graph_status_values[status_id]++;
        //console.log(graph_status_values);
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
    type: 'pie'
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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'status_pie_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".status_pie"), status_pie_data, status_pie_layout, status_pie_config);

  //status bar

  let status_bar_data = [{
    y: graph_status_values,
    x: graph_status,
    marker: {
      color: graph_status_colors,
      line: {
        color: graph_status_lines,
        width: 1.5
      }
    },
    type: 'bar',
    text: graph_status_values.map(String),
    textposition: 'auto',
    hoverinfo: 'x+y'

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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'status_bar_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".status_bar"), status_bar_data, status_bar_layout, status_bar_config);

  let graph_prog_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let graph_total_ep = 0;
  let graph_total_cap = 0;

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    //console.log(tipo_id+" "+graph_types[tipo_id]);
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      //console.log(list.itens[item_id].tipo);
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_prog_types_values[tipo_id] += Number(list.itens[item_id].dados.progresso);
        //console.log(graph_prog_types_values);
        //console.log(Number(list.itens[item_id].dados.progresso));
        if (list.itens[item_id].tipo == 'Anime' || list.itens[item_id].tipo == 'Filme' || list.itens[item_id].tipo == 'Áudio' || list.itens[item_id].tipo == 'Dorama/Série' || list.itens[item_id].tipo == 'Stage') {
          graph_total_ep += Number(list.itens[item_id].dados.progresso);
          //console.log("ep: "+list.itens[item_id].dados.progresso);
          //console.log("total ep: "+graph_total_ep);
        }
        if (list.itens[item_id].tipo == 'Novel' || list.itens[item_id].tipo == 'Mangá' || list.itens[item_id].tipo == 'Jogo' || list.itens[item_id].tipo == 'Fanfic' || list.itens[item_id].tipo == 'Short Story' || list.itens[item_id].tipo == 'Ensaio') {
          graph_total_cap += Number(list.itens[item_id].dados.progresso);
          //console.log("cap: "+list.itens[item_id].dados.progresso);
          //console.log("total cap: "+graph_total_cap);
        }
      }
    }
  }

  //progresso por formato

  let prog_tipo_bar_data = [{
    y: graph_prog_types_values,
    x: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    text: graph_prog_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'x+y'
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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'prog_tipo_bar_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".prog_tipo_bar"), prog_tipo_bar_data, prog_tipo_bar_layout, prog_tipo_bar_config);

  let graph_horas_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    //console.log(tipo_id+" "+graph_types[tipo_id]);
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      //console.log(list.itens[item_id].tipo);
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_horas_types_values[tipo_id] += Number(list.itens[item_id].dados.horas);
        //console.log(graph_horas_types_values);
        //console.log(Number(list.itens[item_id].dados.horas));
      }
    }
  }

  let graph_minutos_types_values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let tipo_id = 0; tipo_id < graph_types.length; tipo_id++) {
    //console.log(tipo_id+" "+graph_types[tipo_id]);
    for (let item_id = 0; item_id < list.itens.length; item_id++) {
      //console.log(list.itens[item_id].tipo);
      if (list.itens[item_id].tipo == graph_types[tipo_id]) {
        graph_minutos_types_values[tipo_id] += Number(list.itens[item_id].dados.minutos);
        //console.log(graph_minutos_types_values);
        //console.log(Number(list.itens[item_id].dados.minutos));
      }
    }
  }

  let graph_total_horas = 0;
  let graph_total_minutos = 0;

  //console.log(graph_horas_types_values);
  //console.log(graph_minutos_types_values);
  for (let tipo_id = 0; tipo_id < graph_minutos_types_values.length; tipo_id++) {
    //console.log("horas "+graph_horas_types_values[tipo_id]);
    //console.log("minutos "+graph_minutos_types_values[tipo_id]);
    //console.log("minutos em horas "+Math.round(Number(graph_minutos_types_values[tipo_id])/60));
    graph_horas_types_values[tipo_id] += Math.round(Number(graph_minutos_types_values[tipo_id])/60);
    //console.log("horas somadas "+graph_horas_types_values[tipo_id]);
    //console.log(graph_horas_types_values[tipo_id]);
    graph_total_horas += graph_horas_types_values[tipo_id];
    graph_total_minutos += Math.round(Number(graph_minutos_types_values[tipo_id])%60);
    //console.log(graph_minutos_types_values[tipo_id]);
    //console.log(graph_total_horas+":"+graph_total_minutos);
  }
  //console.log(graph_horas_types_values);

  graph_total_horas += Math.round(graph_total_minutos/60);
  graph_total_minutos = Math.round(graph_total_minutos%60);
  //console.log(graph_total_horas+":"+graph_total_minutos);

  //horas por formato

  let horas_tipo_bar_data = [{
    y: graph_horas_types_values,
    x: graph_types,
    marker: {
      color: graph_types_colors,
      line: {
        color: graph_types_lines,
        width: 1.5
      }
    },
    type: 'bar',
    text: graph_horas_types_values.map(String),
    textposition: 'auto',
    hoverinfo: 'x+y'
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
      format: 'png', // one of png, svg, jpeg, webp
      filename: 'horas_tipo_bar_chart',
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ['select', 'lasso'],
    displaylogo: false
  };

  Plotly.newPlot(document.querySelector(".horas_tipo_bar"), horas_tipo_bar_data, horas_tipo_bar_layout, horas_tipo_bar_config);

  let graph_total_moji = 0;
  let graph_total_vol = 0;

  for (let item_id = 0; item_id < list.itens.length; item_id++) {
    //console.log("antes: "+graph_total_moji);
    graph_total_moji += Number(list.itens[item_id].dados.moji);
    //console.log("moji: "+list.itens[item_id].dados.moji);
    //console.log("depois: "+graph_total_moji);
    graph_total_vol += Number(list.itens[item_id].dados.volumes);
  }

  //document.querySelector(".time_counter").innerHTML = `${graph_total_horas}:${graph_total_minutos}`;
  document.querySelector(".time_counter").innerHTML = `${String(graph_total_horas).padStart(2, '0')}:${String(graph_total_minutos).padStart(2, '0')}`;
  document.querySelector(".ep_counter").innerHTML = graph_total_ep;
  document.querySelector(".cap_counter").innerHTML = graph_total_cap;
  document.querySelector(".moji_counter").innerHTML = graph_total_moji;
  document.querySelector(".vol_counter").innerHTML = graph_total_vol;
}