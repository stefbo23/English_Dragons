/* ============================================================
   BELOHNUNGEN
   Punkte-, Level- und Abzeichen-System. Zustand lebt nur für
   die aktuelle Sitzung im Speicher (kein localStorage), damit
   die App überall zuverlässig läuft.
   ============================================================ */

const BADGES = [
  { id: "first_word",   label: "Erstes Wort",     icon: "🥚", condition: s => s.wordsLearned >= 1 },
  { id: "ten_words",    label: "Wort-Sammler",    icon: "🔥", condition: s => s.wordsLearned >= 10 },
  { id: "quiz_master",  label: "Quiz-Meister",    icon: "🏆", condition: s => s.quizzesWon >= 3 },
  { id: "memory_champ", label: "Gedächtnis-Champ",icon: "🧠", condition: s => s.memoryWins >= 2 },
  { id: "streak_5",     label: "5er-Serie",       icon: "⚡", condition: s => s.bestStreak >= 5 },
  { id: "dragon_rank",  label: "Drachen-Rang",    icon: "🐉", condition: s => s.points >= 200 },
];

const Rewards = {
  state: {
    points: 0,
    wordsLearned: 0,
    quizzesWon: 0,
    memoryWins: 0,
    bestStreak: 0,
    currentStreak: 0,
    unlockedBadges: [],
  },

  addPoints(amount, reason = "") {
    this.state.points += amount;
    this._checkBadges();
    if (reason) showToast(`+${amount} Energie · ${reason}`);
    App.refreshRewardsUI();
  },

  registerCorrectAnswer() {
    this.state.currentStreak += 1;
    this.state.bestStreak = Math.max(this.state.bestStreak, this.state.currentStreak);
    this.addPoints(10, "Richtig!");
  },

  registerWrongAnswer() {
    this.state.currentStreak = 0;
  },

  registerWordLearned() {
    this.state.wordsLearned += 1;
    this._checkBadges();
  },

  registerQuizWin() {
    this.state.quizzesWon += 1;
    this.addPoints(30, "Quiz gewonnen");
  },

  registerMemoryWin() {
    this.state.memoryWins += 1;
    this.addPoints(25, "Memory geschafft");
  },

  getLevel() {
    // Alle 100 Punkte ein neuer Rang.
    return Math.floor(this.state.points / 100) + 1;
  },

  _checkBadges() {
    BADGES.forEach(badge => {
      const already = this.state.unlockedBadges.includes(badge.id);
      if (!already && badge.condition(this.state)) {
        this.state.unlockedBadges.push(badge.id);
        showToast(`Abzeichen freigeschaltet: ${badge.icon} ${badge.label}`);
      }
    });
  },

  renderBadgeGrid() {
    const grid = el("div", "grid-2");
    BADGES.forEach(badge => {
      const unlocked = this.state.unlockedBadges.includes(badge.id);
      const card = createCard(`
        <div style="text-align:center;opacity:${unlocked ? 1 : 0.3}">
          <div style="font-size:2rem;">${badge.icon}</div>
          <div style="font-size:0.85rem;margin-top:4px;">${badge.label}</div>
        </div>
      `);
      grid.appendChild(card);
    });
    return grid;
  },
};
