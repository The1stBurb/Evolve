// import readline from "node:readline";

// import { Client } from "archipelago.js";
import { Client } from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";
import { messageQueue } from "./functions.js";
import { actions, initStruct } from "./actions.js"
import { eventList, events } from './events.js'
import { global, seededRandom } from './vars.js'
import { incrementStruct } from './space.js'

const client = new Client();
var connectInfo=null;
var gameSeed=0;
window.addedListeners=false;
window.connected=false;
window.itemTable={}
window.locTable={}
window.ritemTable={}
window.rlocTable={}
var data={}

const items={
    filler:{
        "building":triggerBuilding,
        "resources":triggerResourceBonus,
        "plasmid":{
            "1":triggerPlasmid1,
            "2":triggerPlasmid2,
            "3":triggerPlasmid3,
            "4":triggerPlasmid4,
        },
        "phage":{
            "1":triggerPhage1,
            "2":triggerPhage2,
            "3":triggerPhage3,
        },
        "antiplasmid":{
            "1":triggerAntip1,
            "2":triggerAntip2,
        },
        "power_bonus":triggerPowerBonus,
        "prod_bonus":triggerProdBonus,
        "pop_bonus":triggerPopBonus,
    },
    trap:{
        "resources":triggerResourceMalus,
        "power_malus":triggerPowerMalus,
        "prod_malus":triggerProdMalus,
        "attack":triggerAttack,
    },
    crispr:triggerCrispr,
}


//special seeded random based on index for replication!
function apRandom(min, max, indexSeed) {
    max = max || 1;
    min = min || 0;

    let seed = (gameSeed||0)+indexSeed
    let newSeed = (seed * 9301 + 49297) % 233280;
    let rnd = newSeed / 233280;
    return min + rnd * (max - min);
}

//login!
export function login(user,port,pass){
    global.settings.pause=true

    connectInfo={
        port: port || localStorage.getItem("port") || Error,//"archipelago.gg:38281", // Default hostname
        game: "Evolve",
        user: user || localStorage.getItem("user") || "Player1",
        pass: pass || localStorage.getItem("pass") || "",
        items_handling: 0b111,
    };
    connectToServer();
    window.addEventListener("beforeunload", () => {
        client.socket.disconnect();
    });
}

//dont need!
function foundEventManager(item){
    if(item){
        var foundEvents=foundEventManager();
        localStorage.setItem(JSON.stringify(foundEvents+[item]))
    }
    else{
        return JSON.parse(localStorage.getItem("foundEvent")) || [];

    }
}


function randChoice(arr,index) {
    if (!arr.length) return null;
    return arr[Math.floor(apRandom(0,arr.length,index))];
}

function updateItems(item,index){
    console.log(item,typeof item)
    item=item.split(":")
    item=[item[0].split("-"),item[1].split("_")]
    var ids=item[0]
    var item=item[1]
    // item[1]=item[1].split("_")
    // var ids=item[0].slice(5),item=item[1];
    switch(ids[1]){
        case "filler":
            if(item[0]in ["plasmid","phage","antiplasmid"]){items.filler[item[0]][item[1]](index)}
            else{items.filler[item[0]](index)}
        break;
        case "trap":
            items.trap[item[0]](index)
        break
        case "cripsr":
            items.crispr(index,item[0])
        break
        case "tech":
            item=item.join("_")
            if(!actions.tech.hasOwnProperty(item)){
                console.error("WOW THIS ITEM NO EXSIT: "+item);
                return
            }
            if(!actions.tech[item].hasOwnProperty("arch")){
                console.error("OH DEAR item "+item+" hasnt been configured properly!");
                return
            }
            actions.tech[item].arch.locked=false;
            console.log(item+" is now availible! "+actions.tech[item].arch.locked)
        break;
        default:
            console.log("Uh Oh! Invalid item!",ids,item)        
    }
    
}

