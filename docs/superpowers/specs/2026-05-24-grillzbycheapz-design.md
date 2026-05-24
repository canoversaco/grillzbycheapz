# GrillzByCheapz — Design Spec

## Übersicht
Cinematic one-page website für den Grillz-Hersteller "Cheapz". Apple-inspiriertes Design mit 3D-Gebiss-Viewer, scroll-getriggerten Animationen und Terminbuchung.

## Zielgruppe
Kunden die Custom-Grillz wollen — Streetwear/Hip-Hop Szene, modebewusst, 18-35 Jahre.

## Farbschema & Visuell
- **Primär:** Schwarz (#000000) / Tiefgrau (#0A0A0A)
- **Akzent:** Gold (#D4AF37) / Champagner-Gold (#C9A94E)
- **Text:** Weiß (#FFFFFF) / Hellgrau (#A0A0A0)
- **Stil:** Apple-like — große Typografie, viel Weißraum, cinematische Übergänge
- **Font:** SF Pro Display oder Inter (Headline), Inter (Body)

## Sektionen

### 1. Hero (Fullscreen)
- 3D-Gebiss-Modell dreht sich langsam im Zentrum
- Headline: "Dein Style. Dein Grill." — Fade-in mit Buchstaben-Animation
- Subtitel: "Handgefertigte Grillz von Cheapz"
- CTA-Button: "Termin vereinbaren" → scrollt zu Buchung
- Parallax-Tiefeneffekt im Hintergrund

### 2. Produkte / Galerie
- Grid-Layout mit Hover-Zoom-Effekt
- Kategorien: Gold, Silber, Custom, Diamant
- Jedes Produkt hat Bild, Name, kurze Beschreibung
- Scroll-triggered Fade-in der Karten
- Kein Preis — stattdessen "Preis auf Anfrage"

### 3. 3D Grillz Viewer
- Interaktives Gebiss-Modell (React Three Fiber)
- User kann drehen, zoomen
- Grillz-Style-Auswahl: verschiedene Designs auf die Zähne laden
- Toggle für Ober-/Unterkiefer
- Goldener Glanz-Shader auf den Grillz

### 4. Über Cheapz
- Story/Bio des Herstellers
- Parallax-Bilder
- Handwerk-Fokus: "Jedes Stück ein Unikat"
- Fade-in Text-Blöcke beim Scrollen

### 5. Termin buchen
- Formularfelder: Name, Email, Telefon, Gewünschter Stil (Dropdown), Wunschtermin (Date Picker), Nachricht (optional)
- Bei Absenden: Kalendereintrag wird erstellt (API-Integration — Kalender-App TBD)
- Bestätigungs-Feedback inline
- Goldener Submit-Button mit Hover-Glow

### 6. Footer
- Social Links: Instagram, TikTok, WhatsApp
- Impressum / Datenschutz Links
- Copyright "© 2026 GrillzByCheapz"
- Minimalistisch, dunkel

## Tech-Stack
- **Framework:** Next.js 15 (App Router)
- **3D:** React Three Fiber + @react-three/drei
- **Animationen:** GSAP + ScrollTrigger
- **Styling:** Tailwind CSS 4
- **3D-Modell:** Platzhalter-GLB (generisches Zahn-Modell)
- **Sprache:** Deutsch
- **Deployment:** TBD (Vercel empfohlen)

## Terminbuchung — Architektur
- Frontend-Formular validiert Client-seitig
- POST an Next.js API Route `/api/booking`
- API Route erstellt Kalendereintrag (Adapter-Pattern für verschiedene Kalender-Apps)
- Kalender-Integration wird später angebunden (Google Calendar, Apple Calendar, Outlook — TBD)
- Fallback: Email-Benachrichtigung an cheapz mit Termindetails

## Claude ↔ Codex Kollaboration
- `HANDOFF.md` im Repo-Root
- Nach jedem Arbeitsschritt schreibt der aktive Agent:
  - Was wurde gemacht (Dateien, Änderungen)
  - Aktueller Stand
  - Nächster Schritt für den anderen Agent
- **Claude:** Projekt-Setup, Logik, API Routes, Buchungssystem, Struktur
- **Codex:** Design, Styling, Animationen, 3D-Viewer, visuelle Polish

## Nicht im Scope (V1)
- E-Commerce / Warenkorb / Checkout
- User-Accounts / Login
- CMS / Admin-Panel
- Multi-Sprache (nur Deutsch)
- Payment-Integration
