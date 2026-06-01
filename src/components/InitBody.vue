<script setup>
    import { ref } from "vue";
    
    import TopBar from './bodyElms/TopBar.vue';
    import CityTab from './bodyElms/CityTab.vue';
    import CivicsTab from './bodyElms/CivicsTab.vue';
    import ResearchTab from './bodyElms/ResearchTab.vue';
    import ResourceTab from './bodyElms/ResourceTab.vue';
    import ApraTab from './bodyElms/ApraTab.vue';
    import StatsTab from './bodyElms/StatsTab.vue';
    import SettingsTab from './bodyElms/SettingsTab.vue';
    import MessageQueue from './bodyElms/MessageQueue.vue';
    import SeasonHunt from './SeasonHunt.vue';

    import { global, message_filters, message_logs } from '../vars.js';
    import { loc } from '../locale';
    import { loadTab, tabLabel } from '../index.js';
    import { flib } from '../functions.js';

    /* For any viewers info! the hierarchy of comments is by follows:
        level 1 - \* ... *\ 
            these are the main "section headers"
        level 2 - \\
            these are like sub-sections
    */


    /* vBind Data */
    const s = ref(global.settings);
    const race = ref(global.race);
    const city = ref(global.city);
    
    /* vBind Methods */
    function swapTab(tab) {
        // CSS grid stacking handles tab height automatically
        if (!global.settings.tabLoad){
            loadTab(tab);
        }
        return tab;
    }
    
    function replicate(kw){
        if (global.race.hasOwnProperty('governor') && global.race.governor.hasOwnProperty('tasks') && global.race.hasOwnProperty('replicator') && Object.values(global.race.governor.tasks).includes('replicate') && global.race.governor.config.replicate.pow.on && global.race.replicator.pow > 0){
            return kw + global.race.replicator.pow;
        }
        return kw;
    }

    //Helper Functions!
    function approx(kw){
        return +(kw).toFixed(2);
    }
    function mRound(m){
        return +(m).toFixed(1);
    }

    function remove(index){
        global.r_queue.queue.splice(index,1);
    }
    function namecase(name){
        return name.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

    function label(lbl){
        return tabLabel(lbl);
    }
    /* Building Elements (v-html) */
    function msgQueueFilters(){
        let filters='';
        message_filters.forEach(function (filter){
            filters+=`
                <span id="msgQueueFilter-${filter}" class="${filter === 'all' ? 'is-active' : ''}" aria-disabled="${filter === 'all' ? 'true' : 'false'}" @click="swapFilter('${filter}')" v-show="s.${filter}.vis" role="button">${loc('message_log_' + filter)}</span>
            `;
        });
        return filters;
    }

</script>
<template>
    <top-bar />

    <div id="main" class="main">
        <div class="columns is-gapless">

            <div class="column is-one-quarter leftColumn">
                <div id="race" class="race colHeader">
                    
                    <h2 class="is-sr-only">Race Info</h2>
                    
                    <div class="name">{{ flib('name') }}</div>
                    
                    <div class="morale-contain">
                        <span id="morale" v-show="city.morale.current" class="morale">
                            {{ loc('morale') }}&nbsp;
                            <span class="has-text-warning">{{ mRound(city.morale.current) }}%</span>
                        </span>
                    </div>

                    <div class="power">
                        <span id="powerStatus" class="has-text-warning" v-show="city.powered">
                            <span>MW</span>&nbsp;
                            <span id="powerMeter" class="meter">{{ approx(replicate(city.power)) }}</span>
                        </span>
                    </div>
                </div>

                <div id="sideQueue">
                    <message-queue />
                </div>

                <div id="resources" class="resources vscroll">
                    <h2 class="is-sr-only">{{ loc('tab_resources') }}</h2>
                </div>
            </div>
            
            <div id="mainColumn" class="column is-three-quarters">
                <div class="content">
                    <h2 class="is-sr-only">Tab Navigation</h2>

                    <b-tabs id="mainTabs" v-model="s.civTabs" :animated="s.animated" @update:model-value="swapTab($event)">
                        
                        <b-tab-item class="tab-item sticky" :visible="s.showEvolve" :label="label('tab_evolve')">
                            <div id="evolution"></div>
                        </b-tab-item>

                        <city-tab />

                        <civics-tab />

                        <research-tab />

                        <resource-tab />

                        <apra-tab />

                        <stats-tab />

                        <settings-tab />

                        <b-tab-item disabled>
                            <template slot="header"></template>
                            <div id="mTabObserve"></div>
                        </b-tab-item>

                    </b-tabs>
                </div>
            </div>

            <div id="queueColumn" class="queueCol column"></div>

        </div>
    </div>

    <div id="mobileNav">
        <button class="mobile-nav-btn is-active" data-panel="resources">{{ loc('tab_resources') }}</button>

        <button class="mobile-nav-btn" data-panel="game">Game</button>

        <button class="mobile-nav-btn" data-panel="queue">Queue</button>
    </div>

    <div class="promoBar">
        <span class="left">
            <h1>
                <span class="has-text-warning">
                    Ev<season-hunt :event="'easter'" :num="15" :size="10" :inactive="'o'" />lve <!--  -->
                </span>
                by
                <span class="has-text-success">Demagorddon</span>
            </h1>
        </span>
        <span class="right">
            <h2 class="is-sr-only">External Links</h2>
            <ul class="external-links">
                <li><a href="wiki.html" target="_blank">Wiki</a></li>
                <li><a href="https://www.reddit.com/r/EvolveIdle/" target="_blank">Reddit</a></li>
                <li><a href="https://discord.gg/dcwdQEr" target="_blank">Discord</a></li>
                <li><a href="https://github.com/pmotschmann/Evolve" target="_blank">GitHub</a></li>
                <li><a href="https://www.patreon.com/demagorddon" target="_blank">Patreon</a></li>
                <li><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=PTRJZBW9J662C&currency_code=USD&source=url" target="_blank">Donate</a></li>
            </ul>
        </span>
    </div>
</template>