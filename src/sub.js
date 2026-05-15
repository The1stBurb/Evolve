const fs=require('fs');
const sub=JSON.parse(fs.readFileSync('./sub-dat.json','utf8'));
let keys=Object.keys(sub);
console.log(sub[keys[0]])
fs.writeFileSync('./sub-dat.json',JSON.stringify(sub,'',2));