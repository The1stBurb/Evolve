import { global } from './../vars.js';
import { loc } from './../locale.js';
import { clearElement, svgIcons, svgViewBox, format_emblem, getBaseIcon, sLevel } from './../functions.js';
import { vBind, popover } from './../functions.js';
import { theme_variables, themes, getThemeVar, broke_color, var_regx, getVar } from './../themes.js';

import { sideMenu, infoBoxBuilder, createRevealSection, createCalcSection, getSolarName } from './functions.js';

let name_regx=/custom_themes_(.*?)$/;
export function buildThemesPages(page_name){
    if (name_regx.test(page_name)){
        page_name=page_name.match(name_regx)[1]
    }
    let page_data=``;
    /*switch(page_name){
        case 'button':
            page_data=();
        break
        case 'border':
            page_data=();
        break
        case 'has-text':
            page_data=();
        break
        case 'popper':
            page_data=();
        break
        case 'hover':
            page_data=();
        break
        case 'link':
            page_data=();
        break
        case 'background':
            page_data=();
        break
        case 'b-tooltip':
            page_data=();
        break
        case 'meter':
            page_data=();
        break
        case 'div':
            page_data=();
        break
        case 'span':
            page_data=();
        break
        case 'market':
            page_data=();
        break
        case 'star':
            page_data=();
        break
        case 'scrollbar':
            page_data=();
        break
        case 'misc':
            page_data=();
        break
    }
    if(page_data==''){return;}*/

    let content=$('#content');
    clearElement(content);
    content.append(page_data);
    let mainContent=sideMenu('create',content);
    console.log(page_name)
    if(page_name=='intro'){
        buildIntroPage(mainContent)
    }
    else{
        buildPage(mainContent,page_name)
    }
    //Intro, this is the same format for each page!
    
    {
        
    }
}
let contrast_color='#fff';
function buildPage(mainContent,page_name){
    contrast_color=invCol(getVar('html-background'));

    let page_label=loc(`theme_section_${page_name}`);
    let page_main_text=loc(`wiki_custom_theme_page_maintext`,[page_label]);
    let page_sub_text='';//loc(`wiki_custom_theme_${page_name}-include`)
    mainContent.append(`
        <div class="infoBox">
            <h2 id="intro" class="header has-text-warning">${page_label}</h2>
            <div class="para">
                <span>${page_main_text}</span>
            </div>
            <div class="para">
                <span>${page_sub_text}</span>
            </div>
        
        </div>`);
    sideMenu('add',`custom_themes_${page_name}`,'intro',loc(`theme_section_intro`),)

    theme_variables[page_name].dat.forEach(elm=>{
        buildOneElm(mainContent,elm,page_name)
    });
}

function buildOneElm(mainContent,elm,section_name){
    let name=`theme_var_${elm}`;
    let col_path=get_color_path(elm);
    let col_disp=col_path.map(path_val=>{
        let path_name=path_val[0]=="#" ? (path_val==broke_color ? '' : `${colorBox(path_val)}${path_val}`) : loc(`theme_var_${path_val}`);
        return `<span class="has-text-caution">${path_name}</span>`;
    }).join(' -> ');
    let side_elm=elm.replaceAll("-","_");
    let include_text=loc(name+'_wiki').split(";").map(elm=>`<li> - ${elm}</li>`);
    let true_include_text=loc('theme_var_includes');
    
    mainContent.append(`
        <div class="infoBox">
            <h2 id="${side_elm}" class="header has-text-warning">${loc(name)} (${elm})</h2>
            <div class="para">
                <span>${true_include_text}</span>
                <ul>${include_text.join('')}</ul>
            </div>
            <div class="para">
                <span>Current Color: ${col_disp} </span>
            </div>
        
        </div>`);
    sideMenu('add',`custom_themes-${section_name}`,side_elm,loc(name));
}
function colorBox(col){
    return `<span class="colorBox" style="display:inline-block;width:1em;height:1em;vertical-align:middle;background-color:${col};border:1px solid ${contrast_color};margin-left:.05em;margin-right:.25em;"> </span>`
}

function buildIntroPage(mainContent){
    {
        infoBoxBuilder(mainContent,{
            name:`intro-intro`,
            template:'custom_theme',
            label:loc(`theme_section_intro`),
            paragraphs:4,
            break:[1,3],
            h_level:2,
        });
        sideMenu('add',`custom_themes_intro`,'intro',loc(`theme_section_intro`),)
    }
}


function get_color_path(var_name,colors,theme_name){
    let theme_dat=themes[theme_name ?? global.settings.theme];
    colors=colors ?? [];

    let cur_val = getThemeVar(var_name,theme_name);
    

    if(var_regx.test(cur_val)){
        cur_val=cur_val.match(var_regx)[1]
        colors.push(cur_val);
        let n_val=get_color_path(cur_val,colors,theme_name);
        colors=n_val
    }
    else{
        colors.push(cur_val)
    }

    return colors
}

//Black / White contrast to help with readability
function invCol(hex){
    // https://stackoverflow.com/a/3943023/112731
    hex=hex.slice(1);
    if(hex.length==3){
        hex=hex[0].count(2)+hex[1].count(2)+hex[2].count(2);
    }
    let [r,g,b]=[hex.slice(0,2),hex.slice(2,4),hex.slice(4,6)].map(hex_col=>parseInt(hex_col,16));
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#ffffff';
}
