/* ============================================================
   SPRACHE
   Kapselt Web Speech API: Aussprache vorlesen (TTS) und,
   falls verfügbar, Nachsprechen erkennen (STT) als Übung.
   ============================================================ */

const Speech = {
  supportsTTS: "speechSynthesis" in window,
  supportsSTT: "webkitSpeechRecognition" in window || "SpeechRecognition" in window,

  speak(text, lang = "en-US") {
    if (!this.supportsTTS) {
      showToast("Sprachausgabe wird auf diesem Gerät nicht unterstützt.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  },

  // Lässt das Kind ein Wort nachsprechen und prüft grob die Übereinstimmung.
  listenFor(expectedWord, { onResult, onError } = {}) {
    if (!this.supportsSTT) {
      onError && onError("Spracherkennung wird auf diesem Gerät nicht unterstützt.");
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognizer = new Recognition();
    recognizer.lang = "en-US";
    recognizer.maxAlternatives = 3;

    recognizer.onresult = (event) => {
      const heard = event.results[0][0].transcript.toLowerCase().trim();
      const isMatch = heard.includes(expectedWord.toLowerCase());
      onResult && onResult({ heard, isMatch });
    };
    recognizer.onerror = (event) => onError && onError(event.error);
    recognizer.start();
  },
};
