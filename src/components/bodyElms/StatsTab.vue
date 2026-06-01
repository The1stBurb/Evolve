<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showAchieve" :label="tabLabel('tab_stats')">
        <div id="mTabStats"></div>
    </b-tab-item>
</template>