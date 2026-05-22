<script setup>
    import { trickOrTreat } from '../functions.js';
    import { ref, onMounted } from "vue";
    const { event, num, trick, size, typer } = defineProps({
        event: { type: String },
        num: { type: Number },
        trick: {type: Boolean, default: false },
        size: { type: Number },
        typer: {type: String }
    });
    const container=ref(null);
    
    const is_active = ref(false);
    const val=ref('');
    const has_updated=ref(false);

    function getIcon(){
        if(has_updated.value){
            console.log('has updated already!');
            return '';
        }
        // console.log('getIconOpened?')
        val.value='';
        // console.log(event)
        switch(event){
            case 'halloween':
                // console.log('did work?')
                val.value=trickOrTreat(num,size,trick);
            break;
        }
        // console.log(val.value,event,num,trick,size,typer,silly);

        has_updated.value=true;
        // console.log('value: ',val.value)
        if(val.value){
            // is_active.value=true;
            return true;
        }
        else{
            return false;
            // is_active.value=false;
        }
        // is_active.value=true;
        // console.log('next event != update!')
        // has_updated=true;
        // return true;
    }

    onMounted(()=>{
        is_active.value = getIcon();
        container.value.innerHTML=val.value;
    });
</script>

<template>
    <b-dropdown-item v-if="typer == 'dropdown_item'">
        <span ref="container"></span>
    </b-dropdown-item>
    <!-- <span v-if="getIcon() && typer == 'dropdown_item'"> {{ val }}</span> -->
</template>