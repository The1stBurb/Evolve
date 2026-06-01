import { global, tmp_vars, save, message_logs, message_filters, webWorker } from './vars.js';
import { loc, locales, updateHtmlLang } from './locale.js';
import { setupStats, alevel } from './achieve.js';
import { vBind, initMessageQueue, clearElement, flib, tagEvent, gameLoop, popover, clearPopper, powerGrid, easterEgg, trickOrTreat, drawIcon } from './functions.js';
import { initResourceTabs, drawResourceTab, tradeSummary } from './resources.js';
import { defineJobs, } from './jobs.js';
import { clearSpyopDrag } from './governor.js';
import { defineIndustry, setPowerGrid, gridDefs, clearGrids } from './industry.js';
import { defineGovernment, defineGarrison, buildGarrison, commisionGarrison, foreignGov } from './civics.js';
import { races, shapeShift, renderPsychicPowers, renderSupernatural } from './races.js';
import { drawEvolution, drawCity, drawTech, resQueue, clearResDrag, closeModalAnim } from './actions.js';
import { renderSpace, ascendLab, terraformLab } from './space.js';
import { renderFortress, buildFortress, drawMechLab, clearMechDrag, drawHellObservations } from './portal.js';
import { renderEdenic } from './edenic.js';
import { drawShipYard, clearShipDrag, renderTauCeti } from './truepath.js';
import { arpa, clearGeneticsDrag } from './arpa.js';
import { themes, set_theme, theme_settings, loadCustomThemeHTML, createAllThemeDropdowns, setThemeToHTML, loadThemeEditorDat, importTheme, getThemeSaveData, getThemeTitle } from './themes.js';

// import SeasonHunt from './components/SeasonHunt.vue';
// import SettingsTab from './components/SettingsTab.vue';
// import TopBar from './components/TopBar.vue';
import InitBody from './components/InitBody.vue';

export function mainVue(){
    vBind({
        el: '#mainColumn div.content',
        data: {
            s: global.settings,
            t: theme_settings,
        },
        methods: {
            remove(index){
                global.r_queue.queue.splice(index,1);
            },
            namecase(name){
                return name.replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                });
            },
        },
        components:{ InitBody, },
    });

    ['1','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'].forEach(function(k){
        popover(`settings${k}`, function(){
                return loc(`settings${k}`);
            },
            {
                elm: `#settings span.settings${k}`
            }
        );
    });

    let example = `<div class="example">{
  "year": "Galactic Standard Year",
  "resource_Food_name": "Nom Noms"
}</div>`;

    popover(`stringPack`, function(){
            return loc(`string_example`,[example]);
        }
    );
}

export function tabLabel(lbl){
    switch (lbl){
        case 'city':
            if (global.resource[global.race.species]){
                if (global.resource[global.race.species].amount <= 5){
                    return loc('tab_city1');
                }
                else if (global.resource[global.race.species].amount <= 20){
                    return loc('tab_city2');
                }
                else if (global.resource[global.race.species].amount <= 75){
                    return loc('tab_city3');
                }
                else if (global.resource[global.race.species].amount <= 250){
                    return loc('tab_city4');
                }
                else if (global.resource[global.race.species].amount <= 600){
                    return loc('tab_city5');
                }
                else if (global.resource[global.race.species].amount <= 1200){
                    return loc('tab_city6');
                }
                else if (global.resource[global.race.species].amount <= 2500){
                    return loc('tab_city7');
                }
                else {
                    return loc('tab_city8');
                }
            }
            else {
                return loc('tab_city1');
            }
        case 'local_space':
            return loc('sol_system',[global.race['truepath'] ? races[global.race.species].home : flib('name')]);
        case 'outer_local_space':
            return loc('outer_sol_system',[global.race['truepath'] ? races[global.race.species].home : flib('name')])
        case 'old':
            return loc('tab_old_res');
        case 'new':
            return loc('tab_new_res');
        case 'old_sr':
            return loc('tab_old_sr_res');
        case 'new_sr':
            return loc('tab_new_sr_res');
        case 'tab_mech':
            return global.race['warlord'] ? loc('tab_artificer')  : loc(lbl);
        default:
            return loc(lbl);
    }
}

export function initTabs() {
    if (global.settings.tabLoad) {
        if (global.race.species === 'protoplasm') {
            drawEvolution();
        }
        loadTab(`mTabCivil`);
        loadTab(`mTabCivic`);
        loadTab(`mTabResearch`);
        loadTab(`mTabResource`);
        loadTab(`mTabArpa`);
        loadTab(`mTabStats`);
        loadTab(`mTabObserve`);
    } else {
        loadTab(global.settings.civTabs);
    }
}

