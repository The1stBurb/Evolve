<script setup>
    import { ref } from "vue";

    import { loc } from '../locale.js';
    import { setWeather, seasonDesc, astrologySign, astroVal } from '../seasons.js';
    import { messageQueue } from '../functions.js';
    const city=ref(global.city);
    const race=ref(global.race);
    const s=ref(global.settings);
    
    function planet(species){
        return races[species].home;
    }
    function universe(universe){
        return showUniverse() ? '' : universe_types[universe].name;
    }
    function showUniverse(){
        return global.race.universe === 'standard' || global.race.universe === 'bigbang' ? false : true;
    }

    function petPet(){
        if (global.race['pet'] && global.race.pet.pet === 0){
            let outcome = global.race.pet.type === 'cat' ? Math.rand(0,3) : Math.rand(0,10);
            if (outcome === 0){
                global.race.pet.pet = -60;
                messageQueue(loc(`event_${global.race.pet.type}_pet_failure`,[loc(`event_${global.race.pet.type}_name${global.race.pet.name}`)]),false,false,['events','minor_events']);
            }
            else {
                global.race.pet.pet = 60;
                messageQueue(loc(`event_${global.race.pet.type}_pet_success`,[loc(`event_${global.race.pet.type}_name${global.race.pet.name}`)]),false,false,['events','minor_events']);
            }
        }
    }
    function showPet(){
        return global.race['pet'] ? true : false;
    }
    
    function remain(at){
        let minutes = Math.ceil(at * loopTimers().longTimer / 60000);
        if (minutes > 0){
            let hours = Math.floor(minutes / 60);
            minutes -= hours * 60;
            return `${hours}:${minutes.toString().padStart(2,'0')}`;
        }
        return;
    }
    function showSim(){
        return global['sim'] ? true : false;
    }

    function pausedesc(){
        return global.settings.pause ? loc('game_play') : loc('game_pause');
    }
    function pause(){
        $(`#pausegame`).removeClass('play');
        $(`#pausegame`).removeClass('pause');
        if (global.settings.pause){
            global.settings.pause = false;
            $(`#pausegame`).addClass('play');
        }
        else {
            global.settings.pause = true;
            $(`#pausegame`).addClass('pause');
        }
        if (!global.settings.pause && !webWorker.s){
            gameLoop('start');
        }
    }
</script>
<template>
    <div id="topBar" class="topBar">
        <h2 class="is-sr-only">Top Bar</h2>
        <span class="planetWrap">
            <span class="planet">{{ planet(race.species) }}</span>
            <span class="universe" v-show="showUniverse()">{{ universe(race.universe) }}</span>
            <span class="pet" id="playerPet" v-show="showPet()" @click="petPet()"></span>
            <span class="simulation" v-show="showSim()">{{ loc(`evo_challenge_simulation`) }}</span>
        </span>
        <span class="calendar">
            <span class="infoTimer" id="infoTimer"></span>
            <span v-show="city.calendar.day">
                <span class="is-sr-only" v-html="seasonDesc('sign')"></span><span id="astroSign" class="astro" v-html="seasonDesc('astrology')"></span>
                <b-tooltip :label="seasonDesc('moon')" :aria-label="seasonDesc('moon')" position="is-bottom" size="is-small" multilined animated><i id="moon" class="moon wi"></i></b-tooltip>
                <span class="year">{{ loc('year') }} <span class="has-text-warning">{{ city.calendar.year }}</span></span>
                <span class="day">{{ loc('day') }} <span class="has-text-warning">{{ city.calendar.day }}</span></span>
                <span class="season">{{ seasonDesc('season') }}</span>
                <b-tooltip :label="seasonDesc('weather')" :aria-label="seasonDesc('weather')" position="is-bottom" size="is-small" multilined animated><i id="weather" class="weather wi"></i></b-tooltip>
                <b-tooltip :label="seasonDesc('temp')" :aria-label="seasonDesc('temp')" position="is-bottom" size="is-small" multilined animated><i id="temp" class="temp wi"></i></b-tooltip>
                <b-tooltip :label="loc(`accelerated_time`)" v-show="s.at" :aria-label="loc(`accelerated_time`)" position="is-bottom" size="is-small" multilined animated><span class="atime has-text-caution">{{ remain(s.at) }}</span></b-tooltip>
                <span role="button" class="atime" style="padding: 0 0.5rem; margin-left: 0.5rem; cursor: pointer" @click="pause" :aria-label="pausedesc()">
                    <span id="pausegame"></span>
                </span>
            </span>
        </span>
        <span class="version" id="versionLog"><a href="wiki.html#changelog" target="_blank"></a></span>
    </div>
</template>