<script setup>
    import { ref } from "vue";
    import { save, webWorker, global } from '../vars.js';
    import { loc, locales, updateHtmlLang, getString } from '../locale.js';
    import { gameLoop } from '../functions.js';
    // import { tabLabel as label } from '../index.js';
    import { themes, set_theme, theme_settings, loadCustomThemeHTML, createAllThemeDropdowns, setThemeToHTML, loadThemeEditorDat, importTheme, getThemeSaveData, getThemeTitle } from '../themes.js';

    import SeasonHunt from './SeasonHunt.vue';
    import Iconic from './Icon.vue';
    global.settings.icon='star';
    let s=(global.settings);
    const t=ref(theme_settings);
    const themeDropdownCont=ref(null);

    function numNotation(notation){
        global.settings.affix = notation;
    }
    function notation(n){
        switch (n){
            case 'si':
                return label(`metric`);
            case 'sci':
                return label(`scientific`);
            case 'eng':
                return label(`engineering`);
            case 'sln':
                return label(`sln`);
        }
    }
    function icon(icon){
        console.log('in icon, setting to',icon);
        global.settings.icon = icon;
        save.setItem('evolved',LZString.compressToUTF16(JSON.stringify(global)));
        if (webWorker.w){
            webWorker.w.terminate();
        }
        // window.location.reload();
    }
    function saveImport(){
        let impExp=$('#importExport textarea');
        if (impExp.val().length > 0){
            importGame(impExp.val());
        }
    }
    function saveExport(){
        $('#importExport textarea').val(window.exportGame());
        $('#importExport textarea').select();
        document.execCommand('copy');
    }
    function saveExportFile(){
        const downloadToFile = (content, filename, contentType) => {
            const a = document.createElement('a');
            const file = new Blob([content], {type: contentType});
            a.href= URL.createObjectURL(file);
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);
        };
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toFixed(0).padStart(2, '0');
        const day = date.getDate().toFixed(0).padStart(2, '0');
        const hour = date.getHours().toFixed(0).padStart(2, '0');
        const minute = date.getMinutes().toFixed(0).padStart(2, '0');
        downloadToFile(window.exportGame(), `evolve-${year}-${month}-${day}-${hour}-${minute}.txt`, 'text/plain');
    }
    function importStringFile(){ 
        let file = document.getElementById("stringPackFile").files[0];
        if (file) {
            let reader = new FileReader();
            let fileName = document.getElementById("stringPackFile").files[0].name;
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                try {
                    JSON.parse(evt.target.result);
                }
                catch {
                    global.settings.sPackMsg = label(`string_pack_error`,[fileName]);
                    return;
                }
                
                global.settings.sPackMsg = label(`string_pack_using`,[fileName]);
                save.setItem('string_pack_name',fileName); save.setItem('string_pack',LZString.compressToUTF16(evt.target.result));
                if (global.settings.sPackOn){
                    global.queue.rename = true;
                    save.setItem('evolved',LZString.compressToUTF16(JSON.stringify(global)));
                    if (webWorker.w){
                        webWorker.w.terminate();
                    }
                    window.location.reload();
                }
                
            }
            reader.onerror = function (evt) {
                console.error("error reading file");
            }
        }
    }
    function clearStringFile(){
        if (save.getItem('string_pack')){
            global.settings.sPackMsg = label(`string_pack_none`);
            save.removeItem('string_pack_name');
            save.removeItem('string_pack');
            if (global.settings.sPackOn){
                global.queue.rename = true;
                save.setItem('evolved',LZString.compressToUTF16(JSON.stringify(global)));
                if (webWorker.w){
                    webWorker.w.terminate();
                }
                window.location.reload();
            }
        }
    }
    function stringPackOn(){
        if (save.getItem('string_pack')){
            global.queue.rename = true;
            save.setItem('evolved',LZString.compressToUTF16(JSON.stringify(global)));
            if (webWorker.w){
                webWorker.w.terminate();
            }
            window.location.reload();
        }
    }
    function restoreGame(){
        let restore_data = save.getItem('evolveBak') || false;
        this.$buefy.dialog.confirm({
            title: label('restore'),
            message: label('restore_warning'),
            ariaModal: true,
            confirmText: label('restore'),
            onConfirm() {
                if (restore_data){
                    importGame(restore_data,true);
                }
            }
        });
    }
    function lChange(locale){
        global.settings.locale = locale;
        global.queue.rename = true;
        // getString(locale);
        save.setItem('evolved', LZString.compressToUTF16(JSON.stringify(global)));

        // Update the HTML lang attribute for accessibility
        // updateHtmlLang(locale);

        if (webWorker.w){
            webWorker.w.terminate();
        }
        window.location.reload();
    }
    function saveImportTheme(){
        if ($('#importExportTheme textarea').val().length > 0){
            importTheme($('#importExportTheme textarea').val());
        }
    }
    function saveExportTheme(){
        $('#importExportTheme textarea').val(getThemeSaveData());
        $('#importExportTheme textarea').select();
        document.execCommand('copy');
    }
    function saveExportThemeFile(){
        const downloadToFile = (content, filename, contentType) => {
            const a = document.createElement('a');
            const file = new Blob([content], {type: contentType});
            a.href= URL.createObjectURL(file);
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);
        };
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toFixed(0).padStart(2, '0');
        const day = date.getDate().toFixed(0).padStart(2, '0');
        const hour = date.getHours().toFixed(0).padStart(2, '0');
        const minute = date.getMinutes().toFixed(0).padStart(2, '0');
        downloadToFile(getThemeSaveData(), `evolve_theme-${getThemeTitle(global.settings.theme)}-${year}-${month}-${day}-${hour}-${minute}.txt`, 'text/plain');
    }
    function setTheme(theme,set_none){
        set_theme(theme);
        global.settings.theme = theme;
        setThemeToHTML(theme,set_none);
    }
    function openCloseThemeEditor(e){
        loadThemeEditorDat();
    }
    function setCustomCount(num,t){
        let past_count=t.custom_count;
        t.custom_count=num;
        global.custom_theme.custom_count=num;
        if(past_count==num){
            return;
        }
        else if(past_count>num){
            console.log('too many',num+1,past_count)
            for(let i=num+1; i<=past_count; i++){
                let name=`custom-${i}`;
                delete themes[name];
                delete global.custom_theme[name];
            }
        }
        else{
            console.log('too little',past_count+1,num)
            for(let i=past_count+1; i<=num; i++){
                let name=`custom-${i}`;
                themes[name]={};
                global.custom_theme[name]=themes[name];
            }
        }
    }
    function font(f){
        global.settings.font = f;
        $(`html`).removeClass('standard');
        $(`html`).removeClass('large_log');
        $(`html`).removeClass('large_all');
        $('html').addClass(f);
    }
    function qu_merge(merge){
        global.settings.q_merge = merge;
    }
    function toggleTabLoad() {
        if (global.settings.tabLoad) {
            // Enabling preload, load all tabs
            initTabs();
        } else {
            // Disabling preload, clear all tabs
            clearResDrag();
            clearGrids();
            clearMechDrag();
            clearGeneticsDrag();
            clearSpyopDrag();
            clearShipDrag();
            clearElement($(`#mTabCivil`));
            clearElement($(`#mTabCivic`));
            clearElement($(`#mTabResearch`));
            clearElement($(`#mTabResource`));
            clearElement($(`#mTabArpa`));
            clearElement($(`#mTabStats`));
            clearElement($(`#mTabObserve`));
        }
    }
    function unpause(){
        $(`#pausegame`).removeClass('play');
        $(`#pausegame`).removeClass('pause');
        if (global.settings.pause){
            $(`#pausegame`).addClass('pause');
        }
        else {
            $(`#pausegame`).addClass('play');
        }
        if (!global.settings.pause && !webWorker.s){
            gameLoop('start');
        }
    }
    function setQueueStyle(style){
        global.settings.queuestyle = style;
        const buildingQueue = $('#buildQueue');
        ['standardqueuestyle', 'listqueuestyle', 'bulletlistqueuestyle', 'numberedlistqueuestyle']
            .forEach(qstyle => {
                if (global.settings.queuestyle === qstyle) {
                    buildingQueue.addClass(qstyle);
                } else {
                    buildingQueue.removeClass(qstyle);
                }
            });
    }
    function setQueueResize(mode) {
        global.settings.q_resize = mode;
    }
    function resetGame(){
        window.reset();
    }
    function softResetGame(){
        window.soft_reset();
    }
    function label(lbl,args){
        return loc(lbl,args);
    }

    const locale_list=ref([]);
    let localelist = [];
    let current_locale = ref('');
    if (Object.keys(locales).length > 1){
        let selected = global.settings.locale;
        Object.keys(locales).forEach(function (locale){
            if (selected === locale) {
              current_locale.value = locales[locale];
            }
            locale_list.value.push({
                name: locale,
                label: locales[locale],
            });
        });
    }
    const theme_names=ref(createAllThemeDropdowns('setTheme'));

    let iconlist = ref([]);
    let icons = [
        {i: 'nuclear',      f: 'steelem',               r: 2 },
        {i: 'zombie',       f: 'the_misery',            r: 2 },
        {i: 'fire',         f: 'ill_advised',           r: 2 },
        {i: 'mask',         f: 'friday',                r: 1 },
        {i: 'skull',        f: 'demon_slayer',          r: 2 },
        {i: 'taijitu',      f: 'equilibrium',           r: 2 },
        {i: 'martini',      f: 'utopia',                r: 2 },
        {i: 'lightbulb',    f: 'energetic',             r: 2 },
        {i: 'trash',        f: 'garbage_pie',           r: 2 },
        {i: 'banana',       f: 'banana',                r: 2 },
        {i: 'turtle',       f: 'finish_line',           r: 2 },
        {i: 'floppy',       f: 'digital_ascension',     r: 2 },
        {i: 'slime',        f: 'slime_lord',            r: 2 },
        {i: 'sludge',       f: 'grand_death_tour',      r: 2 },
        {i: 'lightning',    f: 'annihilation',          r: 2 },
        {i: 'trophy',       f: 'wish',                  r: 2 },
        {i: 'robot',        f: 'planned_obsolescence',  r: 2 },
        {i: 'heart',        f: 'valentine',             r: 1 },
        {i: 'clover',       f: 'leprechaun',            r: 1 },
        {i: 'bunny',        f: 'easter',                r: 1 },
        {i: 'egg',          f: 'egghunt',               r: 1 },
        {i: 'rocket',       f: 'launch_day',            r: 1 },
        {i: 'sun',          f: 'solstice',              r: 1 },
        {i: 'firework',     f: 'firework',              r: 1 },
        {i: 'ghost',        f: 'halloween',             r: 1 },
        {i: 'candy',        f: 'trickortreat',          r: 1 },
        {i: 'turkey',       f: 'thanksgiving',          r: 1 },
        {i: 'meat',         f: 'immortal',              r: 1 },
        {i: 'present',      f: 'xmas',                  r: 1 },
    ];

    // let irank = alevel();
    // if (irank < 2){ irank = 2; }
    for (let i=0; i<icons.length; i++){
        if (global.stats.feat[icons[i].f] && global.stats.feat[icons[i].f] >= icons[i].r){
            iconlist.value.push({
                icon: icons[i].i,
            });
        }
        else if (global.settings.icon === icons[i].i){
            global.settings.icon = 'star';
        }
    }
