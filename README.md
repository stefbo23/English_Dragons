# Pablo's Power Quest 🚀

**Learn English. Become a Hero.**

Eine kindgerechte HTML5-Lernspiel-App, mit der ein 9-jähriges Kind
spielerisch Englisch für die 3. Klasse und für Urlaubssituationen übt.
Läuft komplett offline, ohne Backend, ohne Tracking und ohne API-Schlüssel —
nur HTML, CSS und Vanilla JavaScript.

> **Status:** Diese Version entsteht in mehreren Bauphasen. Aktuell
> abgeschlossen: **Phase 1 – Projektstruktur und Grundsystem**
> (Navigation, Speichersystem, Belohnungssystem-Grundgerüst, alle
> Minispiel-Grundgerüste, Elternbereich, Einstellungen, PWA/Offline).
> Inhalte (Vokabeln, Comics, Missionen je Welt) werden in den
> nächsten Phasen deutlich erweitert.

## 1. Projekt bei GitHub anlegen

1. Bei [github.com](https://github.com) anmelden.
2. Auf **New repository** klicken.
3. Namen vergeben, z. B. `pablos-power-quest`.
4. Sichtbarkeit auf **Public** stellen (wichtig für kostenlose GitHub Pages).
5. Repository ohne README erstellen (wir haben bereits eines).

## 2. Dateien hochladen

**Option A — im Browser:**
Alle Dateien und Ordner dieses Projekts per Drag & Drop in die
GitHub-Weboberfläche ziehen ("Add file" → "Upload files").

**Option B — per Git:**
```bash
git init
git add .
git commit -m "Pablo's Power Quest — Phase 1"
git branch -M main
git remote add origin https://github.com/DEIN-NUTZERNAME/pablos-power-quest.git
git push -u origin main
```

## 3. GitHub Pages aktivieren

1. Im Repository auf **Settings** gehen.
2. Im Menü links auf **Pages** klicken.
3. Unter **Source** die Option **Deploy from a branch** wählen.
4. Branch `main` und Ordner `/ (root)` auswählen, dann **Save**.
5. Nach ein bis zwei Minuten ist die App unter
   `https://DEIN-NUTZERNAME.github.io/pablos-power-quest/` erreichbar.

## 4. App im Browser öffnen

Einfach den obigen Link öffnen. Die App funktioniert in Safari, Chrome
und Firefox auf iPhone, iPad, Mac und Desktop-Rechnern.

## 5. App auf dem iPhone/iPad-Home-Bildschirm speichern

1. Die App-URL in **Safari** öffnen (wichtig: Safari, nicht Chrome).
2. Auf das **Teilen-Symbol** (Quadrat mit Pfeil) tippen.
3. **Zum Home-Bildschirm** auswählen.
4. Namen bestätigen — die App erscheint danach als eigenes Icon und
   startet im Vollbildmodus ohne Browserleiste.

## 6. Lokales Testen

Da die App `fetch()` verwendet, um die JSON-Lerninhalte zu laden,
funktioniert das direkte Öffnen der `index.html` per Doppelklick
(`file://…`) in manchen Browsern nur eingeschränkt. Für zuverlässiges
lokales Testen einen kleinen lokalen Server starten, zum Beispiel:

```bash
# Python (meist vorinstalliert)
python3 -m http.server 8080

# oder Node.js
npx serve .
```

Danach im Browser `http://localhost:8080` öffnen.

## 7. Häufige Fehler beheben

| Problem | Lösung |
|---|---|
| Weltkarte/Vokabeln bleiben leer | App über einen lokalen Server oder GitHub Pages öffnen, nicht per Doppelklick auf `index.html`. |
| Kein Ton | In den Einstellungen prüfen, ob Sound/Sprachausgabe aktiviert sind; Gerät nicht stummgeschaltet? |
| Sprachausgabe/Mikrofon funktioniert nicht | Nicht jeder Browser unterstützt die Web Speech API (z. B. Firefox teilweise eingeschränkt) — die App fällt dann automatisch freundlich zurück. |
| Änderungen erscheinen nicht | Der Service Worker cached Dateien für Offline-Nutzung. Browser-Cache leeren oder im Inkognito-Fenster testen. |
| "Zum Home-Bildschirm" fehlt | Diese Funktion ist nur in Safari auf iOS verfügbar, nicht in Chrome auf dem iPhone. |
| GitHub Pages zeigt 404 | Prüfen, ob `index.html` im Root-Verzeichnis liegt und Pages auf Branch `main` / `root` zeigt. |

## Projektstruktur

```
pablos-power-quest/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
├── css/
├── js/
├── data/
└── assets/
```

## Testcheckliste (Phase 1)

- [ ] Startbildschirm lädt und zeigt Titel, Level, Sterne, Power-Orbs
- [ ] Navigation zwischen Start, Weltkarte, Profil, Fortschritt, Einstellungen funktioniert
- [ ] Fortschritt (Level/XP/Sterne) wird nach Neuladen weiterhin angezeigt (localStorage)
- [ ] Nur "Home Village" ist zu Beginn freigeschaltet, restliche Welten sind sichtbar aber gesperrt
- [ ] Quiz, Memory, Satzbau, Dialog, Hörspiel, Sprechübung sind einzeln über "Minispiele" spielbar
- [ ] Einstellungen (Musik, Sound, Sprache, große Schrift, Animationen) bleiben nach Neuladen gespeichert
- [ ] Elternbereich verlangt Rechenaufgabe und zeigt danach Statistiken
- [ ] "Fortschritt zurücksetzen" fragt vorher eine Sicherheitsbestätigung ab
- [ ] App funktioniert offline nach dem ersten Laden (Service Worker)
- [ ] App funktioniert auf kleinen Bildschirmen (ab ca. 320px Breite)
- [ ] Sprachausgabe/-erkennung fällt bei fehlender Unterstützung sauber und ohne Konsolenfehler zurück
- [ ] Keine Fehler in der Browser-Konsole beim normalen Durchklicken

## Lizenz & rechtliche Hinweise

Alle Figuren, Namen und Grafiken sind eigenständig erstellt (SVG/CSS)
und unabhängig von bestehenden Marken oder Anime-Serien. Keine
Registrierung, keine Werbung, keine externen Tracker, keine
Datenübertragung an Dritte.
