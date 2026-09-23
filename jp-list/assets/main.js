import * as manage from "./script/manage.js";
import * as constants from "./script/constants.js";

var i;
const nf = new Intl.NumberFormat('fr-FR');

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

window.open_tab = open_tab;
window.remote_open_tab = remote_open_tab;
remote_open_tab('Arquivo');

function change_option(option) {
  switch (option) {
    case "view":
      manage.switch_view();
    break;
    case "cores":
      manage.switch_cores();
    break;
    case "apoio":
      manage.switch_apoio();
    break;
  }
}

window.change_option = change_option;

function reset_scroll() { window.scrollTo(window.scrollY, 0); }

window.reset_scroll = reset_scroll;
