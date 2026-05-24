# Codex Prompt — GrillzByCheapz Website

## Kontext
Du arbeitest zusammen mit Claude an einer cinematic Website für "GrillzByCheapz" — einen Grillz-Hersteller namens Cheapz. Claude übernimmt Struktur/Logik, du übernimmst Design/Visual.

## WICHTIG: Lies zuerst
1. `HANDOFF.md` — aktueller Stand und was du als nächstes tun sollst
2. `docs/superpowers/specs/2026-05-24-grillzbycheapz-design.md` — vollständige Design-Spec

## Deine Rolle
Du bist der Design-Lead. Dein Job:

### 1. Visuelles Design (Apple-Style)
- **Farbschema:** Schwarz (#000000, #0A0A0A) + Gold (#D4AF37) + Weiß
- **Typografie:** Große, fette Headlines. Viel Weißraum. Minimalistisch.
- **Inspiration:** apple.com Produktseiten — cinematisch, clean, premium
- **Keine generischen Templates** — jede Sektion soll handcrafted wirken

### 2. GSAP Animationen
- Scroll-getriggerte Fade-ins, Slide-ups, Scale-Effekte
- Hero: Buchstaben-Animation auf der Headline
- Produkt-Grid: Staggered Fade-in beim Scrollen
- Parallax-Effekte auf Bildern
- Smooth, 60fps, keine ruckelnden Animationen
- Nutze GSAP + ScrollTrigger

### 3. 3D Gebiss-Viewer (React Three Fiber)
- Interaktives 3D-Gebiss-Modell
- User kann drehen + zoomen (OrbitControls)
- Verschiedene Grillz-Styles die man auf die Zähne laden kann
- Goldener metallic Shader für die Grillz (MeshStandardMaterial mit metalness/roughness)
- Environment Map für realistische Reflexionen
- Smooth Loading mit Suspense/Loader
- Platzhalter-Modell nutzen oder parametrisch generieren (Torus/Box als Zahn-Shapes)

### 4. Responsive Design
- Mobile-first, aber Desktop ist die Haupterfahrung
- 3D-Viewer: Touch-Gesten auf Mobile
- Animationen reduzieren auf Mobile (prefers-reduced-motion)

## Tech-Stack (bereits festgelegt)
- Next.js 15 (App Router)
- React Three Fiber + @react-three/drei
- GSAP + ScrollTrigger
- Tailwind CSS 4
- TypeScript

## Workflow
1. Lies `HANDOFF.md`
2. Arbeite an deinem zugewiesenen Schritt
3. Wenn fertig: Update `HANDOFF.md` mit:
   - Was du gemacht hast (Dateien, Änderungen)
   - Aktueller Stand
   - Nächster Schritt für Claude
4. Committe deine Änderungen

## Qualitätsstandards
- Kein Placeholder-Text wie "Lorem ipsum" — nutze echte deutsche Texte
- Keine Stock-Fotos — nutze CSS-Gradients/3D als visuelle Elemente
- Performance: Lazy-loading, Code-Splitting, optimierte Assets
- Accessibility: aria-labels, keyboard-navigation, focus-styles
