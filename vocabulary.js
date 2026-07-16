const vocabulary=[

{
english:"dog",
german:"Hund",
emoji:"🐶"
},

{
english:"cat",
german:"Katze",
emoji:"🐱"
},

{
english:"apple",
german:"Apfel",
emoji:"🍎"
},

{
english:"house",
german:"Haus",
emoji:"🏠"
},

{
english:"sun",
german:"Sonne",
emoji:"☀️"
},

{
english:"car",
german:"Auto",
emoji:"🚗"
},

{
english:"book",
german:"Buch",
emoji:"📖"
},

{
english:"school",
german:"Schule",
emoji:"🏫"
}

];  { id: "nu02", en: "two",     de: "zwei",     category: "numbers", icon: "2️⃣" },
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
