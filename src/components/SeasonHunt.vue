<script setup>
    import { trickOrTreat, easterEgg } from '../functions.js';
    import { ref, onMounted } from "vue";
    const { event, num, trick, size, typer } = defineProps({
        event: { type: String },
        num: { type: Number },
        trick: {type: Boolean, default: false },
        size: { type: Number },
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
    });
</script>

<template>
    <b-dropdown-item v-if="typer == 'dropdown-item' && is_active" v-html="val" />
    <span v-if="typer == 'span' && is_active" v-html="val"></span>
</template>