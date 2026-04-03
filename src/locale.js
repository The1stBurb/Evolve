import { global, save } from './vars.js';

let strings;
getString(global.settings.locale);

export function loc(key, variables) {
    let string = strings[key];
    if (!string) {
        if (global.settings.expose){
            console.error(`string ${key} not found`);
            console.log(strings);
        }
        return key;
    }
    if (variables) {
        if(variables instanceof Array) {
            for (let i = 0; i < variables.length; i++){
                let re = new RegExp(`%${i}(?!\\d)`, "g");
                if(!re.exec(string)){
                    if (global.settings.expose){
                        console.error(`"%${i}" was not found in the string "${key}" to be replace by "${variables[i]}"`);
                    }
                    continue;
                }
                string = string.replace(re, variables[i]);
            }
            let re = new RegExp("%\\d+(?!\\d)", 'g');
            const results = string.match(re);
            if(results && global.settings.expose){
                console.error(`${results} was found in the string, but there is no variables to make the replacement`);
            }
        }
        else {
            if (global.settings.expose){
                console.error('"variables" need be a instance of "Array"');
            }
        }
    }
    return string;
}

function getString(locale) {
    $.ajaxSetup({ async: false });

    let defaultString;
    $.getJSON("strings/strings.json", (data) => { defaultString = data; });

    if (locale != "en-US"){
        let localeString;
        try {
            $.getJSON(`strings/strings.${locale}.json`, (data) => { localeString = data; })
        }
        catch (e) {
            console.error(e,e.stack);
        }
        const defSize = defaultString.length;

        if (localeString) {
            Object.assign(defaultString, localeString);
        }

        if(defaultString.length != defSize && global.settings.expose){
            console.error(`string.${locale}.json has extra keys.`);
        }
    }
    let string_pack = save.getItem('string_pack') || false;
    if (string_pack && global.settings.sPackOn){
        let themeString;
        try {
            themeString = JSON.parse(LZString.decompressFromUTF16(string_pack));
        }
        catch (e) {
            console.error(e,e.stack);
        }
        const defSize = defaultString.length;
        
        if (themeString) {
            Object.assign(defaultString, themeString);
        }
        
        if (defaultString.length != defSize && global.settings.expose){
            console.error(`string pack has extra keys.`);
        }
    }

    $.ajaxSetup({ async: true });
    strings = defaultString;
}

export const locales = {
    'en-US': 'English (US)',
    'es-ES': 'Spanish (ESP)',
    'pt-BR': 'Português (BR)',
    'de-DE': 'Deutsch',
    'it-IT': 'Italiano',
    'ru-RU': 'Русский',
    'cs-CZ': 'Čeština',
    'pl-PL': 'Polski',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'ko-KR': '한국어',
    'im-PL': 'Igpay-Atinlay',
    'ja-JP': '日本語' 
};

/**
 * Updates the HTML lang attribute based on the current locale setting
 * @param {string} locale - Locale code ('en-US', 'fr-FR')
 */
export function updateHtmlLang(locale) {
    if (!locale) return;

    // extract primary language code ('en-US' -> 'en')
    const langCode = locale.split('-')[0];
    document.documentElement.setAttribute('lang', langCode);
};

/**
 * Initializes the HTML lang attribute from saved game data
 * call on page load before game renders
 */
export function initHtmlLang() {
    try {
        const savedData = save.getItem('evolved');
        if (savedData) {
            const gameState = JSON.parse(LZString.decompressFromUTF16(savedData));
            if (gameState?.settings?.locale) {
                updateHtmlLang(gameState.settings.locale);
            }
        }
    } catch (e) {
        console.warn('Could not initialize lang attribute:', e);
    }
}