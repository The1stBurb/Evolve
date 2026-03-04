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
        }
        // updateItems(items,index);
        // updateMissingLocations(packet);
        // updateRequiresValue(packet);
        
        // newItems(items, index); //update highscore and goal in here, when new items.
    };
    function jsonListener(text, nodes) {
        console.log(`jsonlistener(${text},EEEEE, ${nodes.toString()})`);
        console.log(typeof text);
        // for(const node of nodes){
        //     console.log(node);
        // }
        // console.log
        // const texts=text.split("\n");
        var msgText=[];
        for(const node of nodes){
            // if(node.type==)
            msgText.push(node.text);
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
        client.scout([1],1); 
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