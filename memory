let memoryCards = [];
let openedCards = [];
let lockBoard = false;

function startMemory() {

    const board = document.getElementById("memoryBoard");

    board.innerHTML = "";

    memoryCards = [];
    openedCards = [];
    lockBoard = false;

    // Zufällige 6 Wörter auswählen
    const words = [...vocabulary]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

    words.forEach(word => {

        memoryCards.push({
            id: word.english,
            value: word.english,
            type: "english",
            done: false
        });

        memoryCards.push({
            id: word.english,
            value: word.german,
            type: "german",
            done: false
        });

    });

    memoryCards.sort(() => Math.random() - 0.5);

    memoryCards.forEach((card, index) => {

        const div = document.createElement("div");

        div.className = "memoryCard";

        div.dataset.index = index;

        div.innerHTML = "?";

        div.onclick = () => flipCard(index);

        board.appendChild(div);

    });

}

function flipCard(index){

    if(lockBoard) return;

    const card = memoryCards[index];

    if(card.done) return;

    const element = document.querySelectorAll(".memoryCard")[index];

    if(element.classList.contains("open")) return;

    element.classList.add("open");

    element.innerHTML = card.value;

    openedCards.push({
        index,
        card,
        element
    });

    if(openedCards.length==2){

        lockBoard=true;

        setTimeout(checkCards,700);

    }

}

function checkCards(){

    const first = openedCards[0];

    const second = openedCards[1];

    if(first.card.id==second.card.id){

        first.card.done=true;

        second.card.done=true;

        first.element.classList.add("done");

        second.element.classList.add("done");

        stars+=2;

        xp+=10;

        if(xp>=100){

            xp=0;

            level++;

            alert("🎉 LEVEL UP!");

        }

        updateBar();

        saveGame();

    }

    else{

        first.element.classList.remove("open");

        second.element.classList.remove("open");

        first.element.innerHTML="?";

        second.element.innerHTML="?";

    }

    openedCards=[];

    lockBoard=false;

    checkVictory();

}

function checkVictory(){

    const finished = memoryCards.every(c=>c.done);

    if(finished){

        setTimeout(()=>{

            alert("🏆 Super!\n\nDu hast Memory geschafft!");

            stars+=10;

            xp+=30;

            updateBar();

            saveGame();

        },500);

    }

}