function triggerBuilding(index){
    var builds=Object.keys(global.city);
    builds=builds.slice(builds.indexOf("power_total")+1)
    console.log(builds);
    var attempts=0;
    while(attempts<20){
        attempts+=1;
        var bld=randChoice(builds,index);
        if(!bld.includes("ap_")&&global.city[bld].count>0){
            incrementStruct(bld,'city');
            console.log(bld)
            var title=actions.city[bld].title
            if(typeof title==="function"){title=title()}
            messageQueue(`You have gained another ${title}!`,"arch",false,["all"]);
            attempts=200
        }
    }
    
}
function triggerResourceBonus(index){}
function triggerPlasmid1(index){
    var amnt=Math.round(apRandom(1,10,index))
    global.prestige.Plasmid.count += amnt;
    global.stats.plasmid += amnt;
}
function triggerPlasmid2(index){
    var amnt=Math.round(apRandom(10,25,index))
    global.prestige.Plasmid.count += amnt;
    global.stats.plasmid += amnt;
}
function triggerPlasmid3(index){
    var amnt=Math.round(apRandom(25,50,index))
    global.prestige.Plasmid.count += amnt;
    global.stats.plasmid += amnt;
}
function triggerPlasmid4(index){
    var amnt=Math.round(apRandom(50,100,index))
    global.prestige.Plasmid.count += amnt;
    global.stats.plasmid += amnt;
}
function triggerPhage1(index){
    var amnt=Math.round(apRandom(1,10,index))
    global.prestige.Phage.count += amnt;
    global.stats.phage += amnt;
}
function triggerPhage2(index){
    var amnt=Math.round(apRandom(10,25,index))
    global.prestige.Phage.count += amnt;
    global.stats.phage += amnt;
}
function triggerPhage3(index){
    var amnt=Math.round(apRandom(25,50,index))
    global.prestige.Phage.count += amnt;
    global.stats.phage += amnt;
}
function triggerAntip1(index){
    var amnt=Math.round(apRandom(1,10,index))
    global.prestige.AntiPlasmid.count += amnt;
    global.stats.antiplasmid += amnt;
}
function triggerAntip2(index){
    var amnt=Math.round(apRandom(10,25,index))
    global.prestige.AntiPlasmid.count += amnt;
    global.stats.antiplasmid += amnt;
}
function triggerCrispr(index,type){
    if(global.genes.hasOwnProperty(type)){
        global.genes[type]+=1;
    }
    else{
        global.genes[type]=1;
    }
}
function triggerPowerBonus(index){
    incrementStruct("ap_power_bonus","city")
}
function triggerProdBonus(index){
    incrementStruct("ap_prod_bonus","city")
}
function triggerPopBonus(index){
    incrementStruct("ap_pop_bonus","city")
}

function triggerResourceMalus(index){}
function triggerPowerMalus(index){
    incrementStruct("ap_power_malus","city")
}
function triggerProdMalus(index){
    incrementStruct("ap_prod_bonus","city")
}
function triggerAttack(index){
    if(Math.floor(apRandom(0,2,index))==0){events.siege.effect()}
    else{events.raid.effect()}
}

//update any new items!


