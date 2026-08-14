var can_add = false;
var window_sel = window.getSelection().toString();
var startPos = 0;
var endPos = 0;

var tags = {
    "bold": "[bold]$text[/bold]",
    "italic": "[italic]$text[/italic]",
    "hr": "\\l",
    "newline": "\\n",
    "color": "[color:#000]$text[/color]"
};

function select_field (element,status) {
    if (status) can_add = status;
    else setTimeout(function () {can_add = status}, 1000);
    //console.log(can_add);
}

function set_selection(start,end) {
    //console.log(start+" "+end)
    startPos = start;
    endPos = end;
    //console.log(start==end);
}

function add(tag) {
    window_sel = window.getSelection().toString();
    let element = document.querySelector(".nota_input");

    if (can_add) {
        let replace_text = tags[tag].replaceAll("$text",element.value.substring(startPos, endPos));
        if (startPos == endPos) replace_text = tags[tag].replaceAll("$text","texto");

        element.value = element.value.slice(0, startPos) + replace_text + element.value.slice(endPos);
    } else element.value += tags[tag].replaceAll("$text","texto");
    can_add = false;
    //console.log(can_add);
}

function update_preview() {
    let preview_element = document.querySelector(".preview");
    let text = document.querySelector(".nota_input").value;

    //NEWLINE TAG
    text = text.replaceAll(/\\n/g,"<br>");

    //LINE TAG
    text = text.replaceAll(/\\l/g,"<hr>");

    //BOLD TAG
    for (itag = 0; itag <= (text.match(style_tag_bold) || []).length; itag++) {
        let style_tag_bold_match;

        while ((style_tag_bold_match = style_tag_bold.exec(text)) !== null) {
        text = text.replaceAll(style_tag_bold_match[0],`<b>${style_tag_bold_match.groups.real_text}</b>`);
        }
    }

    //ITALIC TAG
    for (itag = 0; itag <= (text.match(style_tag_italic) || []).length; itag++) {
        let style_tag_italic_match;

        while ((style_tag_italic_match = style_tag_italic.exec(text)) !== null) {
        text = text.replaceAll(style_tag_italic_match[0],`<i>${style_tag_italic_match.groups.real_text}</i>`);
        }
    }

    //COLOR TAG
    for (itag = 0; itag < (text.match(style_tag_color) || []).length; itag++) {
        let style_tag_color_match;

        while ((style_tag_color_match = style_tag_color.exec(text)) !== null) {
        text = text.replaceAll(style_tag_color_match[0],`<span style="color: ${style_tag_color_match.groups.color}">${style_tag_color_match.groups.real_text}</span>`);
        }
    }

    preview_element.innerHTML = text;
}

const style_tag_gradient = /\[gradient:(?<direction>.+?):(?<first_color>.+?):(?<second_color>.+?)](?<real_text>.+?)\[\/gradient]/g;
const style_tag_gradient_percent = /\[gradient_percent:(?<direction>.+?):(?<first_color>.+?):(?<second_color>.+?):(?<first_color_focus>.+?):(?<second_color_focus>.+?)](?<real_text>.+?)\[\/gradient_percent]/g;
const style_tag_color = /\[color:(?<color>.+?)](?<real_text>.+?)\[\/color]/g;
const style_tag_bold = /\[bold](?<real_text>.+?)\[\/bold]/g;
const style_tag_italic = /\[italic](?<real_text>.+?)\[\/italic]/g;
const style_tag_bg = /\[bg:(?<color>.+?)](?<real_text>.+?)\[\/bg]/g;
const style_tag_border = /\[border:(?<size>.+?):(?<color>.+?)](?<real_text>.+?)\[\/border]/g;
const style_tag_shadow = /\[shadow:(?<size>.+?):(?<color>.+?):(?<opacity>.+?)](?<real_text>.+?)\[\/shadow]/g;
const style_tag_solid_shadow = /\[solidshadow:(?<horizontal>.+?):(?<vertical>.+?):(?<color>.+?)](?<real_text>.+?)\[\/solidshadow]/g;
const style_tag_badge = /\[badge:(?<text_color>.+?):(?<bg_color>.+?)](?<real_text>.+?)\[\/badge]/g;
const style_tag_icon = /\[icon:(?<id>.+?):(?<style>.+?)]/g;
const style_tag_progress = /\[bar:(?<value>.+?):(?<max>.+?)]/g;
const style_tag_marktxt = /\[mark:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;
const style_tag_marktxt_percent = /\[mark_p:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;
const style_tag_mark = /\[bar_mark:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g;
const style_tag_preset = /\[estilo:(?<nome>.+?)](?<real_text>.+?)\[\/estilo]/g;
