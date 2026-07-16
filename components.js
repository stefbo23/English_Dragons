/* ============================================================
   KOMPONENTEN
   Kleine, wiederverwendbare UI-Bausteine als reine Funktionen,
   die DOM-Elemente zurückgeben. Kein Framework nötig.
   ============================================================ */

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function createButton({ label, variant = "primary", onClick, icon = "", block = false, disabled = false }) {
  const btn = el("button", `btn btn--${variant}${block ? " btn--block" : ""}`);
  btn.innerHTML = `${icon ? `<span>${icon}</span> ` : ""}${label}`;
  btn.disabled = disabled;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

function createCard(contentHTML, extraClass = "") {
  return el("div", `card ${extraClass}`, contentHTML);
}

function createProgressBar(percent) {
  const wrap = el("div", "progress-bar");
  const fill = el("div", "progress-bar__fill");
  fill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  wrap.appendChild(fill);
  return wrap;
}

function createVocabTile(word, { showTranslation = true, onSpeak } = {}) {
  const tile = el("div", "card", `
    <div style="font-size:2.4rem;text-align:center;">${word.icon}</div>
    <div style="text-align:center;margin-top:8px;">
      <div class="display" style="font-size:1.2rem;color:var(--color-gold)">${word.en}</div>
      ${showTranslation ? `<div style="color:var(--color-ink-dim);font-size:0.9rem;">${word.de}</div>` : ""}
    </div>
  `);
  tile.style.cursor = "pointer";
  if (onSpeak) tile.addEventListener("click", () => onSpeak(word.en));
  return tile;
}

let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = el("div", "toast");
    toast.id = "global-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
