<script setup>
    import {ref} from "vue";
    import { loc } from '../locale.js';
    defineProps({
        extraDat: { type: String, default: ''},
        mainLabel: { type: String, required: true},
        itemLabel: { type: Object, required: true},
        itemClick: {type: Object, required: true},
    });
    let drops='';
    for(let i=0; i<itemLabel.length; i++){
        drops+=`<b-dropdown-item @click="${itemClick[i]}">{{ ${itemLabel[i]} }}</b-dropdown-item>`
    }
</script>
<template>
    <b-dropdown  aria-role="list">
        <template #trigger="{ active }">
            <b-button :label="{{ mainLabel }}" type="is-info"/>
        </template>
        {{ drops }}
        {{ extraDat }}
    </b-dropdown>
</template>

<!-- <BetterDropdown :mainLabel="notation(s.affix)" :itemLabel="[loc('metric'), loc('scientific'), loc('engineering'), loc('sln)]" :itemClick="[numNotation('si'), numNotation('sci'), numNotation('eng'), numNotation('sln')]"/> -->