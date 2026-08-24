//game data
let game_data = {
    lang: "en",
    likes: 0,
    lpc: 0,
    shop_items: {
        followers: {
            quantity: 0,
            double: 1
        }
    }
};

//list valid item ids to add
function list_item_ids() {
    for (let i = 0; i<Object.keys(shop_items).length; i++) {
        document.querySelector(".ids_list").innerHTML += ` ${Object.keys(shop_items)[i]}`;
    }
}



//game logic

//function on page load
function start() {
    list_item_ids();

    //load language buttons
    for (let i = 0; i<Object.keys(lang_strings).length; i++) {
        document.querySelector(".lang_buttons_area").innerHTML += `
            <button onclick="set_game_lang('${Object.keys(lang_strings)[i]}')">${Object.keys(lang_strings)[i]}</button>
        `
    }
    //load game function
    //get values from local storage, if not null (if null, continue with default and dont save, until save game function)
}

//set new game lang
function set_game_lang(sel_lang) {
    game_data.lang = sel_lang;
}

//add shop item
function add_shop_item(item_name) {
    if (item_name != "" && item_name != "lpc") {
        let cur_item = shop_items[item_name];

        game_data.shop_items[item_name] = {quantity: 0,double: 1};

        document.querySelector(".shop_items_area").innerHTML += `
            <div class="shop_item">
                <span class="shop_item_name shop_${item_name}_name">${get_string(`strings_shop_items.${item_name}.${cur_item.name_plural}`)}</span>
                <br>
                <span class="shop_item_button shop_${item_name}_button">+1 ${get_string(`strings_shop_items.${item_name}.${cur_item.name_singular}`)}</span>
                <br>
                <br>
                <span class="shop_item_quantity shop_${item_name}_quantity">${game_data.shop_items[item_name].quantity}</span>
                <br>
                <br>
                <span class="shop_item_desc shop_${item_name}_desc">${get_string(`strings_shop_items.${item_name}.${cur_item.description}`)}</span>
            </div><br>
        `
    }
}

//add double item
function add_double_item(item_name) {
    if (item_name != "") {
        let cur_item = shop_items[item_name].double;
        let cur_item_relative = shop_items[item_name];

        let double_lps_string_replace = lang_strings[game_data.lang].double_lps_string.replace("{item_plural}",get_string(`strings_shop_items.${item_name}.${cur_item_relative.name_plural}`));
        document.querySelector(".shop_items_area").innerHTML += `
            <div class="shop_item">
                <span class="shop_double_name shop_${item_name}_double_name">${get_string(`strings_shop_items.${item_name}.${cur_item.name}`)}</span>
                <br>
                <span class="shop_item_button shop_${item_name}_button">${double_lps_string_replace}</span>
                <br>
                <br>
                <span class="shop_double_desc shop_${item_name}_double_desc">${get_string(`strings_shop_items.${item_name}.${cur_item.description}`)}</span>
            </div><br>
        `
    }
}

//add shop item (lpc)
function add_lpc_item() {
    let cur_item = shop_items.lpc;
    document.querySelector(".shop_items_area").innerHTML += `
        <div class="shop_item">
            <span class="shop_item_name shop_lpc_name">${get_string(`strings_shop_items.lpc.${cur_item.name}`)}</span>
            <br>
            <br>
            <span class="shop_item_quantity shop_lpc_quantity">${get_string(`strings_shop_items.lpc.${cur_item.level}`)}${game_data.lpc}</span>
            <br>
            <br>
            <span class="shop_item_desc shop_lpc_desc">${get_string(`strings_shop_items.lpc.${cur_item.description}`)}</span>
        </div><br>
    `
}

//calculate lps
function calc_lps() {
    //here the calculation of likes per second is done and returned, whenever i need the lps value, i just need to use the function
    let lps = 1;
    return lps
}

// Source - https://stackoverflow.com/a/6491621
// Posted by Alnitak, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-23, License - CC BY-SA 3.0

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

const variable_tag = /\{(?<variable_id>[0-9]+?)\}/g
const number_tag = /\{p:(?<singular>.+?):(?<plural>.+?)\}/g

//get string from data by language
function get_string(path="",number="",variables=[]) {
    let string = Object.byString(lang_strings[game_data.lang], path);

    if (number != "") {
		if (number == "singular") {
            for (itag = 0; itag <= (string.match(number_tag) || []).length; itag++) {
                let number_tag_match;

                while ((number_tag_match = number_tag.exec(string)) !== null) {
                    string = string.replaceAll(number_tag_match[0],number_tag_match.groups.singular);
                }
            }
		} else {
			for (itag = 0; itag <= (string.match(number_tag) || []).length; itag++) {
                let number_tag_match;

                while ((number_tag_match = number_tag.exec(string)) !== null) {
                    string = string.replaceAll(number_tag_match[0],number_tag_match.groups.plural);
                }
            }
		}
	}

    if (variables != "") {
        for (itag = 0; itag <= (string.match(variable_tag) || []).length; itag++) {
            let variable_tag_match;

            while ((variable_tag_match = variable_tag.exec(string)) !== null) {
                string = string.replaceAll(variable_tag_match[0],variables[variable_tag_match.groups.variable_id]);
            }
        }
	}

    return string;
}

//toasts system
var toasts_memory = [];

function create_new_toast(string,time) {
let cur_id = try_toast_id();
	document.querySelector(".toasts_container").innerHTML += `
	<div class="toast-${cur_id}" style="display: flex; flex-direction: row; gap: 5px; align-items: stretch; padding: 5px; background-color: #fff898; border: 1px solid black; border-radius: 5px;">
	${string}
	<div class="close" style="cursor: pointer; user-select: none" onclick="destroy_toast(${cur_id})">X</div>
	</div>
	`;
	
	toasts_memory[cur_id] = time;
}

function try_toast_id() {
	for (var i = 0; i < toasts_memory.length; i++) {
		if (toasts_memory[i] == "") return i;
	}
	if (i >= toasts_memory.length) return toasts_memory.length;
}

function destroy_toast(id) {
	toasts_memory[id] = "";
	document.querySelector(".toast-"+id).remove();
}

var mouse_hovering_on_toasts = false;

window.setInterval(function(){
    if (!toasts_memory.join("").replace(/\s/gi,'').length==0 && !mouse_hovering_on_toasts) {
        for (var i = 0; i < toasts_memory.length; i++) {
            if (toasts_memory[i] != "") {
                if (toasts_memory[i] > 0) toasts_memory[i]--;
                if (toasts_memory[i] <= 0) {
                    toasts_memory[i] = "";
                    destroy_toast(i);
                }
            }
        }
    }
}, 100);
