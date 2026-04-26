let gain=3000;
if (global.portal['sensor_drone'] && global.tech['science'] >= 14){
    gain *= 1 + (wiki ? global.portal.sensor_drone.on : p_on['sensor_drone']) * 0.02;
}
if (global.tech['science'] >= 20){
    gain *= 3;
}
if (global.tech['science'] >= 21){
    gain *= 1.45;
}
if (global.tech['biotech'] >= 1){
    gain *= 2.5;
}
if (global.race['elemental'] && traits.elemental.vars()[0] === 'frost'){
    gain *= 1 + highPopAdjust(traits.elemental.vars()[4] * global.resource[global.race.species].amount / 100);
}