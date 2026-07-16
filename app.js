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

loadGame();    const container = document.getElementById("screen-home");
    container.appendChild(createCard(`
      <div style="text-align:center;">
        <div style="font-size:3rem;">🐉</div>
        <h2 class="display" style="color:var(--color-gold);margin-top:8px;">Willkommen zurück, Drachen-Kämpfer!</h2>
        <p style="color:var(--color-ink-dim);">Lerne neue Wörter, sammle Energie und werde zum Wort-Meister.</p>
      </div>
    `));

    const menuGrid = el("div", "grid-2");
    menuGrid.style.marginTop = "16px";
    [
      { label: "Comic lesen", icon: "📖", screen: "comic" },
      { label: "Spiele starten", icon: "🎮", screen: "games" },
      { label: "Vokabeln üben", icon: "📚", screen: "vocab" },
      { label: "Belohnungen", icon: "🏆", screen: "rewards" },
    ].forEach(item => {
      const btn = createButton({
        label: item.label, icon: item.icon, variant: "secondary", block: true,
        onClick: () => this.showScreen(item.screen),
      });
      menuGrid.appendChild(btn);
    });
    container.appendChild(menuGrid);
  },

  renderVocabulary() {
    const container = document.getElementById("screen-vocab");
    container.appendChild(el("h2", "display", "📚 Vokabel-Datenbank"));

    CATEGORIES.forEach(cat => {
      const section = el("div", "");
      section.style.marginTop = "18px";
      section.appendChild(el("h3", "display", `${cat.icon} ${cat.label}`));

      const grid = el("div", "grid-2");
      grid.style.marginTop = "8px";
      getVocabByCategory(cat.id).forEach(word => {
        grid.appendChild(createVocabTile(word, { onSpeak: (text) => Speech.speak(text) }));
      });
      section.appendChild(grid);
      container.appendChild(section);
    });
  },

  renderGamesMenu() {
    const container = document.getElementById("screen-games");
    container.appendChild(el("h2", "display", "🎮 Spiele"));

    const playArea = el("div", "");
    playArea.id = "game-play-area";
    playArea.style.marginTop = "16px";

    const menu = createCard(`<div class="display" style="margin-bottom:10px;">Wähle ein Spiel</div>`);
    const btnRow = el("div", "grid-2");
    btnRow.appendChild(createButton({
      label: "Vokabel-Quiz", icon: "❓", variant: "primary", block: true,
      onClick: () => { clearNode(playArea); QuizGame.start(null, playArea); },
    }));
    btnRow.appendChild(createButton({
      label: "Memory", icon: "🧠", variant: "primary", block: true,
      onClick: () => { clearNode(playArea); MemoryGame.start(null, playArea); },
    }));
    menu.appendChild(btnRow);

    container.appendChild(menu);
    container.appendChild(playArea);
  },

  renderComic() {
    const container = document.getElementById("screen-comic");
    container.appendChild(el("h2", "display", `📖 ${COMIC_STORY.title}`));
    const stage = el("div", "");
    stage.style.marginTop = "14px";
    container.appendChild(stage);
    Comics.render(stage);
  },

  renderRewards() {
    const container = document.getElementById("screen-rewards");
    clearNode(container);
    container.appendChild(el("h2", "display", "🏆 Belohnungen"));

    const summary = createCard(`
      <div style="display:flex;justify-content:space-around;text-align:center;">
        <div><div style="font-size:1.6rem;">${Rewards.state.points}</div><div style="color:var(--color-ink-dim);font-size:0.8rem;">Energie</div></div>
        <div><div style="font-size:1.6rem;">${Rewards.getLevel()}</div><div style="color:var(--color-ink-dim);font-size:0.8rem;">Rang</div></div>
        <div><div style="font-size:1.6rem;">${Rewards.state.wordsLearned}</div><div style="color:var(--color-ink-dim);font-size:0.8rem;">Wörter gelernt</div></div>
      </div>
    `);
    summary.style.marginTop = "12px";
    container.appendChild(summary);

    const badgeHeading = el("h3", "display", "Abzeichen");
    badgeHeading.style.marginTop = "20px";
    container.appendChild(badgeHeading);
    container.appendChild(Rewards.renderBadgeGrid());
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
