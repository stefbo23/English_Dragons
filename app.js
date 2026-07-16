/* ============================================================
   APP-CONTROLLER
   Verbindet Screens, Navigation und Zustand. Kein Framework —
   einfache Screen-Umschaltung per CSS-Klassen.
   ============================================================ */

const App = {
  currentScreen: "home",

  init() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => this.showScreen(btn.dataset.screen));
    });
    this.renderHome();
    this.renderVocabulary();
    this.renderGamesMenu();
    this.renderComic();
    this.renderRewards();
    this.showScreen("home");
    this.refreshRewardsUI();
  },

  showScreen(name) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(`screen-${name}`).classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.screen === name));
    this.currentScreen = name;
    if (name === "rewards") this.renderRewards();
  },

  refreshRewardsUI() {
    const pointsEl = document.getElementById("points-display");
    if (pointsEl) pointsEl.textContent = `${Rewards.state.points} ⚡`;
  },

  renderHome() {
    const container = document.getElementById("screen-home");
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
