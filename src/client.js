// import readline from "node:readline";

// import { Client } from "archipelago.js";
import { Client } from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";
import { messageQueue } from "./functions.js";
import { actions } from "./actions.js"

// Using the node readline module, create an interface for intercepting any user input.
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });



// Add an event listener for when a "line" is entered into the standard input (e.g., the console/terminal window).
// rl.on("line", async (line) => {
//     // Send the input!
//     await client.messages.say(line)
// });

// Login to the server. Replace `archipelago.gg:XXXXX` and `Phar` with the address/url and slot name for your room.
// If no game is provided, client will connect in "TextOnly" mode, which is fine for this example.

const client = new Client();
var connectInfo=null;
// const regexConstructor = new RegExp(dynamicPattern, 'gi'); 
export function login(user,port,pass){
    // localStorage.setItem("port")
    connectInfo={
        port: port?"archipelago.gg:"+port :"localhost:38281",//"archipelago.gg:38281", // Default hostname
        game: "",//"Evolve", // Replace with the game name for this player.
        user: user || "Player1", // Default player name
        pass: pass,
        items_handling: 0b111,
    };
    connectToServer();
    // client.messages.on("message", (content) => {
    //     console.log(content);
    // });
    
    
    // client.socket.on("connected", connectedListener);
    // console.log()
}
function updateItems(item,indx){
    if(!actions.tech.hasOwnProperty(item)){
        console.error("WOW THIS ITEM NO EXSIT: "+item);
        return
    }
    if(!actions.tech[item].hasOwnProperty("arch")){
        console.error("OH DEAR item "+item+" hasnt been configured properly!");
        return
    }
    actions.tech[item].arch.locked=false;
    console.log(item+" is now availible! "+actions.tech[item].arch.locked   )
}
function connectToServer(){
    client.login(connectInfo.port, connectInfo.user,connectInfo.game,{password:connectInfo.pass})
    .then(() => console.log("Connected to the Archipelago server!"))
    .catch(console.error);
    const connectedListener = (packet) => {
        console.log("Connected to server: ", packet);
        const packetTeamName = packet.team;
        const packetSlotName = packet.slot;

        // checkWin();
        
        console.log("_read_client_status_"+packetTeamName+"_"+packetSlotName)
        // client.storage.notify(["_read_client_status_"+packetTeamName+"_"+packetSlotName], (key, value, oldValue) => {
        //     console.log("New client status -> ", value)
        //     if(value == 30){
        //         sendWin();
        //     }
        // });
        // checkYDDD();
        

        // nextgoal = 0;
        // // console.log(packet.missing_locations)
        // updateMissingLocations(packet);
        // updateSettings(packet);
        // updateRequiresValue(packet);
        // updateHighscoreAndGoal();
        // submitScore();


    };
    const disconnectedListener = (packet) => {
        console.log("DISCONNECTED!");
        connectedstatus = false;
        // checkConnection();
    }
    
    const roomupdateListener = (packet) => {
        // updateMissingLocations(packet);
        // updateRequiresValue(packet);
        console.log("Room update:", packet)
        //newItems(packet)
    };



    const receiveditemsListener = (items, index) => {
        console.log(`Receiveditemslistener(${items},${index})`);
        // connectionOK();
        for(var i=0; i<items.length; i++){
            updateItems(items[i],i);
            // jsonListener(items[i]);
            messageQueue(`You recieved '${items[i]}'!`);
        }
        // updateItems(items,index);
        // updateMissingLocations(packet);
        // updateRequiresValue(packet);
        
        // newItems(items, index); //update highscore and goal in here, when new items.
    };
    function jsonListener(text, nodes) {
        console.log(`jsonlistener(${text},EEEEE, ${nodes.toString()})`);
        // console.log(typeof text);
        // for(const node of nodes){
        //     console.log(node);
        // }
        // console.log
        // const texts=text.split("\n");
        var msgText=[];
        for(const node of nodes){
            var nodeTxt=node.text
            console.log(node.type);
            if(node.type=="player"){
                if(node.player.slot==client.players.self.slot){
                    nodeTxt=`<b>${nodeTxt}</b>`;
                }
                else{
                    nodeTxt=`<i>${nodeTxt}</i>`;
                }
            }
            else if(node.type=="item"){
                nodeTxt=`<u>${nodeTxt}</u>`;
            }
            console.log(nodeTxt);
            msgText.push(nodeTxt);
        }
        // messageQueue()
        msgText=msgText.join(" ").split("\n");
        for(const txt of msgText){
            messageQueue(txt,"archipeligo",false,["all"]);
        }
        
                // Plaintext to console, because why not?
                
                

                // const messageElement = document.createElement("div");

                // if (document.getElementById("showTimestamp").checked || document.getElementById("showLinenumber").checked) {
                //     const nodeElement = document.createElement("span");

                //     if (document.getElementById("showTimestamp").checked) {
                //         nodeElement.innerText  += "[" + new Date().toLocaleTimeString('en-US', { hour12: false }) + "] ";
                //     }
                //     if (document.getElementById("showLinenumber").checked) {
                //         nodeElement.innerText  += "[" + messageCount + "] ";
                //     }

                //     messageElement.appendChild(nodeElement);
                // }
                


                // let is_relevant = false;
                // let contains_player = false;

                
                

                // for (const node of nodes) {
                //     const nodeElement = document.createElement("span");
                //     nodeElement.innerText = node.text;

                //     switch (node.type) {
                //         case "entrance":
                //             nodeElement.style.color = "#6495ED";
                //             break;

                //         case "location":
                //             nodeElement.style.color = "#00FF7F";
                //             break;

                //         case "color":
                //             // not really correct, but technically the only color nodes the server returns is "green" or "red"
                //             // so it's fine enough for an example.
                //             nodeElement.style.color = node.color;
                //             break;

                //         case "player":
                //             contains_player = true;
                //             nodeElement.style.fontWeight = "bold";
                //             if (node.player.slot === client.players.self.slot) {
                //                 // It's us!
                //                 nodeElement.style.color = "#EE00EE";
                //                 is_relevant = true;
                //             } else {
                //                 // It's them!
                //                 nodeElement.style.color = "#FAFAD2";
                //             }
                //             nodeElement.innerText = node.player.alias;
                //             nodeElement.title = "Game: " + node.player.game;

                //             if (saveYDDInformation) {
                //                 // Add a click event listener to the span
                //                 nodeElement.addEventListener('click', function() {
                //                     // Form the URL dynamically
                //                     // Get the full URL of the current page
                //                     const fullUrl = window.location.href;

                //                     // Create a new URL object
                //                     const url = new URL(fullUrl);

                //                     // Get the base URL without query parameters
                //                     const baseUrl = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}${url.pathname}`;

                //                     const url_full = baseUrl+"?db=y&p=AP&go=y&hostport="+connectionInfo.hostport+"&name="+node.player.name;

                //                     window.location.href = url_full;
                //                 });

                //                 // Optionally, change the cursor to pointer to indicate it's clickable
                //                 nodeElement.style.cursor = 'pointer';
                //             }


                //             break;

                //         case "item": {
                //             nodeElement.style.fontWeight = "bold";
                //             let typenumber = node.item.progression + 2 * node.item.useful + 4 * node.item.trap
                //             nodeElement.style.color = classaddcolor[typenumber];
                //             nodeElement.title = classadddesc[typenumber];     
                //             if(document.getElementById("showItemClassification").checked){  
                //                 nodeElement.innerText += classaddtext[typenumber]; 
                //             } 
                //         }

                //         // no special coloring needed
                //         case "text":
                //         default:
                //             break;
                //     }
                //     messageElement.appendChild(nodeElement);
                // }

                // if(!document.getElementById('only_relevant_messages').checked || !contains_player || is_relevant){
                //     var logTextarea = document.getElementById("log");

                //     var isScrolledToBottom = logTextarea.scrollHeight - logTextarea.clientHeight <= logTextarea.scrollTop + 1;
                //     logTextarea.appendChild(messageElement);
                //     messageCount += 1;
                    
                //     cleanLog();

                //     if (isScrolledToBottom) {
                //         logTextarea.scrollTop = logTextarea.scrollHeight - logTextarea.clientHeight;
                //     }
                // }
    }
    client.socket.on("connected", connectedListener);
    client.socket.on("disconnected", disconnectedListener);
    client.room.on("roomUpdate", roomupdateListener);
    client.items.on("itemsReceived", receiveditemsListener);
    client.messages.on("message", jsonListener);
    client.messages.on("itemSent", itemSentListener);
    client.room.on("locationsChecked", locationsCheckedListener);
}
var saveYDDInformation=1;
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
var missingLocations=[];
function locationsCheckedListener(locations){
            
    for (let item of locations) {
        if (missingLocations.includes(item)) {
            missingLocations.splice(missingLocations.indexOf(item), 1);
        }
    } 
    // updateHighscoreAndGoal();
    
}
var logined=false;   
function sendCommand(text){
    if(text.slice(0,6)=="!login"){
        text=text.split(" ");
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
        // client.messages.say();
        // sendMsg({"cmd": 'LocationChecks', "locations": text.split(" ").slice(1).join(" ")})
        return
    }
    console.log("sending command:"+text);
    client.messages.say(text);
    
}
function sendMsg(msg){
    console.log("sending: "+msg.toString());
    client.socket.send(msg)
}
export function initChatModule(){
    document.getElementById("commandInpForm").addEventListener("submit", function (event) {
      event.preventDefault(); // prevent page reload
      sendCommand(document.getElementById("commandInput").value);
    //   console.log(document.getElementById("commandInput").value);
      this.reset();
    });
}
// fanaticism (Player 1), mythology (Player 1), oil_well (Player 1), iron_saw (Player 1), mining (Player 1), warehouse (Player 1), large_trades (Player 1), mercs (Player 1), stock_market (Player 1), iron_pickaxe (Player 1), iron_sledgehammer (Player 1), steel_saw (Player 1), eebonds (Player 1), tax_rates (Player 1), windmill (Player 1), electricity (Player 1), barns (Player 1), kroll_process (Player 1), freight (Player 1), playwright (Player 1), storage (Player 1), espionage (Player 1), rocketry (Player 1), carpentry (Player 1), uranium (Player 1), apartment (Player 1), mine_conveyor (Player 1), copper_hoe (Player 1), corpocracy (Player 1), alloy_drills (Player 1), steel_sledgehammer (Player 1), copper_pickaxe (Player 1), titanium_sledgehammer (Player 1), blast_furnace (Player 1), robotics (Player 1), dazzle (Player 1), hunter_process (Player 1), silo (Player 1), iron_mining (Player 1), trade (Player 1), investing (Player 1), library (Player 1), reinforced_crates (Player 1), flintlock_rifle (Player 1), arpa (Player 1), smelting (Player 1), indoctrination (Player 1), swiss_banking (Player 1), monument (Player 1), republic (Player 1), genetics (Player 1), steel_hoe (Player 1), plate_armor (Player 1), chainsaws (Player 1), diplomacy (Player 1), bayer_process (Player 1), alloy_containers (Player 1), technocracy (Player 1), assembly_line (Player 1), industrialization (Player 1), signing_bonus (Player 1), oil_depot (Player 1), casino (Player 1), containerization (Player 1), brickworks (Player 1), vocational_training (Player 1), currency (Player 1), irrigation (Player 1), bows (Player 1), research_grant (Player 1), theology (Player 1), corruption (Player 1), boot_camp (Player 1), coal_mining (Player 1), uranium_storage (Player 1), bonds (Player 1), iron_hoe (Player 1), market (Player 1), steel (Player 1), machinery (Player 1), safety_deposit (Player 1), foundry (Player 1), steel_vault (Player 1), mad (Player 1), sundial (Player 1), housing (Player 1), stone_axe (Player 1), club (Player 1), bessemer_process (Player 1), socialist (Player 1), steel_pickaxe (Player 1), code_breakers (Player 1), mill (Player 1), cement (Player 1), farm_house (Player 1), kevlar (Player 1), wharf (Player 1), gmfood (Player 1), government (Player 1), reinforced_shed (Player 1), cameras (Player 1), jackhammer (Player 1), copper_sledgehammer (Player 1), assistant (Player 1), fission (Player 1), radio (Player 1), copper_axes (Player 1), massive_trades (Player 1), steel_axes (Player 1), mad_science (Player 1), adjunct_professor (Player 1), thesis (Player 1), spy_training (Player 1), vault (Player 1), garrison (Player 1), screw_conveyor (Player 1), tv (Player 1), theocracy (Player 1), missionary (Player 1), archaeology (Player 1), banking (Player 1), synthetic_fur (Player 1), anfo (Player 1), agriculture (Player 1), titanium_drills (Player 1), steel_containers (Player 1), wooden_tools (Player 1), portland_cement (Player 1), windturbine (Player 1), thermomechanics (Player 1), iron_axes (Player 1), bioscience (Player 1), fracking (Player 1), titanium_axes (Player 1), cnc_machine (Player 1), rebar (Player 1), aphrodisiac (Player 1), steel_rebar (Player 1), titanium_crates (Player 1), artisans (Player 1), metal_working (Player 1), black_powder (Player 1), internet (Player 1), armor (Player 1), machine_gun (Player 1), oxygen_converter (Player 1), oil_power (Player 1), theatre (Player 1), dynamite (Player 1), scientific_journal (Player 1), home_safe (Player 1), hospital (Player 1), merchandising (Player 1), gantry_crane (Player 1), zoning_permits (Player 1), zealotry (Player 1), urbanization (Player 1), fluidized_bed_reactor (Player 1), bunk_beds (Player 1), apprentices (Player 1), titanium_hoe (Player 1), steel_beams (Player 1), electronics (Player 1), cottage (Player 1), spy_gadgets (Player 1), anthropology (Player 1), science (Player 1), cranes (Player 1), master_craftsman (Player 1), polymer (Player 1), spy (Player 1), jackhammer_mk2 (Player 1), rotary_kiln (Player 1), tesla_coil (Player 1), electric_arc_furnace (Player 1), urban_planning (Player 1), crispr (Player 1)