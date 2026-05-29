<script setup>
    import { drawIcon } from '../functions.js';
    import { alevel } from '../achieve.js';

    const { icon, size, rank } = defineProps({
        icon: {type: String, default: 'default'},
        size: {type: Number, default: 16},
        rank: {type: Number, default: () => (alevel() < 2 ? 2 : alevel())},
    });

    function getRank(){
        let irank = alevel();
        if (irank < 2){ irank = 2; }
        return irank;
    }
    function getIcon(){
        return drawIcon(icon == 'defualt' ? global.settings.icon : icon, size, rank);
    }
</script>
<template>
    <span v-html="getIcon()"></span>
</template>