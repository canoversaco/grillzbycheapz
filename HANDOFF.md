# HANDOFF — Claude ↔ Codex Kollaboration

> Diese Datei ist das Kommunikationsprotokoll zwischen Claude und Codex.
> Jeder Agent schreibt hier rein was er gemacht hat und was der nächste Schritt ist.
> **Lies diese Datei IMMER zuerst bevor du arbeitest.**

---

## Aktueller Stand

**Letzter Agent:** Claude
**Datum:** 2026-05-24
**Status:** App-Skeleton komplett, Build erfolgreich

### Was wurde gemacht:
- Git Repo initialisiert (main branch) + GitHub Remote: `github.com/canoversaco/grillzbycheapz`
- Design-Spec: `docs/superpowers/specs/2026-05-24-grillzbycheapz-design.md`
- Next.js 15 App mit allen Sektionen aufgesetzt
- 3D Gebiss-Viewer mit React Three Fiber (parametrisches Modell, 4 Styles, Ober-/Unterkiefer Toggle)
- GSAP ScrollTrigger Animationen (Hero Buchstaben-Animation, Scroll-Reveals, Parallax, Batch-Fade)
- Tailwind CSS Styling: Schwarz/Gold Theme, Apple-style
- Buchungsformular (Frontend-only, API Route fehlt noch)
- `next build` erfolgreich

### Dateien:
- `app/layout.tsx` — Root Layout mit Inter Font, Metadata
- `app/page.tsx` — Entry, rendert SiteExperience
- `app/globals.css` — Globale Styles, Buttons, Animationen, Produkt-Visuals
- `components/SiteExperience.tsx` — Alle Sektionen (Hero, Produkte, 3D Viewer, Über, Buchung, Footer)
- `components/GrillzStage.tsx` — React Three Fiber 3D-Szene mit Gebiss-Modell

### Nächster Schritt (für Codex):
- Lies die Design-Spec in `docs/superpowers/specs/2026-05-24-grillzbycheapz-design.md`
- **Visuelle Polish:** Verbessere das cinematische Feeling — Lichteffekte, Shader-Qualität, Micro-Animationen
- **3D-Modell:** Das aktuelle Gebiss ist parametrisch (RoundedBox). Wenn möglich: realistischere Zahnformen
- **Produkt-Karten:** Hover-Effekte verfeinern, evtl. 3D-Preview pro Karte
- **Mobile:** Touch-Gesten im 3D-Viewer testen/optimieren
- Schreibe deinen Status hier rein wenn du fertig bist

---

## Rollen
- **Claude:** Projekt-Setup, Logik, API Routes, Buchungssystem, Struktur
- **Codex:** Design, Styling, GSAP-Animationen, 3D-Viewer, visuelle Polish

## Regeln
1. Lies HANDOFF.md **immer** bevor du anfängst
2. Schreibe deinen Status **immer** wenn du fertig bist
3. Beschreibe **genau** welche Dateien du erstellt/geändert hast
4. Beschreibe den **nächsten Schritt** für den anderen Agent
5. Mache **keine** Änderungen an Dateien des anderen Agents ohne es hier zu dokumentieren
