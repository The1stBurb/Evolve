<script setup>
    import { ref } from 'vue';

    import { global } from '../vars.js';
    import { loc } from '../locale.js';
    import { tabLabel } from '../index.js';

    
    function swapCivilTab(tab){
        global.settings.spaceTabs = tab;
        if (!global.settings.tabLoad){
            if (global.spaceTabClearTimeout)
                clearTimeout(global.spaceTabClearTimeout);

            let tabs = [
                "city",
                "space",
                "interstellar",
                "galaxy",
                "portal",
                "outerSol",
                "tauCeti",
                "eden",
            ];

            let incoming = tabs[tab];
            clearElement($(`#${incoming}`));
            tabs.splice(tab, 1);

            global.spaceTabClearTimeout = setTimeout(() => {
                tabs.forEach((t) => clearElement($(`#${t}`)));
            }, 350);

            switch (tab){
                case 0:
                    drawCity();
                    break;
                case 1:
                case 2:
                case 3:
                case 5:
                    renderSpace();
                    break;
                case 4:
                    renderFortress();
                    break;
                case 6:
                    renderTauCeti();
                    break;
                case 7:
                    renderEdenic();
                    break;
            }
        }
        return tab;
    }
    function label(lbl){
        return tabLabel(lbl);
    }
</script>
<template>
    <!-- Civilization Tab -->
    <b-tabs class="resTabs" v-model="s.spaceTabs" :animated="s.animated" @update:model-value="swapCivilTab($event)">
        <b-tab-item id="city" :visible="s.showCity" :label="label('city')"></b-tab-item>
        <b-tab-item id="space" :visible="s.showSpace" :label="label('local_space')"></b-tab-item>
        <b-tab-item id="interstellar" :visible="s.showDeep" :label="label('tab_interstellar')"></b-tab-item>
        <b-tab-item id="galaxy" :visible="s.showGalactic" :label="label('tab_galactic')"></b-tab-item>
        <b-tab-item id="portal" :visible="s.showPortal" :label="label('tab_portal')"></b-tab-item>
        <b-tab-item id="outerSol" :visible="s.showOuter" :label="label('outer_local_space')"></b-tab-item>
        <b-tab-item id="tauceti" :visible="s.showTau" :label="label('tab_tauceti')"></b-tab-item>
        <b-tab-item id="eden" :visible="s.showEden" :label="label('tab_eden')"></b-tab-item>
    </b-tabs>
</template>