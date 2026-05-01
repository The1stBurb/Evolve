
//I removed everything that wasn't changed from an example struct
const actions={
    rock_quarry: {
        effect(){
            let stone = actions.city.rock_quarry.caps.Stone();
            let asbestos = global.race['smoldering'] ? `<div>${loc('plus_max_resource',[stone,global.resource.Chrysotile.name])}</div>` : '';
            if (global.tech['mine_conveyor']){
                return `<div>${loc('city_rock_quarry_effect1',[2])}</div><div>${loc('plus_max_resource',[stone,global.resource.Stone.name])}</div>${asbestos}<div class="has-text-caution">${loc('city_rock_quarry_effect2',[4,$(this)[0].powered()])}</div>`;
            }
            else {
                return `<div>${loc('city_rock_quarry_effect1',[2])}</div><div>${loc('plus_max_resource',[stone,global.resource.Stone.name])}</div>${asbestos}`;
            }
        },
        caps:{
            Stone(count){
                return BHStorageMulti((count??1) * spatialReasoning(100));
            },
            Chrysotile(count){
                return actions.city.rock_quarry.caps.Stone(count)
            },
        },
    },
}
// Here is the class (will explain)
class AMOUNT{
    constructor(loci,name,is_true,resource,title,count){
        this.loci=loci//location
        this.name=name//name of struct
        this.resource=null
        this.tempRes=true
        /* 
            If the cap name is a string -> make it a list because then we can remove other checks later
            if its undefined -> we can just get it from the actions struct (this will be updated later for reasons that i cant remember, imma think on that lol)
            if its anything else (so a list) -> its good
        
        */
        if(typeof this.resource === 'string'){
            this.resource=[resource]
            this.tempRes=false
        }
        else if(resource === undefined){
            this.resource=[]
            this.tempRes=true
        }
        else{
            this.resource=resource
            this.tempRes=false
        }
        this.is_true=is_true//can we actually add the caps?
        this.title=title//whats its name
    }
    calc(){
        let act=this.findAct()
        if(this.tempRes){
            this.resource=Object.keys(act[this.name].caps)// get all the resources to cap
        }
        this.is_true=this.findGlob().hasOwnProperty(this.name)//make sure it works still
        this.title=typeof act[this.name].title ==="string"?act[this.name].title : act[this.name].title()//get title, with in case of function
    }
    findAct(){
        //if its a string then one location
        if(typeof this.loci == "string"){
            return actions[this.loci]
        }
        else{
            //otherwise get the levels (probably a more efficint way to do this)
            let main=actions[this.loci[0]]
            for(let i=1; i<this.loci.length; i++){
                main=main[this.loci[i]]
            }
            return main
        }
    }
    findGlob(){
        //the global (so far) has only used th first thing 
        //so like space.spc_home is just space
        if(typeof this.loci == "string"){
            return global[this.loci]
        }
        else{
            return global[this.loci[0]]
        }
    }
}

function Amount(loci,name,resource,is_true,title){
    return new AMOUNT(loci,name,resource,is_true,title)
}
function c_Amount(name,resource,is_true,title){
    return new AMOUNT('city',name,resource,is_true,title)
}
function sh_Amount(name,resource,is_true,title){
    return new AMOUNT(['space',"spc_home"],name,resource,is_true,title)
}
//the list
let capsIncrease=[
    c_Amount('rock_quarry'),
]


//everythin above is outside of midLoop
//everything below is inside

for(let i in capsIncrease){
    let inc=capsIncrease[i]
    inc.calc();//make sure everything is correct
    let is_true=inc.is_true, resource=inc.resource, name=inc.name, title=inc.title;//relic of creation of this, will remove when its finished

    if(!is_true||!name)break//if its false or doesnt have a name dont add anything
    //checks first if it has anything on, then any support on, then finally just uses the struct count
    let struct_count=p_on[name] != undefined? p_on[name] : (support_on[name] != undefined ? support_on[name] != undefined : global[loci][name].count)
    resource.forEach(res=>{
        let gain=inc.findAct()[name].caps[res](struct_count);// get the gain per resource
        if(res=='Pop'){
            res=global.race.species
        }
        //if it isn't undefined or null, add stuff in
        //this is because somethings have other conditions, banks only give money if you dont have cataclysm and a spaceport on
        if(gain!=undefined && gain !=null){
            caps[res]+=gain;
            breakdown.c[res][title]=gain+'v';
        }
    })
}