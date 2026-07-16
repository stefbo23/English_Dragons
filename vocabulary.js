/* ============================================================
   VOKABEL-DATENBANK
   Platzhalter-Wortschatz orientiert an Tiger, Tom & Co – Band 3.
   Struktur ist bewusst simpel gehalten, damit Steffi eigene
   Units/Wörter einfach ergänzen oder ersetzen kann.
   ============================================================ */

const VOCABULARY = [
  // --- Kategorie: Tiere (Animals) ---
  { id: "an01", en: "dragon",  de: "Drache",   category: "animals", icon: "🐉" },
  { id: "an02", en: "tiger",   de: "Tiger",    category: "animals", icon: "🐯" },
  { id: "an03", en: "cat",     de: "Katze",    category: "animals", icon: "🐱" },
  { id: "an04", en: "dog",     de: "Hund",     category: "animals", icon: "🐶" },
  { id: "an05", en: "bird",    de: "Vogel",    category: "animals", icon: "🐦" },
  { id: "an06", en: "fish",    de: "Fisch",    category: "animals", icon: "🐟" },
  { id: "an07", en: "rabbit",  de: "Hase",     category: "animals", icon: "🐰" },
  { id: "an08", en: "horse",   de: "Pferd",    category: "animals", icon: "🐴" },

  // --- Kategorie: Familie (Family) ---
  { id: "fa01", en: "mother",  de: "Mutter",   category: "family", icon: "👩" },
  { id: "fa02", en: "father",  de: "Vater",    category: "family", icon: "👨" },
  { id: "fa03", en: "sister",  de: "Schwester",category: "family", icon: "👧" },
  { id: "fa04", en: "brother", de: "Bruder",   category: "family", icon: "👦" },
  { id: "fa05", en: "grandma", de: "Oma",      category: "family", icon: "👵" },
  { id: "fa06", en: "grandpa", de: "Opa",      category: "family", icon: "👴" },

  // --- Kategorie: Farben (Colors) ---
  { id: "co01", en: "red",     de: "rot",      category: "colors", icon: "🔴" },
  { id: "co02", en: "blue",    de: "blau",     category: "colors", icon: "🔵" },
  { id: "co03", en: "green",   de: "grün",     category: "colors", icon: "🟢" },
  { id: "co04", en: "yellow",  de: "gelb",     category: "colors", icon: "🟡" },
  { id: "co05", en: "orange",  de: "orange",   category: "colors", icon: "🟠" },
  { id: "co06", en: "purple",  de: "lila",     category: "colors", icon: "🟣" },

  // --- Kategorie: Zahlen (Numbers) ---
  { id: "nu01", en: "one",     de: "eins",     category: "numbers", icon: "1️⃣" },
  { id: "nu02", en: "two",     de: "zwei",     category: "numbers", icon: "2️⃣" },
  { id: "nu03", en: "three",   de: "drei",     category: "numbers", icon: "3️⃣" },
  { id: "nu04", en: "four",    de: "vier",     category: "numbers", icon: "4️⃣" },
  { id: "nu05", en: "five",    de: "fünf",     category: "numbers", icon: "5️⃣" },
  { id: "nu06", en: "six",     de: "sechs",    category: "numbers", icon: "6️⃣" },
  { id: "nu07", en: "seven",   de: "sieben",   category: "numbers", icon: "7️⃣" },

  // --- Kategorie: Schule (School) ---
  { id: "sc01", en: "book",    de: "Buch",     category: "school", icon: "📖" },
  { id: "sc02", en: "pencil",  de: "Bleistift",category: "school", icon: "✏️" },
  { id: "sc03", en: "bag",     de: "Tasche",   category: "school", icon: "🎒" },
  { id: "sc04", en: "chair",   de: "Stuhl",    category: "school", icon: "🪑" },
  { id: "sc05", en: "table",   de: "Tisch",    category: "school", icon: "🪵" },

  // --- Kategorie: Essen (Food) ---
  { id: "fo01", en: "apple",   de: "Apfel",    category: "food", icon: "🍎" },
  { id: "fo02", en: "bread",   de: "Brot",     category: "food", icon: "🍞" },
  { id: "fo03", en: "milk",    de: "Milch",    category: "food", icon: "🥛" },
  { id: "fo04", en: "egg",     de: "Ei",       category: "food", icon: "🥚" },
  { id: "fo05", en: "cake",    de: "Kuchen",   category: "food", icon: "🍰" },
];

const CATEGORIES = [
  { id: "animals", label: "Tiere",   icon: "🐉" },
  { id: "family",  label: "Familie", icon: "👨‍👩‍👧" },
  { id: "colors",  label: "Farben",  icon: "🎨" },
  { id: "numbers", label: "Zahlen",  icon: "🔢" },
  { id: "school",  label: "Schule",  icon: "🎒" },
  { id: "food",    label: "Essen",   icon: "🍎" },
];

function getVocabByCategory(categoryId) {
  return VOCABULARY.filter(w => w.category === categoryId);
}

function getRandomWords(count, excludeId) {
  const pool = VOCABULARY.filter(w => w.id !== excludeId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
