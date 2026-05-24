"use client";

import dynamic from "next/dynamic";
import {
  ArrowDown,
  CalendarDays,
  Gem,
  Instagram,
  MessageCircle,
  Music2,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GrillzStageProps, GrillzStyleId } from "./GrillzStage";

const GrillzStage = dynamic<GrillzStageProps>(
  () => import("./GrillzStage").then((mod) => mod.GrillzStage),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sm uppercase tracking-[0.32em] text-white/45">
        3D laedt
      </div>
    ),
  },
);

const products = [
  {
    category: "Gold",
    name: "24K Signature",
    copy: "Warmer Gelbgold-Look mit klarer Front, polierten Kanten und sauberem Sitz fuer jeden Tag.",
    accentA: "#f5d678",
    accentB: "#b98514",
  },
  {
    category: "Silber",
    name: "Platinum Ice",
    copy: "Kuehle Chrom-Optik, hochglanzpoliert und bewusst reduziert fuer ein praezises Finish.",
    accentA: "#f6f8ff",
    accentB: "#8e97a6",
  },
  {
    category: "Custom",
    name: "Split Cut",
    copy: "Zwei Metalle, ein Abdruck: asymmetrische Kanten, Initialen oder ein eigener Farbverlauf.",
    accentA: "#d4af37",
    accentB: "#101010",
  },
  {
    category: "Diamant",
    name: "Stone Set",
    copy: "Goldene Basis mit gesetzten Highlights, gebaut fuer maximalen Glanz unter Licht.",
    accentA: "#fff2b9",
    accentB: "#d4af37",
  },
];

const styleOptions: Array<{
  id: GrillzStyleId;
  eyebrow: string;
  label: string;
  copy: string;
}> = [
  {
    id: "signature",
    eyebrow: "01",
    label: "Signature Gold",
    copy: "Vollgold-Front mit weicher Spiegelung.",
  },
  {
    id: "platinum",
    eyebrow: "02",
    label: "Platinum",
    copy: "Silberner High-Polish Look.",
  },
  {
    id: "diamond",
    eyebrow: "03",
    label: "Stone Set",
    copy: "Gold mit gesetzten Lichtpunkten.",
  },
  {
    id: "blackgold",
    eyebrow: "04",
    label: "Black Gold",
    copy: "Dunkle Kanten mit goldener Mitte.",
  },
];

const storyPoints = [
  "Cheapz baut Grillz nicht von der Stange. Jeder Abdruck wird geprueft, jede Linie wird angepasst, jedes Finish wird von Hand poliert.",
  "Der Look bleibt laut, die Form bleibt sauber. Das Ergebnis soll auffallen, ohne billig zu wirken.",
  "Vom ersten Abdruck bis zum letzten Glanzpunkt geht es um Passform, Materialgefuehl und einen Style, der zu deinem Gesicht passt.",
];