export function loadTab(tab){
    if (!global.settings.tabLoad) {
        clearResDrag();
        clearGrids();
        clearMechDrag();
        clearGeneticsDrag();
        clearSpyopDrag();
        clearShipDrag();
        if (global.tabClearTimeout) {
            clearTimeout(global.tabClearTimeout);
        }
        let tabsToClear = [
            `mTabCivil`,
            `mTabCivic`,
            `mTabResearch`,
            `mTabResource`,
            `mTabArpa`,
            `mTabStats`,
            `mTabObserve`,
        ];
        // identify the incoming tab so we can clear it immediately
        // and delay clearing all others to allow the outgoing animation to finish
        let incoming = 'mTabObserve';
        switch (tab) {
            case 1:
            case 'mTabCivil':
                incoming = 'mTabCivil';
                break;
            case 2:
            case 'mTabCivic':
                incoming = 'mTabCivic';
                break;
            case 3:
            case 'mTabResearch':
                incoming = 'mTabResearch';
                break;
            case 4:
            case 'mTabResource':
                incoming = 'mTabResource';
                break;
            case 5:
            case 'mTabArpa':
                incoming = 'mTabArpa';
                break;
            case 6:
            case 'mTabStats':
                incoming = 'mTabStats';
                break;
        }

        // clear incoming tab immediately so old Vue apps don't block re-mount
        clearElement($(`#${incoming}`));
        tabsToClear.splice(tabsToClear.indexOf(incoming), 1);
        global.tabClearTimeout = setTimeout(() => {
            tabsToClear.forEach((t) => clearElement($(`#${t}`)));
        }, 350);
    } else {
        tagEvent('page_view', { page_title: `Evolve - All Tabs` });
    }
    switch (tab){
        case 0:
        case 'evolution':
            if (!global.settings.tabLoad) {
                global.settings.civTabs = 0;
                tagEvent('page_view', { page_title: `Evolve - Evolution` });
                drawEvolution();
            }
            break;
        case 1:
        case 'mTabCivil':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Civilization` });
                }
                $(`#mTabCivil`).append(`<b-tabs class="resTabs" v-model="s.spaceTabs" :animated="s.animated" @update:model-value="swapTab($event)">
                    <b-tab-item id="city" :visible="s.showCity" :label="label('city')"></b-tab-item>
                    <b-tab-item id="space" :visible="s.showSpace" :label="label('local_space')"></b-tab-item>
                    <b-tab-item id="interstellar" :visible="s.showDeep" :label="label('tab_interstellar')"></b-tab-item>
                    <b-tab-item id="galaxy" :visible="s.showGalactic" :label="label('tab_galactic')"></b-tab-item>
                    <b-tab-item id="portal" :visible="s.showPortal" :label="label('tab_portal')"></b-tab-item>
                    <b-tab-item id="outerSol" :visible="s.showOuter" :label="label('outer_local_space')"></b-tab-item>
                    <b-tab-item id="tauceti" :visible="s.showTau" :label="label('tab_tauceti')"></b-tab-item>
                    <b-tab-item id="eden" :visible="s.showEden" :label="label('tab_eden')"></b-tab-item>
                </b-tabs>`);
                vBind({
                    el: `#mTabCivil`,
                    data: {
                        s: global.settings
                    },
                    methods: {
                        swapTab(tab){
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
                        },
                        label(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });
                if (global.race.species !== 'protoplasm'){
                    drawCity();
                    renderSpace();
                    renderFortress();
                    renderTauCeti();
                    renderEdenic();
                }
                if (global.race['noexport']){
                    if (global.race['noexport'] === 'Race'){
                        clearElement($(`#city`));
                        ascendLab();
                    }
                    else if (global.race['noexport'] === 'Hybrid'){
                        clearElement($(`#city`));
                        ascendLab(true);
                    }
                    else if (global.race['noexport'] === 'Planet'){
                        clearElement($(`#city`));
                        terraformLab();
                    }
                }
            }
            break;
        case 2:
        case 'mTabCivic':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Civics` });
                }
                $(`#mTabCivic`).append(`<b-tabs class="resTabs" v-model="s.govTabs" :animated="s.animated" @update:model-value="swapTab(s.govTabs)">
                    <b-tab-item id="civic" :label="label('tab_gov')"></b-tab-item>
                    <b-tab-item id="industry" class="industryTab" :visible="s.showIndustry" :label="label('tab_industry')"></b-tab-item>
                    <b-tab-item id="powerGrid" class="powerGridTab" :visible="s.showPowerGrid" :label="label('tab_power_grid')"></b-tab-item>
                    <b-tab-item id="military" class="militaryTab" :visible="s.showMil" :label="label('tab_military')"></b-tab-item>
                    <b-tab-item id="mechLab" class="mechTab" :visible="s.showMechLab" :label="label('tab_mech')"></b-tab-item>
                    <b-tab-item id="dwarfShipYard" class="ShipYardTab" :visible="s.showShipYard" :label="label('tab_shipyard')"></b-tab-item>
                    <b-tab-item id="psychicPowers" class="psychicTab" :visible="s.showPsychic" :label="label('tab_psychic')"></b-tab-item>
                    <b-tab-item id="supernatural" class="supernaturalTab" :visible="s.showWish" :label="label('tab_supernatural')"></b-tab-item>
                </b-tabs>`);
                vBind({
                    el: `#mTabCivic`,
                    data: {
                        s: global.settings
                    },
                    methods: {
                        swapTab(tab){
                            if (!global.settings.tabLoad){
                                clearGrids();
                                clearSpyopDrag();
                                clearMechDrag();
                                clearShipDrag();

                                if (global.civicTabClearTimeout)
                                    clearTimeout(global.civicTabClearTimeout);

                                let tabs = [
                                    "civic",
                                    "industry",
                                    "powerGrid",
                                    "military",
                                    "mechLab",
                                    "dwarfShipYard",
                                    "psychicPowers",
                                    "supernatural",
                                ];

                                let incoming = tabs[tab];
                                clearElement($(`#${incoming}`));
                                tabs.splice(tab, 1);

                                global.civicTabClearTimeout = setTimeout(() => {
                                    tabs.forEach((t) => clearElement($(`#${t}`)));
                                }, 350);

                                switch (tab){
                                    case 0:
                                        {
                                            $('#civic').append($('<div id="civics" class="tile is-parent"></div>'));
                                            defineJobs();
                                            $('#civics').append($('<div id="r_civics" class="tile is-vertical is-parent civics"></div>'));
                                            defineGovernment();
                                            if (global.race.species !== 'protoplasm' && !global.race['start_cataclysm']){
                                                commisionGarrison();
                                                buildGarrison($('#c_garrison'),false);
                                                foreignGov();
                                            }
                                            if (global.race['shapeshifter']){
                                                shapeShift(false,true);
                                            }
                                        }
                                        break;
                                    case 1:
                                        defineIndustry();
                                        break;
                                    case 2:
                                        {
                                            Object.keys(gridDefs()).forEach(function(gridtype){
                                                powerGrid(gridtype);
                                            });
                                            setPowerGrid();
                                        }
                                        break;
                                    case 3:
                                        if (global.race.species !== 'protoplasm' && !global.race['start_cataclysm']){
                                            defineGarrison();
                                            if (!global.race['warlord']){
                                                buildFortress($('#fortress'),false);
                                            }
                                        }
                                        break;
                                    case 4:
                                        if (global.race.species !== 'protoplasm' && !global.race['start_cataclysm']){
                                            drawMechLab();
                                        }
                                        break;
                                    case 5:
                                        if (global.race['truepath'] && global.race.species !== 'protoplasm' && !global.race['start_cataclysm']){
                                            drawShipYard();
                                        }
                                        break;
                                    case 6:
                                        if (global.race['psychic'] && global.tech['psychic'] && global.race.species !== 'protoplasm'){
                                            renderPsychicPowers();
                                        }
                                        break;
                                    case 7:
                                        if (((global.race['wish'] && global.tech['wish']) || global.race['ocular_power']) && global.race.species !== 'protoplasm'){
                                            renderSupernatural();
                                        }
                                        break;
                                }
                            }
                            return tab;
                        },
                        label(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });

                Object.keys(gridDefs()).forEach(function(gridtype){
                    powerGrid(gridtype);
                });
                setPowerGrid();

                $('#civic').append($('<div id="civics" class="tile is-parent"></div>'));
                defineJobs();
                $('#civics').append($('<div id="r_civics" class="tile is-vertical is-parent civics"></div>'));
                defineGovernment();
                if (global.race.species !== 'protoplasm' && !global.race['start_cataclysm']){
                    defineGarrison();
                    buildGarrison($('#c_garrison'),false);
                    if (!global.race['warlord']){
                        buildFortress($('#fortress'),false);
                    }
                    foreignGov();
                    drawMechLab();
                    if (global.race['truepath']){
                        drawShipYard();
                    }
                    if (global.race['psychic'] && global.tech['psychic']){
                        renderPsychicPowers();
                    }
                    if ((global.race['wish'] && global.tech['wish']) || global.race['ocular_power']){
                        renderSupernatural();
                    }
                }
                if (global.race['shapeshifter']){
                    shapeShift(false,true);
                }
                defineIndustry();
            }
            break;
        case 3:
        case 'mTabResearch':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Research` });
                }
                let queue_and_tabs = $(`<div id="resQueue" class="resQueue" v-show="rq.display"></div><div id="resContent"><b-tabs class="resTabs" v-model="s.resTabs" :animated="s.animated">
                    <b-tab-item id="tech" :label="label_f('new')"></b-tab-item>
                    <b-tab-item id="oldTech" :label="label_f('old')"></b-tab-item>
                </b-tabs></div>`);
                $(`#mTabResearch`).append(queue_and_tabs);
                vBind({
                    el: `#resContent`,
                    data: {
                        s: global.settings,
                        rq: global.r_queue
                    },
                    methods: {
                        label_f(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });
                resQueue();
                if (global.race.species !== 'protoplasm'){
                    drawTech();
                }
            }
            break;
        case 4:
        case 'mTabResource':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Resources` });
                }
                $(`#mTabResource`).append(`<b-tabs class="resTabs" v-model="s.marketTabs" :animated="s.animated" @update:model-value="swapTab(s.marketTabs)">
                    <b-tab-item id="market" :visible="s.showMarket" :label="label('tab_market')"></b-tab-item>
                    <b-tab-item id="resStorage" :visible="s.showStorage" :label="label('tab_storage')"></b-tab-item>
                    <b-tab-item id="resEjector" :visible="s.showEjector" :label="label('tab_ejector')"></b-tab-item>
                    <b-tab-item id="resCargo" :visible="s.showCargo" :label="label('tab_cargo')"></b-tab-item>
                    <b-tab-item id="resAlchemy" :visible="s.showAlchemy" :label="label('tab_alchemy')"></b-tab-item>
                </b-tabs>`);
                vBind({
                    el: `#mTabResource`,
                    data: {
                        s: global.settings
                    },
                    methods: {
                        swapTab(tab) {
                            if (!global.settings.tabLoad) {
                                // clear and redraw each tab on demand with preload off
                                if (global.resTabClearTimeout) clearTimeout(global.resTabClearTimeout);

                                let tabs = ['market', 'resStorage', 'resEjector', 'resCargo', 'resAlchemy'];
                                tabs.splice(tab, 1);
                                global.resTabClearTimeout = setTimeout(() => {
                                    tabs.forEach(t => clearElement($(`#${t}`)));
                                }, 350);

                                const tabMap = ['market', 'storage', 'ejector', 'supply', 'alchemy'];
                                const tabName = tabMap[tab];
                                if (tabName) {
                                    drawResourceTab(tabName);
                                }
                            }
                            // do nothing for preload on, Vue will handle display with v-show
                            return tab;
                        },
                        label(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });

                initResourceTabs();
                tradeSummary();
            }
            break;
        case 5:
        case 'mTabArpa':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Arpa` });
                }
                $(`#mTabArpa`).append(`<div id="apra" class="arpa">
                    <b-tabs class="resTabs" v-model="s.arpa.arpaTabs" :animated="s.animated">
                        <b-tab-item id="arpaPhysics" :visible="s.arpa.physics" label="${loc('tab_arpa_projects')}"></b-tab-item>
                        <b-tab-item id="arpaGenetics" :visible="s.arpa.genetics" label="${loc(global.race['artifical'] ? 'tab_arpa_machine' : 'tab_arpa_genetics')}"></b-tab-item>
                        <b-tab-item id="arpaCrispr" :visible="s.arpa.crispr" label="${loc('tab_arpa_crispr')}"></b-tab-item>
                        <b-tab-item id="arpaBlood" :visible="s.arpa.blood" label="${loc('tab_arpa_blood')}"></b-tab-item>
                    </b-tabs>
                </div>`);
                vBind({
                    el: `#mTabArpa`,
                    data: {
                        s: global.settings
                    },
                    methods: {
                        label(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });
                arpa('Physics');
                arpa('Genetics');
                arpa('Crispr');
                arpa('Blood');
            }
            break;
        case 6:
        case 'mTabStats':
            {
                if (!global.settings.tabLoad){
                    tagEvent('page_view',{ page_title: `Evolve - Stats` });
                }
                $(`#mTabStats`).append(`<b-tabs class="resTabs" v-model="s.statsTabs" :animated="s.animated">
                    <b-tab-item id="stats" :label="label('tab_stats')"></b-tab-item>
                    <b-tab-item id="achieve" :label="label('tab_achieve')"></b-tab-item>
                    <b-tab-item id="perks" :label="label('tab_perks')"></b-tab-item>
                </b-tabs>`);
                vBind({
                    el: `#mTabStats`,
                    data: {
                        s: global.settings
                    },
                    methods: {
                        label(lbl){
                            return tabLabel(lbl);
                        }
                    }
                });
                setupStats();
            }
            break;
        case 7:
            if (!global.settings.tabLoad){
                tagEvent('page_view',{ page_title: `Evolve - Settings` });
            }
            break;
        case 'mTabObserve':
        default:
            if (!global.settings.tabLoad){
                tagEvent('page_view',{ page_title: `Evolve - Hell Observation` });
            }
            if (global.portal.observe){
                drawHellObservations(true);
            }
            break;
    }
    if ($(`#popper`).length > 0 && $(`#${$(`#popper`).data('id')}`).length === 0){
        clearPopper();
    }
}

