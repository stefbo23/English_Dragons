/* ============================================================
   SPIELE
   Zwei eigenständige Lernspiele: Quiz (Multiple Choice) und
   Memory (Paare finden). Beide arbeiten direkt mit VOCABULARY.
   ============================================================ */

const QuizGame = {
  words: [],
  currentIndex: 0,
  correctCount: 0,
  round: 0,
  roundSize: 8,

  start(categoryId, container) {
    const pool = categoryId ? getVocabByCategory(categoryId) : VOCABULARY;
    this.words = [...pool].sort(() => Math.random() - 0.5).slice(0, this.roundSize);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.renderQuestion(container);
  },

  renderQuestion(container) {
    clearNode(container);

    if (this.currentIndex >= this.words.length) {
      this.renderResult(container);
      return;
    }

    const word = this.words[this.currentIndex];
    const distractors = getRandomWords(3, word.id);
    const options = [word, ...distractors].sort(() => Math.random() - 0.5);

    const progress = createProgressBar((this.currentIndex / this.words.length) * 100);
    container.appendChild(progress);

    const questionCard = createCard(`
      <div style="text-align:center;">
        <div style="font-size:3rem;">${word.icon}</div>
        <div class="display" style="font-size:1.3rem;margin-top:8px;">Wie heißt das auf Englisch?</div>
        <div style="color:var(--color-ink-dim);margin-top:4px;">${word.de}</div>
      </div>
    `);
    questionCard.style.marginTop = "12px";
    container.appendChild(questionCard);

    const speakBtn = createButton({ label: "Anhören", variant: "ghost", icon: "🔊", onClick: () => Speech.speak(word.en) });
    container.appendChild(speakBtn);

    const optionsWrap = el("div", "grid-2");
    optionsWrap.style.marginTop = "16px";

    options.forEach(opt => {
      const btn = createButton({
        label: opt.en,
        variant: "secondary",
        block: true,
        onClick: () => this.handleAnswer(opt.id === word.id, container),
      });
      optionsWrap.appendChild(btn);
    });

    container.appendChild(optionsWrap);
  },

  handleAnswer(isCorrect, container) {
    if (isCorrect) {
      this.correctCount += 1;
      Rewards.registerCorrectAnswer();
      showToast("Richtig! 🔥");
    } else {
      Rewards.registerWrongAnswer();
      showToast("Fast! Versuch's beim nächsten Wort.");
    }
    this.currentIndex += 1;
    setTimeout(() => this.renderQuestion(container), 500);
  },

  renderResult(container) {
    clearNode(container);
    const pct = Math.round((this.correctCount / this.words.length) * 100);
    if (pct >= 70) Rewards.registerQuizWin();

    const resultCard = createCard(`
      <div style="text-align:center;">
        <div style="font-size:2.5rem;">${pct >= 70 ? "🏆" : "💪"}</div>
        <div class="display" style="font-size:1.4rem;margin-top:8px;">${this.correctCount} von ${this.words.length} richtig!</div>
        <div style="color:var(--color-ink-dim);margin-top:4px;">${pct >= 70 ? "Starke Runde, Drachen-Kämpfer!" : "Weiter trainieren — du schaffst das!"}</div>
      </div>
    `);
    container.appendChild(resultCard);

    const again = createButton({
      label: "Nochmal spielen", variant: "primary", icon: "🔁", block: true,
      onClick: () => this.start(null, container),
    });
    again.style.marginTop = "16px";
    container.appendChild(again);
  },
};

const MemoryGame = {
  cards: [],
  flipped: [],
  matchedCount: 0,

  start(categoryId, container) {
    const pool = categoryId ? getVocabByCategory(categoryId) : VOCABULARY;
    const words = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);

    this.cards = words.flatMap(w => ([
      { key: w.id + "-en", pairId: w.id, label: w.en, matched: false },
      { key: w.id + "-de", pairId: w.id, label: w.de, matched: false },
    ])).sort(() => Math.random() - 0.5);

    this.flipped = [];
    this.matchedCount = 0;
    this.render(container);
  },

  render(container) {
    clearNode(container);
    const grid = el("div", "");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "10px";

    this.cards.forEach(card => {
      const isFaceUp = card.matched || this.flipped.includes(card.key);
      const tile = el("div", "card", isFaceUp ? card.label : "❔");
      tile.style.textAlign = "center";
      tile.style.padding = "18px 6px";
      tile.style.fontSize = "0.95rem";
      tile.style.cursor = card.matched ? "default" : "pointer";
      tile.style.opacity = card.matched ? 0.4 : 1;
      if (!card.matched) {
        tile.addEventListener("click", () => this.flip(card.key, container));
      }
      grid.appendChild(tile);
    });

    container.appendChild(grid);

    const status = el("div", "", `Paare gefunden: ${this.matchedCount} / ${this.cards.length / 2}`);
    status.style.textAlign = "center";
    status.style.marginTop = "14px";
    status.style.color = "var(--color-ink-dim)";
    container.appendChild(status);
  },

  flip(key, container) {
    if (this.flipped.includes(key) || this.flipped.length === 2) return;
    this.flipped.push(key);
    this.render(container);

    if (this.flipped.length === 2) {
      const [a, b] = this.flipped.map(k => this.cards.find(c => c.key === k));
      if (a.pairId === b.pairId) {
        a.matched = true; b.matched = true;
        this.matchedCount += 1;
        Rewards.addPoints(15, "Paar gefunden");
        this.flipped = [];
        this.render(container);
        if (this.matchedCount === this.cards.length / 2) {
          Rewards.registerMemoryWin();
          setTimeout(() => showToast("Alle Paare gefunden! 🐉"), 300);
        }
      } else {
        setTimeout(() => {
          this.flipped = [];
          this.render(container);
        }, 800);
      }
    }
  },
};
