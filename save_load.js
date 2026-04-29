//These two functions go outside the drawnGovernOffice() func
function createGovConfigName(task,name){
    //This gets the next number name so but it probably isnt necesary
    if(!name || name=="name"){
        let config=global.race.governor.config.saves[task]
        name=0;
        Object.keys(config).forEach(elm=>{
            if(typeof elm=="number"){
                name=Math.max(name,parseInt(elm))
            }
        })
        name=name+1
    }
    return name
}
function createGovConfig(task,name){
    //Create it, if there is none for the current task, add a config but otherwise just add on.
    //Add the current config for the task
    let config;
    name=createGovConfigName(task,name)

    if(!global.race.governor.config.saves[task]){
        config={}
    }
    else{
        config=global.race.governor.config.saves[task]
    }
    
    global.race.governor.config.saves.name=name;
    config[name]=deepClone(global.race.governor.config[task])
    global.race.governor.config.saves[task]=config
}

//this is in the drawnGovernOffice(), right before the options div gets added
let config=$(`<div id="saveLoadTasks" class="govTask"></div>`);
govern.append(config);

let config_opt=``;
Object.keys(gov_tasks).forEach(function(task){
    if(gov_tasks[task].req()){//v-show="activeTask('${task}')" 
        config_opt+=`<b-dropdown-item v-on:click="setTask('${task}',10);">{{ '${task}' | label }}</b-dropdown-item>`
    }
})
config.append(/*html*/`
  <span>${loc(`gov_task`,["Load / Save"])}</span>
  <b-dropdown hoverable>
      <button class="button is-primary" slot="trigger">
          <span>{{ t.t10 | label }}</span>
          <i class="fas fa-sort-down"></i>
      </button>
      <b-dropdown-item v-on:click="setTask('none',10)">{{ 'none' | label }}</b-dropdown-item>
      ${config_opt}
  </b-dropdown>
  <b-button v-on:click="loadConfig(t.t10,c.saves.name)">Load</b-button>
  <b-button v-on:click="saveConfig(t.t10,c.saves.name)">Save</b-button>
  <b-input v-model="c.saves.name" :controls="false"></b-input>`)

//These would be in the VBind
saveConfig(t,n){
    createGovConfig(t,n)
},
loadConfig(t,n){
    let saves=global.race.governor.config.saves
    if(!saves.hasOwnProperty(t)){
        console.log("you have no save for the task ",t)
        return
    }
    if(!saves[t].hasOwnProperty(n)){
        console.log("you have no save for the task ",t," named ",n)
        return
    }
    global.race.governor.config[t]=global.race.governor.config.saves[t][n]
},

//and a popover
popover(`saveLoadTasks`,function(){
  let gov=global.race.governor
  let desc=`<div>Current Saves: ${gov.tasks.t10}</div><div>${gov.config.saves[gov.tasks.t10]?Object.keys(gov.config.saves[gov.tasks.t10]).join(', '):'None'}</div>`
  return desc
},{
  elm:`#saveLoadTasks`,
})
