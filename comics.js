/* ============================================================
   COMICS
   Eigenständige Abenteuergeschichte ("Kai & Ryu — Die Suche nach
   den Energie-Kugeln"), original erfunden im Geist von Trainings-
   /Kampf-Abenteuern, OHNE geschützte Charaktere oder Namen.
   Panels bestehen aus Emoji + CSS statt Bilddateien, damit die
   App komplett offline und lizenzfrei funktioniert.
   ============================================================ */

const COMIC_STORY = {
  title: "Kai & Ryu — Die Suche nach den Energie-Kugeln",
  panels: [
    {
      bg: "linear-gradient(160deg,#241E3D,#3A2F5C)",
      scene: "🏔️🐉",
      speaker: "Kai",
      text: "Ryu, dort vorne warten neue Wörter! Bist du bereit für dein Training?",
      vocabId: null,
    },
    {
      bg: "linear-gradient(160deg,#1F3A3A,#14514B)",
      scene: "🐉✨",
      speaker: "Ryu",
      text: "Ich spüre die Energie eines {word}! Lass es uns finden.",
      vocabId: "an01", // dragon
    },
    {
      bg: "linear-gradient(160deg,#3D2A1F,#5C3A1E)",
      scene: "🧑‍🎤🎒",
      speaker: "Kai",
      text: "In meiner {word} habe ich alles, was wir brauchen.",
      vocabId: "sc03", // bag
    },
    {
      bg: "linear-gradient(160deg,#241E3D,#412F5C)",
      scene: "🐉🔴",
      speaker: "Ryu",
      text: "Schau! Eine {word} Energie-Kugel — sie leuchtet!",
      vocabId: "co01", // red
    },
    {
      bg: "linear-gradient(160deg,#1F2E3D,#183A5C)",
      scene: "🧑‍🎤🐉💥",
      speaker: "Kai & Ryu",
      text: "Zusammen sind wir stark! Auf zum nächsten Wort-Abenteuer!",
      vocabId: null,
    },
  ],
};

const Comics = {
  currentPanel: 0,

  render(container) {
    clearNode(container);
    const panel = COMIC_STORY.panels[this.currentPanel];
    const word = panel.vocabId ? VOCABULARY.find(w => w.id === panel.vocabId) : null;
    const text = word ? panel.text.replace("{word}", `<strong style="color:var(--color-gold)">${word.en}</strong>`) : panel.text;

    const stage = el("div", "card", "");
    stage.style.background = panel.bg;
    stage.style.textAlign = "center";
    stage.style.minHeight = "260px";
    stage.style.display = "flex";
    stage.style.flexDirection = "column";
    stage.style.justifyContent = "center";
    stage.style.gap = "16px";

    const sceneEl = el("div", "", panel.scene);
    sceneEl.style.fontSize = "3.5rem";

    const bubble = el("div", "", `
      <div style="background:rgba(23,19,38,0.75);border-radius:16px;padding:14px 18px;display:inline-block;max-width:90%;">
        <div style="font-size:0.75rem;color:var(--color-sky);font-family:var(--font-display);margin-bottom:4px;">${panel.speaker}</div>
        <div>${text}</div>
      </div>
    `);

    stage.appendChild(sceneEl);
    stage.appendChild(bubble);
    container.appendChild(stage);

    if (word) {
      const speakBtn = createButton({
        label: `"${word.en}" anhören`,
        variant: "secondary",
        icon: "🔊",
        onClick: () => Speech.speak(word.en),
      });
      speakBtn.style.marginTop = "12px";
      container.appendChild(speakBtn);
    }

    const nav = el("div", "");
    nav.style.display = "flex";
    nav.style.justifyContent = "space-between";
    nav.style.marginTop = "16px";

    const prevBtn = createButton({
      label: "Zurück", variant: "ghost", icon: "◀",
      onClick: () => { this.currentPanel = Math.max(0, this.currentPanel - 1); this.render(container); },
    });
    prevBtn.disabled = this.currentPanel === 0;

    const nextBtn = createButton({
      label: this.currentPanel === COMIC_STORY.panels.length - 1 ? "Nochmal von vorne" : "Weiter",
      variant: "primary", icon: "▶",
      onClick: () => {
        if (this.currentPanel === COMIC_STORY.panels.length - 1) {
          this.currentPanel = 0;
        } else {
          this.currentPanel += 1;
          if (word) Rewards.registerWordLearned();
        }
        this.render(container);
      },
    });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    container.appendChild(nav);

    const progress = createProgressBar(((this.currentPanel + 1) / COMIC_STORY.panels.length) * 100);
    progress.style.marginTop = "12px";
    container.appendChild(progress);
  },
};
