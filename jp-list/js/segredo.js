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

var site_content = {};

function upload_content(files) {
  try {
    let reader = new FileReader();

    reader.onload = function(e) {
      let result = JSON.parse(e.target.result);
      let formatted = JSON.stringify(result, null, 2);
      site_content = JSON.parse(formatted);
      load_content();
      document.querySelector(".info_tab").classList.remove("hidden");
      document.querySelector(".user_tab").classList.remove("hidden");
      remote_open_tab('Visualizar');
    }

    reader.readAsText(files);
  } catch (err) {
    console.error(err);
  }
}

function load_content() {
    let content_list = document.querySelector(".content_list");
    content_list.innerHTML = "";

   for (var cur_category = 0; cur_category < Object.keys(site_content.categorias).length; cur_category++) {
    let category_id = Object.keys(site_content.categorias)[cur_category];
    if (site_content.hasOwnProperty(category_id)) {
      let cur_category_content = site_content[Object.keys(site_content.categorias)[cur_category]];
      let category_name = site_content.categorias[Object.keys(site_content.categorias)[cur_category]];
      let category_items = "";

      content_list.innerHTML += `
        <div class="text-xl category-title-${category_id}">
          ${site_content.categorias[category_id]}
        </div>
        <div class="category-content-${category_id} p-2 grid grid-cols-1 gap-2"></div>
      `;

      for (var cur_item = 0; cur_item < cur_category_content.length; cur_item++) {
        let item_plataforma = get_plataforma(cur_category_content[cur_item].url);
        let item_status = get_status(cur_category_content[cur_item].status);

        let item_opacity = 100;
        if ((cur_category_content[cur_item].status == "inativo" || cur_category_content[cur_item].status == "deletado" || cur_category_content[cur_item].status == "eos")) item_opacity = 50;

        if ((cur_category_content[cur_item].status != "inativo" && cur_category_content[cur_item].status != "deletado" && cur_category_content[cur_item].status != "eos") || show_dead) {
          document.querySelector(`.category-content-${category_id}`).innerHTML += `
            <a class="content_item opacity-${item_opacity}" href="${cur_category_content[cur_item].url}" target="_blank">
              <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 cursor-pointer transition-all duration-150 group hover:bg-gray-200">
                  <div class="p-1 w-[100%]">
                      <b>${cur_category_content[cur_item].nome}</b>
                      <br>
                      <p class="item_status">${item_status}</p>
                      <br>
                      <p class="item_plataforma_tags flex flex-col gap-2">
                        <span class="bg-blue-200 rounded-md shadow-md py-1 px-2 h-min w-fit">${item_plataforma}</span>
                      </p>
                  </div>
              </div>
            </a>
          `;
        }
      }
    }
  }

  let user_list = document.querySelector(".user_list");
  user_list.innerHTML = "";

  for (var cur_user = 0; cur_user < Object.keys(site_content.usernames).length; cur_user++) {
    let cur_username = Object.keys(site_content.usernames)[cur_user];
    let cur_user_plat = site_content.usernames[cur_username];

    document.querySelector(`.user_list`).innerHTML += `
      <div class="p-1 rounded-md m-2 sm:p-5 shadow-md border border-gray-200 transition-all duration-150 group hover:bg-gray-200">
          <div class="user_item item-${cur_username} p-1 w-[100%]">
              <b>${cur_username}</b>
              <br>
              <p class="flex flex-col gap-2">
                <span>Visto em:</span>
                <div class="item-${cur_username}_tags flex flex-row gap-2"></div>
              </p>
          </div>
      </div>
    `;

    let cur_user_plat_name = [];
    for (var cur_plat = 0; cur_plat < cur_user_plat.length; cur_plat++) {
      cur_user_plat_name.push(get_plataforma(cur_user_plat[cur_plat]));
      document.querySelector(`.item-${cur_username}_tags`).innerHTML += `
        <span class="bg-blue-200 rounded-md shadow-md py-1 px-2 h-min w-fit">${cur_user_plat_name[cur_plat]}</span>
      `;
    }
  }

  document.querySelector(".update_string").innerHTML = `Última atualização: ${site_content.update}`;
}

function get_plataforma(url) {
  for (var i = 0; i < Object.keys(site_content.plataformas).length; i++) {

    let cur_plataforma_id = Object.keys(site_content.plataformas)[i];
    let cur_plataforma_nome = site_content.plataformas[Object.keys(site_content.plataformas)[i]];

    if (url.includes(cur_plataforma_id)) {
      return cur_plataforma_nome;
    }
  }
}

function get_status(id) {
  for (var i = 0; i < Object.keys(site_content.status).length; i++) {

    let cur_status_id = Object.keys(site_content.status)[i];
    let cur_status_nome = site_content.status[Object.keys(site_content.status)[i]];

    if (id == cur_status_id) {
      return cur_status_nome;
    }
  }
}

var show_dead = false;

function switch_content_config() {
  if (document.querySelector(".content_config_dropdown").classList.contains('hidden')) {
    document.querySelector(".content_config_dropdown").classList.remove('hidden');
    return
  }
  document.querySelector(".content_config_dropdown").classList.add('hidden');
}

window.addEventListener('click', function(e){   
  if (!document.querySelector('.content_config_dropdown_area').contains(e.target)){
    document.querySelector(".content_config_dropdown").classList.add('hidden');
  }
});

function change_content_config(option) {
  if (option == "eos") {
    if (show_dead) {
      show_dead = false;
      update_content_config();
      load_content();
      return
    } else {
      show_dead = true;
      update_content_config();
      load_content();
      return
    }
  }
}

function update_content_config() {
  if (show_dead) {
    document.querySelector(".check_exibir_eos").classList.remove('hidden');
  } else {
    document.querySelector(".check_exibir_eos").classList.add('hidden');
  }
}
