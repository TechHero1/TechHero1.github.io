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



//game logic

//function on page load
function start() {
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
        document.querySelector(".shop_items_area").innerHTML += `
            <div class="shop_item">
                <span class="shop_item_name shop_${item_name}_name">${lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.name_plural]}</span>
                <br>
                <span class="shop_item_button shop_${item_name}_button">+1 ${lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.name_singular]}</span>
                <br>
                <br>
                <span class="shop_item_quantity shop_${item_name}_quantity">${game_data.shop_items[item_name].quantity}</span>
                <br>
                <br>
                <span class="shop_item_desc shop_${item_name}_desc">${lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.description]}</span>
            </div><br>
        `
    }
}

//add double item
function add_double_item(item_name) {
    if (item_name != "") {
        let cur_item = shop_items[item_name].double;
        document.querySelector(".shop_items_area").innerHTML += `
            <div class="shop_item">
                <span class="shop_double_name shop_${item_name}_double_name">${lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.name]}</span>
                <br>
                <br>
                <span class="shop_double_desc shop_${item_name}_double_desc">${lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.description]}</span>
            </div><br>
        `
    }
}

//add shop item (lpc)
function add_lpc_item() {
    let cur_item = shop_items.lpc;
    document.querySelector(".shop_items_area").innerHTML += `
        <div class="shop_item">
            <span class="shop_item_name shop_lpc_name">${lang_strings[game_data.lang].strings_shop_items.lpc[cur_item.name]}</span>
            <br>
            <br>
            <span class="shop_item_quantity shop_lpc_quantity">${lang_strings[game_data.lang].strings_shop_items.lpc[cur_item.level]+game_data.lpc}</span>
            <br>
            <br>
            <span class="shop_item_desc shop_lpc_desc">${lang_strings[game_data.lang].strings_shop_items.lpc[cur_item.description]}</span>
        </div><br>
    `
}

//calculate lps
function calc_lps() {
    //here the calculation of likes per second is done and returned, whenever i need the lps value, i just need to use the function
    let lps = 1;
    return lps
}