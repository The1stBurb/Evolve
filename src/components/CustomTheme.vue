<script setup>
    import { ref } from "vue";
    import { loc } from '../locale.js';
    import { theme_settings, createAllThemeDropdowns, getThemeVar, setThemeVar, updateTheme, setThemeToHTML } from '../themes.js';

    const t = ref(theme_settings);
    const s = ref(global.settings);
    const all_theme_drops=createAllThemeDropdowns('setParent');
    function setCurThemeVar(name){
        t.curThemeVar=name;
        let val=getThemeVar(name);
        if(val.includes('var')){
            let nval=val.match(/var\(([a-zA-Z-]+)\)/)[1];

            val=getComputedStyle(document.documentElement).getPropertyValue(nval).trim();
        }
        if(val.length==4){
            val=`#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`;
        }
        t.curThemeColor=val;
    }
    function setCurThemeFromOther(name){
        t.curSetFromVar=name;
        let val=getThemeVar(name);
        if(val==broke_color){return;};
        setThemeVar(name,val);
    }
    function changeThemeColor(is_temp){
        if(!is_temp){
            let pastColor=getThemeVar(t.curThemeVar);
            let theme_name=global.settings.theme;
            if(!t.changed.hasOwnProperty(theme_name)){
                t.changed[theme_name]={};
            }
            if(t.changed[theme_name].hasOwnProperty(t.curThemeVar)){
                t.changed[theme_name][t.curThemeVar].push(pastColor);
            }
            else{
                t.changed[theme_name][t.curThemeVar]=[pastColor];
            }
        }
        setThemeVar(t.curThemeVar,t.curThemeColor,is_temp ? 'dom' : 'both');
    }
    function undoThemeColorChange(t){
        let var_changed=t.changed[global.settings.theme][t.curThemeVar];
        if(var_changed.length==0){
            return;
        }
        let last=var_changed.pop();
        setThemeVar(t.curThemeVar,last);
        t.curThemeColor=last;
    }

    function startDrag(e){
        t.move=true;
        t.mpos={
            x:e.clientX,
            y:e.clientY,
        };
    }
    function onDrag(e){
        if(!t.move){
            return;
        }
        let npos={
            x:e.clientX,
            y:e.clientY
        };
        let deltaX=npos.x - t.mpos.x, deltaY=npos.y - t.mpos.y;
        t.pos.x+=deltaX;
        t.pos.y+=deltaY;
        t.mpos=npos;
    }
    function endDrag(){
        t.move=false;
    }

    function label(lbl){
        return loc(lbl);
    }
    function setParent(nm,set_none){
        let theme_name=global.settings.theme;
        if(theme_name==nm)return;

        themes[global.settings.theme].parent=[nm];
        theme_settings.curParent=nm;
        updateTheme(theme_name);
        setThemeToHTML(theme_name,set_none);
    }
    function isCustom(){
        return global.settings.theme.includes('custom');
    }

    function dangerousResetEnabled(){
        return t.isResetOpen;
    }
    function resetTheme(){
        console.log('reset');
        themes[global.settings.theme]={};
        updateTheme(global.settings.theme);
        set_theme(global.settings.theme);
    }
</script>

<template>
    <div id="themeColorPicker">
        <div class="themeColorPicker theme" v-if="t.themeEditorOpen" :style="{ top: (t.pos.y ?? 0) + 'px', left: (t.pos.x ?? 0) + 'px', position: 'absolute', 'zIndex':'999' }" @mousedown="startDrag($event)" @mousemove="onDrag($event)" @mouseup="endDrag()" @mouseleave="endDrag()">
            
            <h2 class="has-text-advanced">Theme Editor</h2>
            <div v-if="!isCustom()" class="themeWarning has-text-warning content">
                <br>
                <h4 class="has-text-danger">WARNING: This won't work!</h4>
                
                <div>You need to select one of the custom themes!</div>
            </div>
            <div v-if="isCustom()">
                <div>
                    <b-dropdown hoverable>
                        <template #trigger>
                            <button class="button is-primary">
                                <span>{{ label('theme_section_' + t.themeSection) }}</span>
                                <i class="fas fa-sort-down"></i>
                            </button>
                        </template>
                    {{ theme_section_sel }}
                    </b-dropdown>
                    {{ all_theme_sections }}
                </div>
                
                <b-input type="color" class="theme_color" id="theme_color" name="theme_color" v-model="t.curThemeColor" @input="changeThemeColor(true)" @change="changeThemeColor()"></b-input>

                <button class="button" @click="undoThemeColorChange()">Undo</button>
                
                <div style="display:flex;align-items:center;">
                    
                    <span>Set Parent:</span>
                    <b-dropdown hoverable>
                        <template #trigger>
                            <button class="button is-primary">
                                <span>{{ label(t.curParent) }}</span>
                                <i class="fas fa-sort-down"></i>
                            </button>
                        </template>
                        {{ all_theme_drops }}
                    </b-dropdown>
                </div>
                <div>
                    <b-switch class="setting" v-model="t.isResetOpen">
                        <span>{{ label('enable_theme_reset') }}</span>
                    </b-switch>
                    <div v-if="t.isResetOpen" style="display:flex;flex-direction:column;">

                        <span class="has-text-danger">{{ label('theme_reset_warn') }}</span>
                        <button class="button" @click="resetTheme()" style="width:50%;">{{ label('theme_reset') }}</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>