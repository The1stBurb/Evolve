<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showResearch" :label="tabLabel('tab_research')">
        <div id="mTabResearch"></div>
    </b-tab-item>
</template>