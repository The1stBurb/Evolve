let name;
let title;
let is_true;
function c(){
    console.log(name,title,is_true)
    name=null,title=null,is_true=null;
}
c()
c(name='fish',title='debt',is_true='oops')
c()