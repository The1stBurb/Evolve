<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showCiv" :label="tabLabel('tab_civil')">
        <div id="mTabCivil"></div>
    </b-tab-item>
</template>