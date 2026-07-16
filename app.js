const home=document.getElementById("home");
const world=document.getElementById("world");
const vocabularyScreen=document.getElementById("vocabulary");
const memory=document.getElementById("memory");

const btnStart=document.getElementById("btnStart");
const btnWords=document.getElementById("btnWords");
const btnMemory=document.getElementById("btnMemory");

const btnBack=document.getElementById("btnBack");
const btnBack2=document.getElementById("btnBack2");
const btnBack3=document.getElementById("btnBack3");

let xp=0;
let level=1;
let stars=0;

function saveGame(){

localStorage.setItem("xp",xp);
localStorage.setItem("level",level);
localStorage.setItem("stars",stars);

}

function loadGame(){

xp=parseInt(localStorage.getItem("xp"))||0;
level=parseInt(localStorage.getItem("level"))||1;
stars=parseInt(localStorage.getItem("stars"))||0;

updateBar();

}

function updateBar(){

document.getElementById("xp").innerHTML=xp;
document.getElementById("level").innerHTML=level;
document.getElementById("stars").innerHTML=stars;

}

function hideAll(){

home.classList.add("hidden");
world.classList.add("hidden");
vocabularyScreen.classList.add("hidden");
memory.classList.add("hidden");

}

btnStart.onclick=()=>{

hideAll();

world.classList.remove("hidden");

}

btnWords.onclick=()=>{

hideAll();

vocabularyScreen.classList.remove("hidden");

showVocabulary();

}

btnMemory.onclick=()=>{

hideAll();

memory.classList.remove("hidden");

startMemory();

}

btnBack.onclick=()=>{

hideAll();

home.classList.remove("hidden");

}

btnBack2.onclick=()=>{

hideAll();

home.classList.remove("hidden");

}

btnBack3.onclick=()=>{

hideAll();

home.classList.remove("hidden");

}

function showVocabulary(){

const list=document.getElementById("wordList");

list.innerHTML="";

vocabulary.forEach(word=>{

const div=document.createElement("div");

div.className="wordCard";

div.innerHTML=`

<div class="wordEmoji">${word.emoji}</div>

<div class="wordEnglish">${word.english}</div>

<div class="wordGerman">${word.german}</div>

`;

div.onclick=()=>{

speechSynthesis.cancel();

const u=new SpeechSynthesisUtterance(word.english);

u.lang="en-US";

speechSynthesis.speak(u);

xp+=5;

if(xp>=100){

level++;

xp=0;

}

stars++;

updateBar();

saveGame();

};

list.appendChild(div);

});

}

loadGame();
