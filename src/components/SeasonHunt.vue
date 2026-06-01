<script setup>
    import { ref, onMounted } from "vue";

    import { global } from '../vars.js';
    import { trickOrTreat, easterEgg } from '../functions.js';

    const { event, num, trick, size, typer } = defineProps({
        event: { type: String, required: true },
        num: { type: Number, required: true },
        trick: {type: Boolean, default: false },
        size: { type: Number, required: true },
        typer: {type: String, default: 'span' },
    });
    
    const is_active = ref(false);
    const val=ref('');
    const has_updated=ref(false);

    function getIcon(){
        val.value='';
        switch(event){
            case 'halloween':
                val.value=trickOrTreat(num,size,trick);
            break;
            case 'easter':
                val.value=easterEgg(num,size);
            break;
        }

        if(val.value){
            return true;
        }
        else{
            return false;
        }
    }

    onMounted(()=>{
        is_active.value = getIcon();
        console.log(event,num,trick,size,typer, is_active.value, global.settings.boring);
    });

    function isSeen(type){
        return typer == type && is_active && !global.settings.boring;
    }
</script>

<template>
    <b-dropdown-item v-if="typer == 'dropdown-item'" v-show="!global.settings.boring && is_active" v-html="val" />
    <span v-if="typer == 'span'" v-show="!global.settings.boring && is_active" v-html="val"></span>
</template>