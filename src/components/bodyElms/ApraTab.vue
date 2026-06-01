<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showGenetics" :label="tabLabel('tech_arpa')">
        <div id="mTabArpa"></div>
    </b-tab-item>
</template>