</script>
<template>
    <b-tab-item id="settings" class="settings sticky" :label="label('tab_settings')">
        <!--  v-if="global.settings.civTabs == 7" perchance? (put in the div below) -->
        <div id="mTabSettings"><!-- Include this if you want fancy text reload!  :key="global.settings.locale"-->
        <div class="theme">
            <span>{{ label('theme') }} </span>
            <b-dropdown aria-role="list" ref="themeDropdownCont">
                <template #trigger="{ active }">
                    <b-button :label="getThemeTitle(s.theme)" type="is-info"/>
                </template>
                <b-dropdown-item v-for="name in theme_names" v-on:click="setTheme(name.name, name == 'night' || name.name.includes('custom'))">{{  getThemeTitle(name.name)  }}</b-dropdown-item>
                <season-hunt :event="'easter'" :num="9" :size="14" :typer="'dropdown-item'"/>
            </b-dropdown>

            <span>{{ label('units') }} </span>
            <b-dropdown  aria-role="list">
                <template #trigger="{ active }">
                    <b-button :label="notation(s.affix)" type="is-info"/>
                </template>
                <b-dropdown-item v-on:click="numNotation('si')">{{ label('metric') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="numNotation('sci')">{{ label('scientific') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="numNotation('eng')">{{ label('engineering') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="numNotation('sln')">{{ label('sln') }}</b-dropdown-item>
                <season-hunt :event="'halloween'" :num="5" :size="12" :trick="true" :typer="'dropdown-item'" />
            </b-dropdown>

            <span>{{ label('icons') }} </span>
            <b-dropdown aria-role="list">
                <template #trigger="{ active }">
                    <b-button :label="label(global.settings.icon)" type="is-info"/>
                </template>
                <b-dropdown-item v-on:click="icon('star')"><iconic :icon="'star'" :size="16" /> {{ label('star') }}</b-dropdown-item>
                <b-dropdown-item v-for="item in iconlist" v-on:click="icon(item.icon)"><iconic :icon="item.icon" :size="16" /> {{ label(item.icon) }}</b-dropdown-item>
            </b-dropdown>
        </div>
        <div id="localization" class="localization">
            <span>{{ label('locale') }} </span>
            <b-dropdown :triggers="['hover']" aria-role="list">
                <template #trigger>
                    <b-button :label="locales[s.locale]" type="is-info"/>
                </template>
                <b-dropdown-item v-for="item in locale_list" v-on:click="lChange(item.name)">{{ item.label }}</b-dropdown-item>
            </b-dropdown>

            <span>{{ label('font') }} </span>
            <b-dropdown aria-role="list">
                <template #trigger="{ active }">
                    <b-button type="is-info">{{ label(s.font) }}</b-button>
                </template>
                <b-dropdown-item v-on:click="font('standard')">{{ label('standard') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="font('large_log')">{{ label('large_log') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="font('large_all')">{{ label('large_all') }}</b-dropdown-item>
            </b-dropdown>
        </div>

        <div class="queue">
            <span>{{ label('queuestyle') }} </span>
            <b-dropdown aria-role="list">
                <template #trigger="{ active }">
                    <b-button :label="label(s.queuestyle)" type="is-info"/>
                </template>
                <b-dropdown-item v-on:click="setQueueStyle('standardqueuestyle')">{{ label('standardqueuestyle') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueStyle('listqueuestyle')">{{ label('listqueuestyle') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueStyle('bulletlistqueuestyle')">{{ label('bulletlistqueuestyle') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueStyle('numberedlistqueuestyle')">{{ label('numberedlistqueuestyle') }}</b-dropdown-item>
            </b-dropdown>

            <span class="settings15" aria-label="label('settings15')">{{ label('q_merge') }} </span>
            <b-dropdown aria-role="list">
                <template #trigger="{ active }">
                    <b-button :label="label(s.q_merge)" type="is-info"/>
                </template>
                <b-dropdown-item v-on:click="qu_merge('merge_never')">{{ label('merge_never') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="qu_merge('merge_nearby')">{{ label('merge_nearby') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="qu_merge('merge_all')">{{ label('merge_all') }}</b-dropdown-item>
            </b-dropdown>

            <span>{{ label('q_resize') }} </span>
            <b-dropdown aria-role="list">
                <template #trigger="{ active }">
                    <b-button :label="label('q_resize_' + s.q_resize)" type="is-info"/>
                </template>
                <b-dropdown-item v-on:click="setQueueResize('auto')">{{ label('q_resize_auto') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueResize('grow')">{{ label('q_resize_grow') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueResize('shrink')">{{ label('q_resize_shrink') }}</b-dropdown-item>
                <b-dropdown-item v-on:click="setQueueResize('manual')">{{ label('q_resize_manual') }}</b-dropdown-item>
            </b-dropdown>
        </div>

        <b-switch class="setting" v-model="s.pause" @input="unpause"><span class="settings12" aria-label="label('settings12')">{{ label('pause') }}</span></b-switch>
        <b-switch class="setting" v-model="s.mKeys"><span class="settings1" aria-label="label('settings1')">{{ label('m_keys') }}</span></b-switch>
        <b-switch class="setting" v-model="s.cLabels"><span class="settings5" aria-label="label('settings5')">{{ label('c_cat') }}</span></b-switch>
        <b-switch class="setting" v-model="s.alwaysPower"><span class="settings17" aria-label="label('settings17')">{{ label('always_power') }}</span></b-switch>
        <b-switch class="setting" v-model="s.qKey"><span class="settings6" aria-label="label('settings6')">{{ label('q_key') }}</span></b-switch>
        <b-switch class="setting" v-model="s.qAny"><span class="settings7" aria-label="label('settings7')">{{ label('q_any') }}</span></b-switch>
        <b-switch class="setting" v-model="s.qAny_res"><span class="settings14" aria-label="label('settings14')">{{ label('q_any_res') }}</span></b-switch>
        <b-switch class="setting" v-model="s.sPackOn" @input="stringPackOn"><span class="settings13" aria-label="label('settings13')">{{ label('s_pack_on') }}</span></b-switch>
        <b-switch class="setting" v-model="s.expose"><span class="settings8" aria-label="label('settings8')">{{ label('expose') }}</span></b-switch>
        <b-switch class="setting" v-model="s.tabLoad" @update:model-value="toggleTabLoad"><span class="settings11" aria-label="label('settings11')">{{ label('tabLoad') }}</span></b-switch>
        <b-switch class="setting" v-model="s.boring"><span class="settings10" aria-label="label('settings10')">{{ label('boring') }}</span></b-switch>
        <b-switch class="setting" v-model="s.touch"><span class="settings16" aria-label="label('settings16')">{{ label('touch') }}</span></b-switch>
        <div>
            <div>{{ label('key_mappings') }}</div>
            <div class="keyMap"><span>{{ label('multiplier',[10]) }}</span> <b-input v-model="s.keyMap.x10" id="x10Key"></b-input></div>
            <div class="keyMap"><span>{{ label('multiplier',[25]) }}</span> <b-input class="keyMap" v-model="s.keyMap.x25" id="x25Key"></b-input></div>
            <div class="keyMap"><span>{{ label('multiplier',[100]) }}</span> <b-input class="keyMap" v-model="s.keyMap.x100" id="x100Key"></b-input></div>
            <div class="keyMap"><span>{{ label('q_key') }}</span> <b-input class="keyMap" v-model="s.keyMap.q" id="queueKey"></b-input></div>
        </div>
        <div class="importExport">
            <div>{{ label('tab_mappings') }}</div>
            <div class="keyMap"><span>{{ label('tab_civil') }}</span> <b-input v-model="s.keyMap.showCiv" id="showCivKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tab_civics') }}</span> <b-input v-model="s.keyMap.showCivic" id="showCivicKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tab_research') }}</span> <b-input v-model="s.keyMap.showResearch" id="showResearchKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tab_resources') }}</span> <b-input v-model="s.keyMap.showResources" id="showResourcesKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tech_arpa') }}</span> <b-input v-model="s.keyMap.showGenetics" id="showGeneticsKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tab_stats') }}</span> <b-input v-model="s.keyMap.showAchieve" id="showAchieveKey"></b-input></div>
            <div class="keyMap"><span>{{ label('tab_settings') }}</span> <b-input v-model="s.keyMap.settings" id="settingshKey"></b-input></div>
        </div>
        <div class="stringPack setting">
            <button id="stringPack" class="button" @click="importStringFile">{{ label('load_string_pack') }}</button>
            <input type="file" class="fileImport" id="stringPackFile" accept="text/plain, application/json">
            <button class="button right" @click="clearStringFile">{{ label('clear_string_pack') }}</button>
        </div>
        <div class="stringPack setting">
            <span>{{ s.sPackMsg }}</span>
        </div>
        <div class="importExport">
            <b-field :label="label('import_export')">
                <b-input id="importExport" type="textarea"></b-input>
            </b-field>
            <button class="button" @click="saveImport">{{ label('import') }}</button>
            <button class="button" @click="saveExport">{{ label('export') }}</button>
            <button class="button" @click="saveExportFile">{{ label('export_file') }}</button>
            <button class="button right" @click="restoreGame"><span class="settings9" aria-label="label('settings9')">{{ label('restore') }}</span></button>
        </div>
        <div class="reset">
            <b-collapse :open="false">
                <b-switch v-model="s.disableReset" slot="trigger">{{ label('enable_reset') }}</b-switch>
                <div class="notification" v-if="s.disableReset">
                    <div class="content">
                        <h4 class="has-text-danger">
                            {{ label('reset_warn') }}
                        </h4>
                        <p>
                            <button class="button" :disabled="!s.disableReset" @click="softResetGame()"><span class="settings4" aria-label="label('settings4')">{{ label('reset_soft') }}</span></button>
                            <button class="button right" :disabled="!s.disableReset" @click="resetGame()"><span class="settings3" aria-label="label('settings3')">{{ label('reset_hard') }}</span></button>
                        </p>
                    </div>
                </div>
            </b-collapse>
        </div>
        <div class="themeEditor">
            <b-switch class="setting" v-model="t.themeEditorOpen" @click="openCloseThemeEditor"><span>{{ label('open_theme_editor')}}</span></b-switch>
            <div v-if="t.themeEditorOpen" class="importExport">
                <b-field label="label('import_export_theme')">
                    <b-input id="importExportTheme" type="textarea"></b-input>
                </b-field>
                <button class="button" @click="saveImportTheme">{{ label('import_theme') }}</button>
                <button class="button" @click="saveExportTheme">{{ label('export_theme') }}</button>
                <button class="button" @click="saveExportThemeFile">{{ label('export_file') }}</button>
            </div>
        </div>
        </div>
    </b-tab-item>
</template>