export function index(){
    clearElement($('body'));

    $('html').addClass(global.settings.font);
    $('body').append(`<init-body />`)
    vBind({
        el: 'body',
        components: { InitBody },
    });
    // Top Bar
    // $('body').append(`<top-bar />`);
    // vBind({
    //     el: 'body',
    //     components: {
    //         TopBar, 
    //     },
    // });

    // let main = $(`<div id="main" class="main"></div>`);
    // let columns = $(`<div class="columns is-gapless"></div>`);
    // $('body').append(main);
    // main.append(columns);

    // Left Column
    // columns.append(`<div class="column is-one-quarter leftColumn">
    //     <div id="race" class="race colHeader">
    //         <h2 class="is-sr-only">Race Info</h2>
    //         <div class="name">{{ name() }}</div>
    //         <div class="morale-contain"><span id="morale" v-show="city.morale.current" class="morale">${loc('morale')} <span class="has-text-warning">{{ mRound(city.morale.current) }}%</span></div>
    //         <div class="power"><span id="powerStatus" class="has-text-warning" v-show="city.powered"><span>MW</span> <span id="powerMeter" class="meter">{{ approx(replicate(city.power)) }}</span></span></div>
    //     </div>
    //     <div id="sideQueue">
    //         <div id="buildQueue" class="bldQueue standardqueuestyle has-text-info" v-show="display"></div>
    //         <div id="msgQueue" class="msgQueue vscroll has-text-info" aria-live="polite">
    //             <div id="msgQueueHeader">
    //                 <h2 class="has-text-success">${loc('message_log')}</h2>
    //                 <span class="special" role="button" title="message queue options" @click="trigModal">
    //                     <svg version="1.1" x="0px" y="0px" width="12px" height="12px" viewBox="340 140 280 279.416" enable-background="new 340 140 280 279.416" xml:space="preserve">
    //                         <path class="gear" d="M620,305.666v-51.333l-31.5-5.25c-2.333-8.75-5.833-16.917-9.917-23.917L597.25,199.5l-36.167-36.75l-26.25,18.083
    //                         c-7.583-4.083-15.75-7.583-23.916-9.917L505.667,140h-51.334l-5.25,31.5c-8.75,2.333-16.333,5.833-23.916,9.916L399.5,163.333
    //                         L362.75,199.5l18.667,25.666c-4.083,7.584-7.583,15.75-9.917,24.5l-31.5,4.667v51.333l31.5,5.25
    //                         c2.333,8.75,5.833,16.334,9.917,23.917l-18.667,26.25l36.167,36.167l26.25-18.667c7.583,4.083,15.75,7.583,24.5,9.917l5.25,30.916
    //                         h51.333l5.25-31.5c8.167-2.333,16.333-5.833,23.917-9.916l26.25,18.666l36.166-36.166l-18.666-26.25
    //                         c4.083-7.584,7.583-15.167,9.916-23.917L620,305.666z M480,333.666c-29.75,0-53.667-23.916-53.667-53.666s24.5-53.667,53.667-53.667
    //                         S533.667,250.25,533.667,280S509.75,333.666,480,333.666z"/>
    //                     </svg>
    //                 </span>
    //                 <span role="button" class="zero has-text-advanced" @click="clearLog(m.view)">${loc('message_log_clear')}</span>
    //                 <span role="button" class="zero has-text-advanced" @click="clearLog()">${loc('message_log_clear_all')}</span>
    //             </div>
    //             <h2 class="is-sr-only">${loc('message_filters')}</h2>
    //             <div id="msgQueueFilters" class="hscroll msgQueueFilters"></div>
    //             <h2 class="is-sr-only">${loc('messages')}</h2>
    //             <div id="msgQueueLog" aria-live="polite"></div>
    //         </div>
    //     </div>
    //     <div id="resources" class="resources vscroll"><h2 class="is-sr-only">${loc('tab_resources')}</h2></div>
    // </div>`);

    popover('race',
        function(){
            return typeof races[global.race.species].desc === 'string' ? races[global.race.species].desc : races[global.race.species].desc();
        },{
            elm: '#race > .name'
        }
    );


    $(`#sideQueue`).append(`
        <div id="buildQueue" class="bldQueue standardqueuestyle has-text-info" v-show="display"></div>
        
        <div id="msgQueue" class="msgQueue vscroll has-text-info" aria-live="polite">
            <div id="msgQueueHeader">

                <h2 class="has-text-success">${loc('message_log')}</h2>

                <span class="special" role="button" title="message queue options" @click="trigModal">
                    <svg version="1.1" x="0px" y="0px" width="12px" height="12px" viewBox="340 140 280 279.416" enable-background="new 340 140 280 279.416" xml:space="preserve">
                        <path class="gear" d="M620,305.666v-51.333l-31.5-5.25c-2.333-8.75-5.833-16.917-9.917-23.917L597.25,199.5l-36.167-36.75l-26.25,18.083
                        c-7.583-4.083-15.75-7.583-23.916-9.917L505.667,140h-51.334l-5.25,31.5c-8.75,2.333-16.333,5.833-23.916,9.916L399.5,163.333
                        L362.75,199.5l18.667,25.666c-4.083,7.584-7.583,15.75-9.917,24.5l-31.5,4.667v51.333l31.5,5.25
                        c2.333,8.75,5.833,16.334,9.917,23.917l-18.667,26.25l36.167,36.167l26.25-18.667c7.583,4.083,15.75,7.583,24.5,9.917l5.25,30.916
                        h51.333l5.25-31.5c8.167-2.333,16.333-5.833,23.917-9.916l26.25,18.666l36.166-36.166l-18.666-26.25
                        c4.083-7.584,7.583-15.167,9.916-23.917L620,305.666z M480,333.666c-29.75,0-53.667-23.916-53.667-53.666s24.5-53.667,53.667-53.667
                        S533.667,250.25,533.667,280S509.75,333.666,480,333.666z"/>
                    </svg>
                </span>

                <span role="button" class="zero has-text-advanced" @click="clearLog(m.view)">${loc('message_log_clear')}</span>

                <span role="button" class="zero has-text-advanced" @click="clearLog()">${loc('message_log_clear_all')}</span>

            </div>

            <h2 class="is-sr-only">${loc('message_filters')}</h2>
            
            <div id="msgQueueFilters" class="hscroll msgQueueFilters"></div>
            
            <h2 class="is-sr-only">${loc('messages')}</h2>
            
            <div id="msgQueueLog" aria-live="polite"></div>
        </div>`)
    vBind({
        el: `#msgQueue`,
        data: {
            m: message_logs,
            s: global.settings.msgFilters
        },
        methods: {
            swapFilter(filter){
                if (message_logs.view !== filter){
                    $(`#msgQueueFilter-${message_logs.view}`).removeClass('is-active').attr('aria-disabled', 'false');
                    $(`#msgQueueFilter-${filter}`).addClass('is-active').attr('aria-disabled', 'true');
                    message_logs.view = filter;
                    let queue = $(`#msgQueueLog`);
                    clearElement(queue);
                    message_logs[filter].forEach(function (msg){
                        queue.append($('<p class="has-text-'+msg.color+'"></p>').text(msg.msg));
                    });
                }
            },
            clearLog(filter){
                filter = filter ? [filter] : filter;
                initMessageQueue(filter);
                clearElement($(`#msgQueueLog`));
                if (filter){
                    global.lastMsg[filter] = [];
                }
                else {
                    Object.keys(global.lastMsg).forEach(function (tag){
                        global.lastMsg[tag] = [];
                    });
                }
            },
            trigModal(){
                this.$buefy.modal.open({
                    hasModalCard: false,
                    customClass: 'evolve-modal',
                    content: '<div id="modalBox" class="modalBox"></div>',
                    onCancel: () => closeModalAnim() // Modal closed
                });

                let checkExist = setInterval(function(){
                    if ($('#modalBox').length > 0){
                        clearInterval(checkExist);
                        let egg16 = easterEgg(16,12);
                        $('#modalBox').append($(`<p id="modalBoxTitle" class="has-text-warning modalTitle">${loc('message_log')}${egg16.length > 0 ? egg16 : ''}</p>`));

                        var body = $('<div id="specialModal" class="modalBody vscroll"></div>');
                        $('#modalBox').append(body);
                        
                        let catVis = $(`
                            <div>
                                <div>
                                    <span class="has-text-warning">${loc('message_log_settings_visible')}</span>
                                </div>
                            </div>
                        `);
                        let catMax = $(`
                            <hr>
                            <div>
                                <div>
                                    <span class="has-text-warning">${loc('message_log_settings_length')}</span>
                                </div>
                            </div>
                        `);
                        let catSave = $(`
                            <hr>
                            <div>
                                <div>
                                    <span class="has-text-warning">${loc('message_log_settings_save')}</span>
                                </div>
                            </div>
                        `);
                        body.append(catVis);
                        body.append(catMax);
                        body.append(catSave);
                        
                        let visSet = ``;
                        let maxSet = ``;
                        let saveSet = ``;
                        
                        let maxInputs = {};
                        let saveInputs = {};
                        message_filters.forEach(function (filter){
                            visSet += `<div class="msgInput" v-show="s.${filter}.unlocked"><span>${loc('message_log_' + filter)}</span> <b-checkbox class="patrol" v-model="s.${filter}.vis" :disabled="checkDisabled('${filter}',s.${filter}.vis)" :input="check('${filter}')"></b-checkbox></div>`;
                            maxSet += `<div class="msgInput" v-show="s.${filter}.unlocked"><span>${loc('message_log_' + filter)}</span> <b-numberinput :input="maxVal('${filter}')" min="1" v-model="mi.${filter}" :controls="false"></b-numberinput></div>`;
                            saveSet += `<div class="msgInput" v-show="s.${filter}.unlocked"><span>${loc('message_log_' + filter)}</span> <b-numberinput :input="saveVal('${filter}')" min="0" :max="s.${filter}.max" v-model="si.${filter}" :controls="false"></b-numberinput></div>`;
                            
                            maxInputs[filter] = global.settings.msgFilters[filter].max;
                            saveInputs[filter] = global.settings.msgFilters[filter].save;
                        });
                        catVis.append(visSet);
                        catMax.append(maxSet);
                        catSave.append(saveSet);
                        catMax.append(`
                            <div class="msgInputApply">
                                <button class="button" @click="applyMax()">${loc('message_log_settings_apply')}</button>
                            </div>
                        `);
                        catSave.append(`
                            <div class="msgInputApply">
                                <button class="button" @click="applySave()">${loc('message_log_settings_apply')}</button>
                            </div>
                        `);
                        
                        
                        vBind({
                            el: `#specialModal`,
                            data: {
                                s: global.settings.msgFilters,
                                mi: maxInputs,
                                si: saveInputs
                            },
                            methods: {
                                check(filter){
                                    if (!global.settings.msgFilters[filter].vis && message_logs.view === filter){
                                       let haveVis = false;
                                        Object.keys(global.settings.msgFilters).forEach(function (filt){
                                            if (global.settings.msgFilters[filt].vis && !haveVis){
                                                haveVis = true;
                                                $(`#msgQueueFilter-${message_logs.view}`).removeClass('is-active');
                                                $(`#msgQueueFilter-${filt}`).addClass('is-active');
                                                message_logs.view = filt;
                                                let queue = $(`#msgQueueLog`);
                                                clearElement(queue);
                                                message_logs[filt].forEach(function (msg){
                                                    queue.append($('<p class="has-text-'+msg.color+'"></p>').text(msg.msg));
                                                });
                                            }
                                        });
                                    }
                                },
                                checkDisabled(filter,fill){
                                    if (!global.settings.msgFilters[filter].vis){
                                        return false;
                                    }
                                    let totVis = 0;
                                    Object.keys(global.settings.msgFilters).forEach(function (filt){
                                        if (global.settings.msgFilters[filt].vis){
                                            totVis++;
                                        }
                                    });
                                    
                                    return totVis === 1;
                                },
                                maxVal(filter){
                                    if (maxInputs[filter] < 1){
                                        maxInputs[filter] = 1;
                                    }
                                },
                                saveVal(filter){
                                    if (saveInputs[filter] < 0){
                                        saveInputs[filter] = 0;
                                    }
                                    else if (saveInputs[filter] > global.settings.msgFilters[filter].max){
                                        saveInputs[filter] = global.settings.msgFilters[filter].max;
                                    }
                                },
                                applyMax(){
                                    message_filters.forEach(function (filter){
                                        let max = maxInputs[filter];
                                        global.settings.msgFilters[filter].max = max;
                                        if (max < global.settings.msgFilters[filter].save){
                                            saveInputs[filter] = max;
                                            global.settings.msgFilters[filter].save = max;
                                            global.lastMsg[filter].splice(max);
                                        }
                                        message_logs[filter].splice(max);
                                        if (message_logs.view === filter){
                                            $('#msgQueueLog').children().slice(max).remove();
                                        }
                                    });
                                },
                                applySave(){
                                    message_filters.forEach(function (filter){
                                        global.settings.msgFilters[filter].save = saveInputs[filter];
                                        global.lastMsg[filter].splice(saveInputs[filter]);
                                    });
                                }
                            }
                        });
                    }
                }, 50);
            }
        }
    });

    // Center Column
    // let mainColumn = $(`<div id="mainColumn" class="column is-three-quarters"></div>`);
    // columns.append(mainColumn);
    // let content = $(`<div class="content"></div>`);
    // mainColumn.append(content);

    // content.append(`<h2 class="is-sr-only">Tab Navigation</h2>`);
    // let tabs = $(`<b-tabs id="mainTabs" v-model="s.civTabs" :animated="s.animated" @update:model-value="swapTab($event)"></b-tabs>`);
    // content.append(tabs);

    // // Evolution Tab
    // let evolution = $(`<b-tab-item class="tab-item sticky" :visible="s.showEvolve" :label="label('tab_evolve')">
    //     <div id="evolution"></div>
    // </b-tab-item>`);
    // tabs.append(evolution);

    // // City Tab
    // let city = $(`<b-tab-item :visible="s.showCiv" :label="label('tab_civil')">
    //     <div id="mTabCivil"></div>
    // </b-tab-item>`);
    // tabs.append(city);

    // // Civics Tab
    // let civic = $(`<b-tab-item :visible="s.showCivic" :label="label('tab_civics')">
    //     <div id="mTabCivic"></div>
    // </b-tab-item>`);
    // tabs.append(civic);

    // // Research Tab
    // let research = $(`<b-tab-item :visible="s.showResearch" :label="label('tab_research')">
    //     <div id="mTabResearch"></div>
    // </b-tab-item>`);
    // tabs.append(research);

    // // Resources Tab
    // let resources = $(`<b-tab-item :visible="s.showResources" :label="label('tab_resources')">
    //     <div id="mTabResource"></div>
    // </b-tab-item>`);
    // tabs.append(resources);

    // // ARPA Tab
    // let arpa = $(`<b-tab-item :visible="s.showGenetics" :label="label('tech_arpa')">
    //     <div id="mTabArpa"></div>
    // </b-tab-item>`);
    // tabs.append(arpa);

    // // Stats Tab
    // let stats = $(`<b-tab-item :visible="s.showAchieve" :label="label('tab_stats')">
    //     <div id="mTabStats"></div>
    // </b-tab-item>`);
    // tabs.append(stats);

    // // Settings Tab
    // // let settings = $(`<settings-tab />`);
    // // tabs.append(settings);

    // // (Hidden Last Tab) Hell Observation Tab
    // let observe = $(`<b-tab-item disabled>
    //     <template slot="header"></template>
    //     <div id="mTabObserve"></div>
    // </b-tab-item>`);
    // tabs.append(observe);

    // // Right Column
    // columns.append(`<div id="queueColumn" class="queueCol column"></div>`);

    let egg15 = easterEgg(15,8);
    
    // Bottom Mobile navigation bar
    // Currently uses hard coded english strings for labels, since we don't have any existing strings that accurately label the main game panel and side queue/message log(right column)
    $('body').append(`
        <div id="mobileNav">
            <button class="mobile-nav-btn is-active" data-panel="resources">${loc('tab_resources')}</button>
            <button class="mobile-nav-btn" data-panel="game">Game</button>
            <button class="mobile-nav-btn" data-panel="queue">Queue</button>
        </div>
    `);

    $('#mobileNav').on('click', '.mobile-nav-btn', function () {
        const panel = $(this).data('panel');
        $('#main')
            .toggleClass('mobile-panel-game', panel === 'game')
            .toggleClass('mobile-panel-queue', panel === 'queue');
        $('#mobileNav .mobile-nav-btn').removeClass('is-active');
        $(this).addClass('is-active');
    });

    // Keep #mobileNav and .promoBar visually anchored when browser toolbars toggle or user zooms.
    // visualViewport tracks the *visible* window; position:fixed tracks the layout viewport —
    // when they diverge (toolbar changes, zoom) we correct with a CSS transform offset.
    if ('visualViewport' in window) {
        const $navBar = $('#mobileNav');
        const $promoBar = $('.promoBar');

        const syncFixedToViewport = () => {
            const vv = window.visualViewport;
            // How many px the visual viewport is inset from the bottom of the layout viewport
            const offsetFromBottom = window.innerHeight - (vv.height + vv.offsetTop);
            const translateY = -Math.round(Math.max(0, offsetFromBottom));
            $navBar.css('transform', `translateY(${translateY}px)`);
            $promoBar.css('transform', `translateY(${translateY}px)`);
        };

        window.visualViewport.addEventListener('resize', syncFixedToViewport);
        window.visualViewport.addEventListener('scroll', syncFixedToViewport);
    }

    // Bottom Bar
    $('body').append(`
        <div class="promoBar">
            <span class="left">
                <h1>
                    <span class="has-text-warning">${egg15.length > 0 ? `Ev${egg15}lve` : `Evolve`}</span>
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
    `);

    loadCustomThemeHTML();
}
