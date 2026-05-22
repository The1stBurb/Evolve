<script setup>
    import { trickOrTreat } from '../functions.js';
    import { ref } from "vue";
    defineProps({
        event: { type: String },
        num: { type: Number },
        trick: {type: Boolean, default: false },
        size: { type: Number },
        typer: {type: String },
        // silly: {type: Number, deful },
    });
    const is_active = ref(false);
    const val=ref('');
    function getIcon(){
        val.value='';
        console.log(event)
        switch(event){
            case 'halloween':
                val.value=trickOrTreat(num,size,trick);
            break;
        }
        console.log(val.value);
        if(val.value){
            is_active.value=true;
        }
        else{
            is_active.value=false;
        }
        is_active.value=true;
        return val.value;
    }
    //{{ silly }}getIcon()
</script>

<template>
    <!-- <b-dropdown-item> -->
    <span> {{ val }}|{{ is_active }}|</span>
    <span v-if="is_active && typer == 'dropdown_item'">{{ 0 }}</span>
    <!-- </b-dropdown-item> -->
</template>