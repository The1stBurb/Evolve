<script setup>
    import { ref } from "vue";
    import TopBar from './TopBar.vue';
    import SettingsTab from './SettingsTab.vue';

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
    const s=ref(global.settings);
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

                        <b-tab-item :visible="s.showCiv" :label="label('tab_civil')">
                            <div id="mTabCivil"></div>
                        </b-tab-item>

                        <b-tab-item :visible="s.showCivic" :label="label('tab_civics')">
                            <div id="mTabCivic"></div>
                        </b-tab-item>

                        <b-tab-item :visible="s.showResearch" :label="label('tab_research')">
                            <div id="mTabResearch"></div>
                        </b-tab-item>

                        <b-tab-item :visible="s.showResources" :label="label('tab_resources')">
                            <div id="mTabResource"></div>
                        </b-tab-item>

                        <b-tab-item :visible="s.showGenetics" :label="label('tech_arpa')">
                            <div id="mTabArpa"></div>
                        </b-tab-item>

                        <b-tab-item :visible="s.showAchieve" :label="label('tab_stats')">
                            <div id="mTabStats"></div>
                        </b-tab-item>

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

    <!-- <div id="mobileNav">
        <button class="mobile-nav-btn is-active" data-panel="resources">{{ loc('tab_resources') }}</button>

        <button class="mobile-nav-btn" data-panel="game">Game</button>

        <button class="mobile-nav-btn" data-panel="queue">Queue</button>
    </div> -->
</template>