//connect to the server
function connectToServer(){
    //login obviously
    client.login(connectInfo.port, connectInfo.user,connectInfo.game,{password:connectInfo.pass})
    .then(() => {
        console.log("Connected to the Archipelago server!")
        onConnected()

    })
    .catch((error)=>{
        console.log("Failed to connect", error);
        let txt = (error && error.message) ? error.message : String(error);
        if (txt.includes("InvalidGame")){
            messageQueue("Game is incorrect or something!","archError",false,["all"])
            return;
        }else{
            messageQueue(`ERROR: ${txt}`,"archError",false,["all"]);
            messageQueue("Try refreshing the game and logging in agian!","archError",false,["all"]);
        }
        window.connected=false;
    });

    

    //From spineraks Yacht Dice
    const connectedListener = (packet) => {
        console.log("Connected to server: ", packet);
        const packetTeamName = packet.team;
        const packetSlotName = packet.slot;
        console.log("_read_client_status_"+packetTeamName+"_"+packetSlotName)
    };

    //from spineraks Yacht Dice
    const disconnectedListener = (packet) => {
        console.log("DISCONNECTED!");
        window.connected = false;
        global.settings.pause=true;
        messageQueue("WARNING: You are disconnected! Trying to reconnect...","archError",false,["all"])
    }
    //from spineraks Yacht Dice, but disabled bcause its not needed
    const roomupdateListener = (packet) => {
        // updateMissingLocations(packet);
        // updateRequiresValue(packet);
        console.log("Room update:", packet)
        //newItems(packet)
    };


    //from spineracks Yacht Dice, but modified
    const receiveditemsListener = (items, index,override) => {
        
        console.log(`Receiveditemslistener(${items},${index})`);

        for(var i=global.itemcount-index; i<items.length; i++){
            if(i<0){continue}
            updateItems(items[i].name,i+global.itemcount);
            messageQueue(`You recieved '${items[i]}'!`);
        }
        global.itemcount+=items.length;
    };

    
    function jsonListener(text, nodes) {
        var msgText=""
        //convert nodes to text
        for(const node of nodes){
            var nodeTxt=node.text
            //this bit of code doesnt work because of evolve code. Imma see if i can fix that but later
            // console.log(node.type);
            // if(node.type=="player"){
            //     if(node.player.slot==client.players.self.slot){
            //         nodeTxt=`<b>${nodeTxt}</b>`;
            //     }
            //     else{
            //         nodeTxt=`<i>${nodeTxt}</i>`;
            //     }
            // }
            // else if(node.type=="item"){
            //     nodeTxt=`<u>${nodeTxt}</u>`;
            // }
            // console.log(nodeTxt);
            msgText+=" "+nodeTxt;
        }
        //make sure newlines are handled properly
        msgText=msgText.split("\n");
        for(const txt of msgText){
            messageQueue(txt.toString(),"arch",false,["all"]);
        }
        
                
    }
    //only add the listenres if they have been added!
    if(!window.addedListeners){
        console.log("listeners created oop")
        client.socket.on("connected", connectedListener);
        client.socket.on("disconnected", disconnectedListener);
        client.room.on("roomUpdate", roomupdateListener);
        client.items.on("itemsReceived", receiveditemsListener);
        client.messages.on("message", jsonListener);
        client.messages.on("itemSent", itemSentListener);
        client.room.on("locationsChecked", locationsCheckedListener);
        window.addedListeners=true;
    }
}

function onConnected(){
    //set user info
    window.connected=true;
    localStorage.setItem("port",connectInfo.port);
    localStorage.setItem("user",connectInfo.user);
    localStorage.setItem("game",connectInfo.game);
    localStorage.setItem("pass",connectInfo.pass);
    
    //get any necesary data fot items and such
    data=client.package.findPackage("Evolve");
    window.itemTable=data.itemTable
    window.locTable=data.locationTable
    window.ritemTable=data.reverseItemTable
    window.rlocTable=data.reverseLocationTable
    // global.settings.pause=false

    //handle any locations reached while offline
    for(var i=0; i<offlineLocs.length; i++){
        reachedLocation(offlineLocs[i][0],offlineLocs[i][1],true)
    }

    //fetch the game seed
    client.storage.fetch("gameSeed").then(fgameSeed=>{
        if(fgameSeed){//if it exsist, cool
            console.log("Fetched game seed"+fgameSeed)
            gameSeed=fgameSeed;
        }
        else{//otherwise set it to be the evolve seed
            console.log("no game seed found, using evolve seed"+global.seed)
            client.storage.prepare("gameSeed",[]).replace(global.seed).commit()
            gameSeed=global.seed
        }
    })
    .catch((error)=>{//same as above
        console.log("Somehting went wrong with fetching the game seed! defaulting to evolve seed!")
        client.storage.prepare("gameSeed",[]).replace(global.seed).commit()
        gameSeed=global.seed
    })
}

