export default class LoaderManager{

constructor(hero){

this.hero=hero;

this.loader=null;

}

create(){

this.loader=document.createElement("div");

this.loader.id="rio-loader";

this.loader.innerHTML=`

<div id="rio-loader-circle"></div>

`;

this.hero.appendChild(this.loader);

}

hide(){

requestAnimationFrame(()=>{

this.loader.classList.add("hidden");

setTimeout(()=>{

this.loader.remove();

},900);

});

}

}