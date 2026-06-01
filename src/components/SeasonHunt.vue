<script setup>
    import { ref, onMounted } from "vue";

    import { global } from '../vars.js';
    import { trickOrTreat, easterEgg, messageQueue } from '../functions.js';
    import { loc } from '../locale.js';

    const { event, num, trick, size, typer, inactive } = defineProps({
        event: { type: String, required: true },
        num: { type: Number, required: true },
        trick: {type: Boolean, default: false },
        size: { type: Number, default: 16 },
        typer: {type: String, default: 'span' },
        inactive : {type: String, default: ''},
    });
    
    const is_active = ref(false);
    const val=ref('');
    const has_updated=ref(false);
    let icon='';

    function getIcon(){
        icon='';
        switch(event){
            case 'halloween':
                icon=trickOrTreat(num,size,trick);
            break;
            case 'easter':
                icon=easterEgg(num,size);
            break;
        }
        
        if(icon){
            return true;
        }
        else{
            return false;
        }
    }

    onMounted(()=>{
        is_active.value = getIcon();
        console.log(event,num,trick,size,typer,inactive, inactive != '', is_active.value, global.settings.boring);
        // val.value=htmlBuilder();
        val.value=icon;
    });

    function htmlBuilder(){
        let data='';
        if(!is_active.value){
            if(inactive.value != ''){
                return '{{ inactive }}';
            }
            else{
                return '';
            }
        }
        if(typer == 'dropdown-item'){
            data=`<b-dropdown-item ${isSeen('dropdown-item')} />`;
        }
        else if(typer == 'span'){
            data=`<span ${isSeen('span')} />`;
        }
        else{
            data=`<span class="has-text-danger">WARNING: A Season Hunt component was created with type '${typer}' which is not a valid type!</span>`;
        }
        return data;
    }

    function isSeen(type){
        return !global.settings.boring && is_active.value;
        // return `v-if="typer == '${type}'" v-show="is_active && !global.settings.boring" v-html="val"`;
    }

    function onFound(){
        is_active.value=false;

        const date = new Date();
        const year = date.getFullYear();
        let id=num.value;
        let prest='', msg=['',''], count=0, get_stuff=false;
        if(event == 'halloween'){
            let tot = trick ? 'trick' : 'treat';
            if (!global.special.trick[year][`${tot}${id}`]){
                global.special.trick[year][`${tot}${id}`] = true;

                get_stuff=true;
                if (trick){
                    prest='Phage';
                    msg=['Phage','ghost'];
                    count=2;
                }
                else {
                    msg[1]='trick';
                    count=12;
                    if (global.race.universe === 'antimatter'){
                        prest='AntiPlasmid';
                        msg[0]='AntiPlamsid_plural';
                    }
                    else {
                        prest='Plasmid';
                        msg[0]='Plamsid_plural';
                    }
                }
                setTimeout(function(){
                    if (num === 1 && trick){
                        $('.popper').hide();
                    }
                }, 250);
            }
        }
        else if(event == 'easter'){
            msg[1]='egg';
            if (!global.special.egg[year][`egg${id}`]){
                global.special.egg[year][`egg${id}`] = true;

                get_stuff=true;
                if (id <= 12){
                    count=9;
                    if (global.race.universe === 'antimatter'){
                        prest='AntiPlasmid';
                        msg[0]='AntiPlasmid_plural';
                    }
                    else {
                        prest='Plasmid';
                        msg[0]='Plasmid_plural';
                    }
                }
                else {
                    count=4;
                    prest='Phage';
                    msg[0]='Phage';
                }
                $('.popper').hide();
            }
        }
        if(get_stuff){
            global.prestige[prest].count += 2;
            global.stats[prest  .toLowerCase()] += 2;
            messageQueue(loc(`city_${msg[1]}_msg`,[2,loc(`resource_${msg[0]}_name`)]),'success',false,['events']);
        }
    }
</script>

<template>
    <b-dropdown-item v-if="typer == 'dropdown-item'" v-show="!global.settings.boring && is_active" v-html="val" @click="onFound"/>
    <b-dropdown-item v-if="typer == 'dropdown-item' && inactive != ''" v-show="global.settings.boring || !is_active" v-html="inactive" @click="onFound"/>

    <span v-if="typer == 'span'" v-show="!global.settings.boring && is_active" v-html="val" @click="onFound"/>
    <span v-if="typer == 'span' && inactive != ''" v-show="global.settings.boring || !is_active" v-html="inactive" @click="onFound"/>
</template>