export default function SiteExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [selectedStyle, setSelectedStyle] = useState<GrillzStyleId>("signature");
  const [upperEnabled, setUpperEnabled] = useState(true);
  const [lowerEnabled, setLowerEnabled] = useState(true);
  const [bookingSent, setBookingSent] = useState(false);

  const headlineLetters = useMemo(
    () =>
      "Dein Style. Dein Grill.".split("").map((letter, index) => ({
        letter,
        index,
      })),
    [],
  );

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallViewport = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          ".hero-letter, .hero-subcopy, .hero-actions, [data-reveal], .product-card",
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
          },
        );
        return;
      }

      gsap.fromTo(
        ".hero-letter",
        { opacity: 0, y: 72, rotateX: -48, transformOrigin: "50% 50% -80px" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.15,
          stagger: 0.032,
          ease: "power4.out",
          delay: 0.18,
        },
      );

      gsap.fromTo(
        ".hero-subcopy, .hero-actions",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
          delay: 0.72,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: smallViewport ? 22 : 44 },
          {
            opacity: 1,
            y: 0,
            duration: smallViewport ? 0.64 : 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      ScrollTrigger.batch(".product-card", {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          }),
      });

      if (!smallViewport) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const amount = Number(element.dataset.parallax ?? -10);

          gsap.to(element, {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function scrollToBooking() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingSent(true);
  }

  return (
    <main ref={rootRef} className="relative isolate overflow-hidden bg-black">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
        <div className="cinema-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="hero-light absolute left-1/2 top-1/2 h-[56vh] w-[72vw] -translate-x-1/2 -translate-y-1/2" />
        <div className="grain" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="pt-16 lg:pt-0">
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-white/62">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-[#D4AF37]" />
              Custom Grillz aus Handarbeit
            </p>
            <h1
              aria-label="Dein Style. Dein Grill."
              className="max-w-5xl text-balance text-[clamp(4.7rem,13vw,12.8rem)] font-black uppercase leading-[0.82] tracking-normal"
            >
              <span aria-hidden="true" className="block overflow-hidden pb-3">
                {headlineLetters.map(({ letter, index }) => (
                  <span key={`${letter}-${index}`} className="hero-letter inline-block">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="hero-subcopy max-w-2xl text-balance text-xl leading-8 text-white/68 sm:text-2xl">
              Handgefertigte Grillz von Cheapz. Praezise angepasst, hart poliert,
              gebaut fuer deinen eigenen Glanz.
            </p>
            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToBooking}
                className="button-gold inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-black uppercase tracking-[0.2em]"
              >
                <CalendarDays aria-hidden="true" className="h-5 w-5" />
                Termin vereinbaren
              </button>
              <a
                href="#viewer"
                className="button-ghost inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-bold uppercase tracking-[0.2em]"
              >
                <Gem aria-hidden="true" className="h-5 w-5 text-[#D4AF37]" />
                Viewer oeffnen
              </a>
            </div>
          </div>

          <div
            className="relative h-[46vh] min-h-[380px] lg:h-[82vh]"
            data-parallax="-7"
            aria-label="Langsam rotierendes 3D-Gebiss mit goldenen Grillz"
          >
            <GrillzStage
              mode="hero"
              selectedStyle="signature"
              upperEnabled
              lowerEnabled
              autoRotate
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/54 backdrop-blur md:inline-flex"
        >
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
          Scroll
        </button>
      </section>

      <section id="products" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <div data-reveal>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
                Kollektion
              </p>
              <h2 className="text-balance text-5xl font-black uppercase leading-none sm:text-7xl lg:text-8xl">
                Vier Looks. Jeder einzeln gebaut.
              </h2>
            </div>
            <p data-reveal className="max-w-2xl text-lg leading-8 text-white/58 lg:justify-self-end">
              Kein Preisraster, keine Massenware. Cheapz plant Material, Finish und
              Sitz nach Abdruck, Stil und Aufwand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="product-card glass-line overflow-hidden rounded-lg bg-white/[0.035] p-3"
                style={
                  {
                    "--product-a": product.accentA,
                    "--product-b": product.accentB,
                  } as CSSProperties
                }
              >
                <div className="product-visual">
                  <div className="product-visual__jaw" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, toothIndex) => (
                      <span
                        key={toothIndex}
                        style={
                          {
                            "--tooth-height": `${70 - Math.abs(3.5 - toothIndex) * 6}px`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                  <div className="product-visual__plate" aria-hidden="true" />
                </div>
                <div className="px-1 pb-2 pt-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-[0.28em] text-[#D4AF37]">
                      {product.category}
                    </span>
                    <span className="text-xs text-white/42">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-normal">{product.name}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-white/58">{product.copy}</p>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white">
                    Preis auf Anfrage
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="viewer" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div data-reveal className="flex flex-col justify-between gap-10">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
                3D Viewer
              </p>
              <h2 className="text-balance text-5xl font-black uppercase leading-none sm:text-7xl">
                Waehle den Glanz, bevor er gebaut wird.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/58">
                Das parametrische Modell zeigt Stil, Kieferauswahl und Materialwirkung
                direkt im Browser. Die echte Passform entsteht spaeter ueber Abdruck und
                Feinarbeit.
              </p>
            </div>

            <div className="space-y-4">
              {styleOptions.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className="group grid w-full grid-cols-[3.5rem_1fr] gap-4 rounded-lg border border-white/12 bg-white/[0.035] p-4 text-left transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.07] aria-pressed:border-[#D4AF37]/70 aria-pressed:bg-[#D4AF37]/[0.1]"
                >
                  <span className="pt-1 text-xs font-black uppercase tracking-[0.22em] text-[#D4AF37]">
                    {style.eyebrow}
                  </span>
                  <span>
                    <span className="block text-lg font-black uppercase">{style.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-white/52">{style.copy}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div data-reveal className="viewer-panel glass-line rounded-lg p-3 sm:p-4">
            <div className="min-h-[560px] overflow-hidden rounded-md border border-white/10 bg-black">
              <GrillzStage
                mode="viewer"
                selectedStyle={selectedStyle}
                upperEnabled={upperEnabled}
                lowerEnabled={lowerEnabled}
                autoRotate={false}
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={upperEnabled}
                onClick={() => setUpperEnabled((value) => !value)}
                className="rounded-lg border border-white/12 bg-white/[0.035] px-5 py-4 text-left font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#D4AF37]/50 aria-pressed:border-[#D4AF37]/70 aria-pressed:text-[#F5D678]"
              >
                Oberkiefer
              </button>
              <button
                type="button"
                aria-pressed={lowerEnabled}
                onClick={() => setLowerEnabled((value) => !value)}
                className="rounded-lg border border-white/12 bg-white/[0.035] px-5 py-4 text-left font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#D4AF37]/50 aria-pressed:border-[#D4AF37]/70 aria-pressed:text-[#F5D678]"
              >
                Unterkiefer
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div
          className="absolute inset-x-0 top-24 h-[44rem] bg-[linear-gradient(115deg,transparent,rgba(212,175,55,0.16),transparent)] opacity-70"
          data-parallax="-12"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div data-reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
              Ueber Cheapz
            </p>
            <h2 className="text-balance text-5xl font-black uppercase leading-none sm:text-7xl lg:text-8xl">
              Jedes Stueck ein Unikat.
            </h2>
          </div>

          <div className="space-y-4">
            {storyPoints.map((point, index) => (
              <p
                key={point}
                data-reveal
                className="rounded-lg border border-white/10 bg-white/[0.035] p-6 text-lg leading-8 text-white/64"
              >
                <span className="mb-6 block text-xs font-black uppercase tracking-[0.26em] text-[#D4AF37]">
                  0{index + 1}
                </span>
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-reveal className="lg:sticky lg:top-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
              Termin buchen
            </p>
            <h2 className="text-balance text-5xl font-black uppercase leading-none sm:text-7xl">
              Dein Abdruck startet hier.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/58">
              Schreib kurz, welcher Look dich interessiert. Cheapz klaert Details,
              Timing und Material direkt mit dir.
            </p>
          </div>

          <form
            data-reveal
            onSubmit={handleBookingSubmit}
            className="glass-line rounded-lg bg-white/[0.035] p-4 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62">
                Name
                <input className="field" name="name" autoComplete="name" required placeholder="Dein Name" />
              </label>
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62">
                Email
                <input
                  className="field"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@mail.de"
                />
              </label>
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62">
                Telefon
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="+49 ..."
                />
              </label>
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62">
                Gewuenschter Stil
                <select className="field" name="style" required defaultValue="">
                  <option value="" disabled>
                    Stil waehlen
                  </option>
                  <option>24K Signature</option>
                  <option>Platinum Ice</option>
                  <option>Split Cut Custom</option>
                  <option>Stone Set</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62">
                Wunschtermin
                <input className="field" name="date" type="date" required />
              </label>
              <label className="space-y-2 text-sm font-bold uppercase tracking-[0.16em] text-white/62 sm:col-span-2">
                Nachricht
                <textarea
                  className="field min-h-36 resize-y"
                  name="message"
                  placeholder="Gold, Silber, Steine, Oberkiefer, Unterkiefer ..."
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="button-gold inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-black uppercase tracking-[0.2em]"
              >
                Anfrage senden
              </button>
              {bookingSent ? (
                <p role="status" className="text-sm font-semibold text-[#F5D678]">
                  Anfrage ist vorbereitet. Die API-Anbindung folgt im naechsten Schritt.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-black uppercase tracking-[0.18em]">GrillzByCheapz</p>
            <p className="mt-2 text-sm text-white/46">© 2026 GrillzByCheapz</p>
          </div>
          <nav aria-label="Social Links" className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/"
              className="button-ghost inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Instagram"
            >
              <Instagram aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/"
              className="button-ghost inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="TikTok"
            >
              <Music2 aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/"
              className="button-ghost inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="WhatsApp"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
