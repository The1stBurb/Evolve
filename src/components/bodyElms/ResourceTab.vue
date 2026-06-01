<script setup>
    import { ref } from "vue";

    import { global } from '../../vars.js';
    import { tabLabel } from '../../index.js';
    let s = ref(global.settings);
</script>
<template>
    <b-tab-item :visible="s.showResources" :label="tabLabel('tab_resources')">
        <div id="mTabResource"></div>
    </b-tab-item>
</template>