var saveYDDInformation=1;
//dont think i need this!, from spineraks Yacht Dice
function itemSentListener(text, item, nodes){
    if(saveYDDInformation == 1){
        let sender = item.sender;
        let receiver = item.receiver;
        if(sender.slot == client.players.self.slot){
            console.log("ITEM SENT AND REGISTER", text, item, nodes);
            client.storage.prepare("YADI_I"+receiver.slot, []).add([item.id]).commit() // Activate Archipelago storage.
        }
    }
}

//dont think i need this! from spineraks Yacht Dice
var missingLocations=[];
function locationsCheckedListener(locations){
    console.log(locations)
    for (let item of locations) {
        if (missingLocations.includes(item)) {
            missingLocations.splice(missingLocations.indexOf(item), 1);
        }
    } 
    // updateHighscoreAndGoal();
    
}

var logined=false;
//this is silly, but dont worry
function sendCommand(text){
    if(text.slice(0,6)=="!login"){
        text=text.split(" ");
        if(window.connected){return}
        login(text[1],text[2],text.length>3 ? text[3]:null);
        logined=true;
        return
    }
    else if(text.slice(0,5)=="!give"){
        updateItems(text.split(" ")[1],-1);
        return
    }
    else if(text.slice(0,5)=="!send"){
        console.log("sending "+text.split(" ").slice(1).join(" "));

        client.scout([parseInt(text.split(" ").slice(1).join(" "))],1);
        return
    }
    console.log("sending command:"+text);
    client.messages.say(text);
    
}

//initialize anything needed, mostly an added structures and the chat part
export function initChatModule(){
    document.getElementById("commandInpForm").addEventListener("submit", function (event) {
      event.preventDefault(); // prevent page reload
      sendCommand(document.getElementById("commandInput").value);
    //   console.log(document.getElementById("commandInput").value);
      this.reset();
    });
    //make any added structures work!
    if(!global.ap_init||true){
        // console.log("initialize")
        // console.log(global.city)
        let special_locs=["ap_power_bonus","ap_power_malus","ap_prod_bonus","ap_prod_malus"]//"ap_pop_bonus",]
        special_locs.forEach(function(buildName){
            initStruct(actions.city[buildName])
        })
        // initStruct(actions.city.ap_power)

        global.ap_init=true
    }
}
var offlineLocs=[]
//manages locations when reached
export function reachedLocation(type,loc){
    console.log(type,loc)
    //if not connected send it to the offline handler, otherwise the client can handle it
    if(!window.connected){offlineLocs.push([type,loc])}
    else{client.check(window.locTable[`loc-${type}:${loc}`])}
}

//have we reached out goal?
export function reachedGoal(){
    messageQueue("You did it! Congratulations!","arch",false,["all"])
    client.goal();
}

const devSaveFile="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"


// game sent RoomInfo
// client GetDataPackage games:[yachtDice]
// server GetDataPackage data:{games:{yachtdice:{checksum?,item_name_to_id,location_name_to_id}}}
// client connect
// serevr connected checkedLoc, missing loc
//     recieveditems items[{itemid,locationid,playerid,flags,class}]
// client Set?
// client setNotify
// client Get read client status
// server printJson joined
// server printJson help message
// server retrieved (from get)
// serer retrieved (from get)
// server retrieved from get
// client locationScout locatonID
// server locationInfo locations:[itemID,locationID from scout,player,flags,class]
// client locationChecks locid from locscout
// sevre printJson found item
// server recievedItems itemfoundid locid from locscout
// server roomupdate locid form locscout
// client locscout locid
// server locinfo itemid locid from locscout