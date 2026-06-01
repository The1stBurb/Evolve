<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showCivic" :label="tabLabel('tab_civics')">
        <div id="mTabCivic"></div>
    </b-tab-item>
</template>