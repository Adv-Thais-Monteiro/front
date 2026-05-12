import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoSymbol from "./LogoSymbol";
import { MASSAGISTAS } from "./massagistasData";
import "./projetos.css";

const HERO_PLAYLIST = [
  { id: 1059482034, hash: "0bdd8253a0" as string | null },
];

const CITIES = [
  { name: "Aracaju", state: "SE", slug: "aracaju-se" },
  { name: "Belo Horizonte", state: "MG", slug: "belo-horizonte-mg" },
  { name: "Brasília", state: "DF", slug: "brasilia-df" },
  { name: "Curitiba", state: "PR", slug: "curitiba-pr" },
  { name: "Florianópolis", state: "SC", slug: "florianopolis-sc" },
  { name: "Fortaleza", state: "CE", slug: "fortaleza-ce" },
  { name: "Goiânia", state: "GO", slug: "goiania-go" },
  { name: "João Pessoa", state: "PB", slug: "joao-pessoa-pb" },
  { name: "Maceió", state: "AL", slug: "maceio-al" },
  { name: "Manaus", state: "AM", slug: "manaus-am" },
  { name: "Natal", state: "RN", slug: "natal-rn" },
  { name: "Porto Alegre", state: "RS", slug: "porto-alegre-rs" },
  { name: "Recife", state: "PE", slug: "recife-pe" },
  { name: "Rio de Janeiro", state: "RJ", slug: "rio-de-janeiro-rj" },
  { name: "Salvador", state: "BA", slug: "salvador-ba" },
  { name: "São Paulo", state: "SP", slug: "sao-paulo-sp" },
  { name: "Vitória", state: "ES", slug: "vitoria-es" },
];

declare global {
  interface Window {
    Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer };
  }
}

interface VimeoPlayer {
  setMuted(m: boolean): Promise<void>;
  setVolume(v: number): Promise<void>;
  on(event: string, cb: (...args: unknown[]) => void): void;
  loadVideo(url: string): Promise<void>;
  play(): Promise<void>;
}

// Hero h1: 3 partes plana | <em> | plana, com <br/> entre 2 e 3
const H1_PRE = "Profissionais de ";
const H1_EM = "bem-estar";
const H1_POST = "perto de você.";
const H1_TOTAL = H1_PRE.length + H1_EM.length + H1_POST.length;
const H1_BR_AT = H1_PRE.length + H1_EM.length;

// Loading screen: mostra na 1ª entrada (page load) pra dar tempo do vídeo
// do hero carregar. Navegação SPA subsequente pula o loading.
let firstVisitLoading = true;

const Projetos = () => {
  const [showLoading, setShowLoading] = useState(firstVisitLoading);
  const [showCidades, setShowCidades] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [h1Typed, setH1Typed] = useState(0);
  const [h1Done, setH1Done] = useState(false);
  // Vídeo inicial do hero: índice aleatório a cada mount
  const [heroStartIdx] = useState(() =>
    Math.floor(Math.random() * HERO_PLAYLIST.length)
  );
  const navRef = useRef<HTMLElement>(null);
  const heroIframeRef = useRef<HTMLIFrameElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const openCidades = () => {
    setShowCidades(true);
    document.body.style.overflow = "hidden";
  };
  const closeCidades = () => {
    setShowCidades(false);
    document.body.style.overflow = "auto";
  };

  // Loading screen: trava scroll, libera após 2s na 1ª entrada
  useEffect(() => {
    if (!firstVisitLoading) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      firstVisitLoading = false;
      setShowLoading(false);
      document.body.style.overflow = "auto";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Hero h1 typewriter — só começa depois do loading sumir
  useEffect(() => {
    if (showLoading) return;
    setH1Typed(0);
    setH1Done(false);
    let pos = 0;
    const interval = setInterval(() => {
      pos += 1;
      setH1Typed(pos);
      if (pos >= H1_TOTAL) {
        clearInterval(interval);
        setTimeout(() => setH1Done(true), 700);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [showLoading]);

  // ESC fecha modal cidades / menu mobile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCidades();
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("keyup", onKey);
    return () => document.removeEventListener("keyup", onKey);
  }, []);

  // Trava scroll do body enquanto menu mobile aberto
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [showMobileMenu]);

  // IntersectionObserver para animar elementos
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".animate-on-scroll, .col-anim")
        .forEach((el) => el.classList.add("animate"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" }
    );
    const targets = document.querySelectorAll(
      ".projetos-page .animate-on-scroll, .projetos-page .col-anim"
    );
    targets.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => {
      targets.forEach((el) => {
        if (!el.classList.contains("animate")) el.classList.add("animate");
      });
    }, 2500);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  // Nav scroll: alterna entre transparente e sólida
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const TH = 40;
    let ticking = false;
    const update = () => {
      if (window.scrollY > TH) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
      ticking = false;
    };
    update();
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reels lazy Vimeo (carrega 10s após mount)
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      ".projetos-page .reel-card[data-vimeo-id]"
    );
    if (!cards.length) return;
    const timer = setTimeout(() => {
      cards.forEach((card) => {
        if (card.querySelector(".reel-video")) return;
        const id = card.dataset.vimeoId;
        const h = card.dataset.vimeoH || "";
        const params =
          "background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1" +
          (h ? "&h=" + h : "");
        const iframe = document.createElement("iframe");
        iframe.className = "reel-video";
        iframe.src = `https://player.vimeo.com/video/${id}?${params}`;
        iframe.title = "Vídeo em destaque";
        iframe.setAttribute(
          "allow",
          "autoplay; encrypted-media; picture-in-picture"
        );
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.setAttribute("tabindex", "-1");
        iframe.addEventListener("load", () => iframe.classList.add("loaded"));
        const thumb = card.querySelector(".reel-thumb");
        if (thumb) thumb.after(iframe);
        else card.prepend(iframe);
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Vimeo Hero Playlist (sequência de vídeos no background)
  useEffect(() => {
    if (HERO_PLAYLIST.length < 2) return;
    const urlOf = (item: typeof HERO_PLAYLIST[number]) =>
      item.hash
        ? `https://vimeo.com/${item.id}/${item.hash}`
        : `https://vimeo.com/${item.id}`;
    const bootstrap = () => {
      const iframe = heroIframeRef.current;
      if (!iframe || !window.Vimeo) return;
      const player = new window.Vimeo.Player(iframe);
      let current = heroStartIdx;
      player.setMuted(true).catch(() => {});
      player.setVolume(0).catch(() => {});
      player.on("ended", () => {
        current = (current + 1) % HERO_PLAYLIST.length;
        const next = HERO_PLAYLIST[current];
        player
          .loadVideo(urlOf(next))
          .then(() => {
            player.setMuted(true).catch(() => {});
            player.setVolume(0).catch(() => {});
            return player.play();
          })
          .catch(() => {});
      });
    };
    if (window.Vimeo) {
      bootstrap();
    } else {
      const s = document.createElement("script");
      s.src = "https://player.vimeo.com/api/player.js";
      s.async = true;
      s.onload = bootstrap;
      document.head.appendChild(s);
    }
  }, []);

  // Hero typewriter (revela char-por-char)
  useEffect(() => {
    if (
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      [badgeRef.current, pRef.current].forEach(
        (el) => el && el.classList.add("tw-active")
      );
      setH1Typed(H1_TOTAL);
      setH1Done(true);
      return;
    }

    const wrapChars = (el: HTMLElement) => {
      const chars: HTMLSpanElement[] = [];
      const walk = (node: Node, ctx: { firstInBlock: boolean }) => {
        const kids = Array.from(node.childNodes);
        for (const k of kids) {
          if (k.nodeType === 3) {
            let text = (k.textContent || "").replace(/\s+/g, " ");
            if (ctx.firstInBlock) text = text.replace(/^\s+/, "");
            if (!text.length) {
              k.parentNode?.removeChild(k);
              continue;
            }
            const frag = document.createDocumentFragment();
            for (const ch of text) {
              const s = document.createElement("span");
              s.className = "tw-char";
              s.textContent = ch;
              chars.push(s);
              frag.appendChild(s);
            }
            (k as ChildNode).replaceWith(frag);
            ctx.firstInBlock = false;
          } else if (k.nodeType === 1) {
            const elNode = k as HTMLElement;
            if (elNode.tagName === "BR") {
              ctx.firstInBlock = true;
            } else {
              walk(elNode, ctx);
            }
          }
        }
      };
      walk(el, { firstInBlock: true });
      while (chars.length && !chars[chars.length - 1].textContent?.trim()) {
        chars.pop()?.remove();
      }
      return chars;
    };

    const typeInto = (el: HTMLElement, charDelay: number) =>
      new Promise<void>((resolve) => {
        const chars = wrapChars(el);
        const cursor = document.createElement("span");
        cursor.className = "tw-cursor";
        el.classList.add("tw-active");
        if (chars.length === 0) {
          resolve();
          return;
        }
        chars[0].parentNode?.insertBefore(cursor, chars[0]);
        let i = 0;
        const tick = () => {
          if (i >= chars.length) {
            cursor.remove();
            resolve();
            return;
          }
          const span = chars[i++];
          span.classList.add("tw-revealed");
          if (span.nextSibling)
            span.parentNode?.insertBefore(cursor, span.nextSibling);
          else span.parentNode?.appendChild(cursor);
          const ch = span.textContent || "";
          const delay = ch.trim() ? charDelay : charDelay * 0.45;
          setTimeout(tick, delay);
        };
        tick();
      });

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let cancelled = false;
    (async () => {
      // badge e parágrafo: typewriter via DOM (continua igual);
      // h1 é controlado pelo useEffect dedicado abaixo (state-driven).
      await sleep(300);
      if (cancelled) return;
      if (badgeRef.current) await typeInto(badgeRef.current, 28);
      if (cancelled) return;
      await sleep(220);
      if (pRef.current) await typeInto(pRef.current, 18);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Filtro de cidades
  const norm = (t: string) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  const filteredCities = (() => {
    const v = norm(citySearch.trim());
    if (!v) return [];
    return CITIES.filter((c) => norm(c.name).includes(v)).sort(
      (a, b) =>
        (norm(a.name).startsWith(v) ? 0 : 1) -
        (norm(b.name).startsWith(v) ? 0 : 1)
    );
  })();

  return (
    <div className="projetos-page">
      <LogoSymbol />

      {/* LOADING SCREEN — primeira entrada, dá tempo do vídeo do hero carregar */}
      {showLoading && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-6"
          style={{ zIndex: 10000, background: "var(--bg)" }}
        >
          <div className="h-32 animate-pulse">
            <svg className="logo-mark" aria-hidden="true" focusable="false">
              <use href="#logo-ts" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl tracking-tight text-[var(--text)]">
              Toque Sútil
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--primary)]">
              massagens
            </span>
          </div>
          <div className="mt-4 flex gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <nav
        ref={navRef}
        id="mainNav"
        className="fixed top-0 left-0 right-0 z-50 anim-fadeSlideIn-delay-3"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 md:gap-6">
          <div
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              className="logo-mark self-stretch"
              aria-hidden="true"
              focusable="false"
            >
              <use href="#logo-ts" />
            </svg>
            <div className="flex flex-col leading-none whitespace-nowrap">
              <span className="font-display text-xl tracking-tight nav-brand">
                Toque Sútil
              </span>
              <span className="nav-brand font-mono text-[10px] uppercase tracking-[0.35em] mt-1 opacity-80">
                massagens
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            <a className="nav-link" href="#hero">
              Início
            </a>
            <a className="nav-link" href="#servicos">
              Tipos de serviço
            </a>
            <a className="nav-link" href="#massagistas">
              Terapeutas
            </a>
            <a className="nav-link" href="#sobre">
              Sobre
            </a>
            <a className="nav-link" href="#faq">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openCidades}
              className="nav-action !hidden md:!inline-flex"
            >
              <i className="fa fa-search text-[10px]"></i> Buscar cidade
            </button>
            <a
              href="#servicos"
              className="nav-action nav-action-primary !hidden md:!inline-flex"
            >
              <i className="fa fa-spa text-[10px]"></i> Serviços
            </a>
            <Link
              to="/login"
              className="nav-action-text !hidden md:!inline-flex"
            >
              <i className="fa fa-user text-[10px] mr-1"></i> Login
            </Link>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setShowMobileMenu((s) => !s)}
              className="md:hidden hamburger"
              aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={showMobileMenu}
            >
              <i
                className={`fa ${
                  showMobileMenu ? "fa-times" : "fa-bars"
                } text-base`}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {showMobileMenu && (
        <div
          className="mobile-menu-overlay md:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="relative h-full flex flex-col px-6 pt-28 pb-12 max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] font-bold">
                [ Menu ]
              </span>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="hamburger"
                aria-label="Fechar menu"
              >
                <i className="fa fa-times text-base"></i>
              </button>
            </div>

            <nav className="flex-1 flex flex-col">
              {[
                { label: "Início", href: "#hero" },
                { label: "Tipos de serviço", href: "#servicos" },
                { label: "Terapeutas", href: "#massagistas" },
                { label: "Sobre", href: "#sobre" },
                { label: "FAQ", href: "#faq" },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className="mobile-menu-link"
                >
                  <span className="mm-num">0{i + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  openCidades();
                }}
                className="ghost-cta w-full"
              >
                <i className="fa fa-search"></i> Buscar Cidade
              </button>
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="shiny-cta w-full"
              >
                <span>
                  <i className="fa fa-user"></i> Login
                </span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-faint)]">
                Toque Sútil © 2026
              </span>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/tops.massagens/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition"
                >
                  <i className="fab fa-instagram text-xs"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@tops.massagens"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition"
                >
                  <i className="fab fa-tiktok text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        id="hero"
        className="anchor-offset relative min-h-[760px] md:min-h-[820px] flex items-center overflow-hidden"
      >
        <div className="hero-video-bg" aria-hidden="true">
          <iframe
            ref={heroIframeRef}
            id="heroVimeo"
            src={`https://player.vimeo.com/video/${HERO_PLAYLIST[heroStartIdx].id}?${
              HERO_PLAYLIST[heroStartIdx].hash
                ? `h=${HERO_PLAYLIST[heroStartIdx].hash}&`
                : ""
            }autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&dnt=1&playsinline=1&keyboard=0&pip=0&badge=0`}
            title="Toque Sútil Massagens"
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          ></iframe>
          <div className="hero-video-shield"></div>
          <div className="hero-video-overlay"></div>
          <div className="hero-video-vignette"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-20">
          <div className="max-w-2xl">
            <div
              className="anim-fadeSlideIn-delay-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/85 backdrop-blur border border-[var(--border-strong)] rounded-full mb-8"
              style={
                {
                  "--border-gradient":
                    "linear-gradient(180deg, rgba(157,45,74,.3), rgba(201,162,116,.2))",
                  "--border-radius-before": "9999px",
                } as React.CSSProperties
              }
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
              <span
                ref={badgeRef}
                className="tw-target tw-badge text-[11px] font-mono uppercase tracking-widest text-[var(--primary)]"
              >
                Saúde e Bem Estar
              </span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[.95] tracking-tight text-[var(--text)] mb-6"
              style={{ minHeight: "1.9em" }}
            >
              {H1_PRE.slice(0, Math.max(0, Math.min(h1Typed, H1_PRE.length)))}
              <em className="text-[var(--primary)] font-normal">
                {H1_EM.slice(
                  0,
                  Math.max(0, Math.min(h1Typed - H1_PRE.length, H1_EM.length))
                )}
              </em>
              {h1Typed >= H1_BR_AT && <br />}
              {H1_POST.slice(
                0,
                Math.max(
                  0,
                  Math.min(h1Typed - H1_BR_AT, H1_POST.length)
                )
              )}
              {!h1Done && <span className="tw-cursor" />}
            </h1>

            <p
              ref={pRef}
              className="tw-target tw-p hero-lede text-lg md:text-xl leading-relaxed max-w-xl mb-3"
            >
              Encontre <strong>terapeutas</strong> e{" "}
              <strong>clínicas de massagem</strong> perto de você.
            </p>
            <div className="anim-fadeSlideIn-delay-11 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--primary)] mb-10">
              [ Terapêuticas · Relaxantes · Estéticas · Sensuais ]
            </div>

            <div className="anim-fadeSlideIn-delay-12 mb-8">
              <button
                onClick={openCidades}
                className="group relative w-full max-w-xl flex items-center justify-between gap-3 h-[60px] pl-5 pr-3 bg-white border border-[var(--border-strong)] hover:border-[var(--primary)] transition-all rounded-full shadow-[0_8px_24px_-8px_rgba(42,20,24,.15)]"
              >
                <span className="flex items-center gap-3 text-[var(--text-muted)] group-hover:text-[var(--text)] transition">
                  <i className="fa fa-search text-[var(--primary)]"></i>
                  <span>Buscar terapeutas por cidade...</span>
                </span>
                <span className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--primary)] text-white group-hover:bg-[var(--primary-dark)] transition">
                  <i className="fa fa-arrow-right text-sm"></i>
                </span>
              </button>
            </div>

            <div className="anim-fadeSlideIn-delay-14 grid grid-cols-3 gap-4 max-w-xl">
              <div className="border-l-2 border-[var(--primary)] pl-4">
                <div className="font-display text-3xl text-[var(--text)]">
                  50+
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Cidades
                </div>
              </div>
              <div className="border-l-2 border-[var(--accent)] pl-4">
                <div className="font-display text-3xl text-[var(--text)]">
                  100%
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Verificadas
                </div>
              </div>
              <div className="border-l-2 border-[var(--text)] pl-4">
                <div className="font-display text-3xl text-[var(--text)]">
                  24/7
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Sempre online
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS / TIPOS DE SERVIÇO */}
      <section
        id="servicos"
        className="anchor-offset max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4 animate-on-scroll anim-fadeSlideIn">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 01. Categorias ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--text)] mt-2">
              Tipos de serviço
            </h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Profissionais especializados em diversas modalidades para cuidar do seu corpo, mente e bem-estar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Massagens Terapêuticas",
              desc: "Alívio de dores e recuperação muscular",
              icon: "fa-circle-nodes",
              gradient: "linear-gradient(135deg, #c4b5e3 0%, #8e7ab8 100%)",
              image: "/massagem-mulher.jpg",
              delay: "delay-1",
            },
            {
              label: "Massagens Relaxantes",
              desc: "Equilíbrio e desconexão profunda",
              icon: "fa-spa",
              gradient: "linear-gradient(135deg, #b8ddd0 0%, #6ea795 100%)",
              image: "/massagem-mulher-2.jpg",
              delay: "delay-3",
            },
            {
              label: "Massagens Estéticas",
              desc: "Cuidados faciais e corporais",
              icon: "fa-face-smile-beam",
              gradient: "linear-gradient(135deg, #f5cccb 0%, #d4878a 100%)",
              image: "/massagem-mulher-3.jpg",
              delay: "delay-4",
            },
            {
              label: "Outras Especialidades",
              desc: "Drenagem, ventosa, pedras quentes e mais",
              icon: "fa-lemon",
              gradient: "linear-gradient(135deg, #c5d3e3 0%, #7d8fa6 100%)",
              image: "/massagem-mulher-4.jpg",
              delay: "delay-5",
            },
            {
              label: "Massagens Sensuais",
              desc: "Tântrica, nuru e modalidades íntimas",
              icon: "fa-venus-mars",
              gradient: "linear-gradient(135deg, #e8c5cf 0%, #9d2d4a 100%)",
              image: "/massagem-mulher-1.jpg",
              delay: "delay-2",
            },
            {
              label: "Cursos",
              desc: "Capacitação para profissionais da área",
              icon: "fa-laptop",
              gradient: "linear-gradient(135deg, #f5dfb8 0%, #c9a274 100%)",
              image: "/massagem-mulher-5.jpg",
              delay: "delay-6",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`group relative aspect-[16/10] overflow-hidden border border-[var(--border)] corner-card col-anim animate-on-scroll ${s.delay} cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(157,45,74,.25)]`}
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              {/* Imagem de fundo */}
              <img
                src={s.image}
                alt={s.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Tint colorido (multiply: tinge a foto com a cor da categoria) */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-70 group-hover:opacity-50 transition-opacity duration-500"
                style={{ background: s.gradient }}
              ></div>
              {/* Vignette inferior pra contraste do texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-lg z-10">
                <i className={`fa-solid ${s.icon} text-[var(--primary)] text-xl`}></i>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3
                  className="font-display text-2xl md:text-3xl text-white leading-tight tracking-tight mb-1"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-white/85 text-xs md:text-sm font-mono"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,.5)" }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section className="anchor-offset max-w-7xl mx-auto px-6 py-10 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-6 animate-on-scroll anim-fadeSlideIn">
          <div className="flex items-center gap-3">
            <span className="label-blink font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ Online Agora ]
            </span>
            <span className="text-[var(--text-muted)] text-sm">
              Toque em uma terapeuta para ver o status
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-faint)]">
            → Deslize
          </span>
        </div>

        <div className="scroll-x flex gap-5 pb-3">
          {[
            { name: "Sophia", img: "assets/16549_b05c61c7f417.webp", time: "2 min" },
            { name: "Anne", img: "assets/whatsapp-image-2026-05-07-at-1_c0e99e981931.webp", time: "2 h" },
            { name: "Danny", img: "assets/4291cec9-6e6d-4031-b150-1ccb94_1ddd2944badf.webp", time: "3 h" },
            { name: "Anny Cabral", img: "assets/whatsapp-image-2026-02-20-at-1_48d22c4db28f.webp", time: "3 h" },
            { name: "Ray", img: "assets/ray-terapeuta_c745ad6158b1.webp", time: "14 h" },
            { name: "Deusa Maya", img: "assets/whatsapp-image-2026-04-28-at-1_460c980ee5ed.webp", time: "15 h" },
            { name: "Ágatha", img: "assets/agata-capa0405_b1f62b6526d3.webp", time: "18 h" },
            { name: "Suyane", img: "assets/img_1396_5134059c329a.webp", time: "21 h" },
          ].map((s) => (
            <a
              key={s.name}
              href="#"
              className="shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="story-ring">
                <img src={s.img} alt={s.name} />
              </div>
              <span className="text-xs text-[var(--text)] font-medium">
                {s.name}
              </span>
              <span className="font-mono text-[9px] text-[var(--text-faint)] uppercase">
                {s.time}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* MASSAGISTAS GALLERY */}
      <section
        id="massagistas"
        className="anchor-offset max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4 animate-on-scroll anim-fadeSlideIn">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 02. Terapeutas ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--text)] mt-2">
              Terapeutas em destaque
            </h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Perfis verificados com fotos reais. Toque para acessar contato
              direto via WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-[var(--border-strong)]"></div>
              <div className="w-1.5 h-1.5 bg-[var(--border-strong)]"></div>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
              Atualizado há 2 min
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {MASSAGISTAS.map((m) => (
            <Link
              key={m.slug}
              to={`/massagista/${m.slug}`}
              className={`massagista-card col-anim animate-on-scroll ${m.delay} group block aspect-[3/4] border border-[var(--border)] shadow-[0_4px_20px_-8px_rgba(42,20,24,.08)] hover:shadow-[0_16px_40px_-12px_rgba(157,45,74,.25)] transition-shadow`}
            >
              <img
                src={m.profilePhoto}
                alt={`${m.name} - ${m.city} - ${m.state}`}
                className="card-img absolute inset-0 w-full h-full object-cover"
              />
              <div className="card-overlay"></div>
              {m.online && (
                <span className="online-pill">
                  <span className="dot"></span> Online
                </span>
              )}
              {m.videoCount > 0 && (
                <span className="media-badge">
                  <i className="fas fa-video"></i> {m.videoCount}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10 text-white">
                <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--accent)] mb-1">
                  {m.city} - {m.state}
                </div>
                <div className="font-display text-base leading-tight">
                  {m.name}
                </div>
                <div className="text-[10px] text-white/70 font-mono mt-1">
                  {m.postedAgo}
                </div>
              </div>
            </Link>
          ))}

          <button
            onClick={openCidades}
            className="col-anim animate-on-scroll delay-1 group aspect-[3/4] border border-[var(--border)] border-dashed bg-white hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] transition-all duration-500 flex flex-col items-center justify-center gap-3 corner-card"
          >
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="w-12 h-12 rounded-full bg-[var(--primary-soft)] flex items-center justify-center group-hover:bg-[var(--primary)] transition">
              <svg
                className="w-5 h-5 text-[var(--primary)] group-hover:text-white transition-colors transform group-hover:rotate-[-45deg] duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={1.5}
                />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--primary)] mb-1">
                [ Ver todas ]
              </div>
              <div className="font-display text-lg text-[var(--text)]">
                + 50 cidades
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* CTA terapeuta */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <div className="bg-white border border-[var(--border-strong)] p-8 md:p-16 corner-card relative overflow-hidden animate-on-scroll anim-fadeSlideIn shadow-[0_20px_60px_-20px_rgba(157,45,74,.2)]">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>

          <div
            className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(201,162,116,.4), transparent 60%)",
            }}
          ></div>
          <div
            className="absolute -bottom-1/3 -left-1/3 w-[500px] h-[500px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(157,45,74,.3), transparent 60%)",
            }}
          ></div>

          <div className="grid md:grid-cols-5 gap-12 items-center relative z-10">
            <div className="md:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                [ 04. Para terapeutas ]
              </span>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--text)] mt-2 mb-4">
                Você é terapeuta?
              </h2>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-2">
                Anuncie conosco e descubra como deixar sua agenda cheia.
              </p>
              <p className="text-[var(--primary)] font-mono text-xs uppercase tracking-widest mb-8">
                CADASTRE-SE GRÁTIS<sup>*</sup>{" "}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/planos" className="shiny-cta">
                  <span>
                    <i className="fa fa-rectangle-list"></i> Ver Planos
                  </span>
                </Link>
                <Link to="/cadastre-se" className="ghost-cta">
                  <i className="fa fa-user-plus"></i> Cadastre-se
                </Link>
              </div>
            </div>

            <div className="md:col-span-2 hidden md:block">
              <div className="relative aspect-square corner-card border border-[var(--border-strong)] overflow-hidden bg-[var(--primary-soft)]">
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
                <img
                  src="/massagem-mulher.jpg"
                  alt="Você é terapeuta?"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 via-transparent to-[var(--accent)]/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG + DEPOIMENTOS — seção inteira oculta temporariamente */}
      {false && <section
        id="blog"
        className="anchor-offset max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]"
      >
        <div className="grid md:grid-cols-1 gap-12">
          {false && <div className="animate-on-scroll anim-fadeSlideIn">
            <div className="flex items-baseline justify-between mb-8 border-b border-[var(--border)] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                  [ 05. Blog ]
                </span>
                <h3 className="font-display text-3xl tracking-tight text-[var(--text)] mt-1">
                  Últimas postagens
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--primary)] transition"
              >
                Ver todas →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  img: "assets/7e42582f-199b-4905-870b-5ca82d_e410b19388ae.png",
                  cat: "Massagem com Finalização · 08/06/2025",
                  title:
                    "Massagem com final feliz: o que é, como funciona e por que atrai tantos homens?",
                },
                {
                  img: "assets/tecnicas-de-massagem-recife_065520370151.png",
                  cat: "Técnicas · 08/04/2026",
                  title:
                    "Técnicas de massagem mais procuradas por homens em Recife",
                },
                {
                  img: "assets/nova-logo-tops-massagens_dd49e392c682.jpg",
                  cat: "Brand · 13/03/2026",
                  title:
                    "Toque Sútil Massagens apresenta nova logo: mais moderna, discreta e sofisticada",
                },
              ].map((b, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-4 bg-white border border-[var(--border)] flex items-center gap-4 group hover:border-[var(--primary)] hover:shadow-[0_8px_24px_-12px_rgba(157,45,74,.2)] transition-all relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
                  <img
                    src={b.img}
                    alt=""
                    className="w-20 h-20 object-cover border border-[var(--border)] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                      {b.cat}
                    </div>
                    <h4 className="text-sm text-[var(--text)] font-medium group-hover:translate-x-1 transition-transform duration-300 line-clamp-2">
                      {b.title}
                    </h4>
                  </div>
                  <i className="fa fa-arrow-up-right-from-square text-xs text-[var(--text-faint)] group-hover:text-[var(--primary)] transition shrink-0"></i>
                </a>
              ))}
            </div>
          </div>}

          <div className="animate-on-scroll anim-fadeSlideIn-delay-2">
            <div className="flex items-baseline justify-between mb-8 border-b border-[var(--border)] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                  [ 06. Depoimentos ]
                </span>
                <h3 className="font-display text-3xl tracking-tight text-[var(--text)] mt-1">
                  Comentários recentes
                </h3>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-[var(--border-strong)]"></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Cris",
                  city: "Maceió - AL",
                  ago: "há 1d 22h",
                  msg: '"essa pretinha tira onda nas massagens!"',
                  img: "assets/sem-titulo_c2e8c4f1b6bc.jpeg",
                },
                {
                  name: "Agata terapeuta",
                  city: "Recife - PE",
                  ago: "há 2d 22h",
                  msg: '"Existe a massagem vivência?"',
                  img: "assets/tm---agata-terapeuta_a0bffc5fd6af.jpg",
                },
                {
                  name: "Sophie terapeuta",
                  city: "Maceió - AL",
                  ago: "há 3d 16h",
                  msg: '"Além da massagem, tem interação sexual?"',
                  img: "assets/tm---sophie-terapeuta_3541bcab967c.jpg",
                },
              ].map((d, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[var(--border)] border-dashed p-5 hover:border-[var(--primary)] transition-all duration-500 corner-card"
                >
                  <span className="corner-bl"></span>
                  <span className="corner-br"></span>
                  <div className="flex items-start gap-4">
                    <img
                      src={d.img}
                      alt={d.name}
                      className="w-12 h-12 object-cover border border-[var(--border)] shrink-0 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[var(--text)] font-medium text-sm">
                          {d.name}
                        </span>
                        <span className="text-[var(--text-faint)] text-xs">
                          /
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)]">
                          {d.city}
                        </span>
                        <span className="text-[var(--text-faint)] text-xs">
                          ·
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                          {d.ago}
                        </span>
                      </div>
                      <p className="text-[var(--text-muted)] text-sm italic font-display">
                        {d.msg}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>}

      {/* SOBRE */}
      <section
        id="sobre"
        className="anchor-offset max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
          [ 03. Sobre ]
        </span>
        <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--text)] mt-2 mb-12">
          O que é o Toque Sútil Massagens?
        </h2>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-[var(--border)] pb-8 animate-on-scroll anim-fadeSlideIn">
            <div className="text-[var(--text-faint)] font-mono text-xs uppercase tracking-widest">
              [ 3.1 ]
            </div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text)] mb-4">
                Portal de massagem
              </h3>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                Portal especializado em{" "}
                <strong className="text-[var(--text)]">massagem</strong>,
                reunindo{" "}
                <strong className="text-[var(--text)]">
                  terapeutas verificados
                </strong>
                . Conecta clientes e profissionais de forma direta, segura e
                discreta.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-[var(--border)] pb-8 animate-on-scroll anim-fadeSlideIn">
            <div className="text-[var(--text-faint)] font-mono text-xs uppercase tracking-widest">
              [ 3.2 ]
            </div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text)] mb-4">
                Por que escolher?
              </h3>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                Especializado exclusivamente em{" "}
                <strong className="text-[var(--text)]">
                  saúde e bem-estar
                </strong>{" "}
                físico e mental. Todos os{" "}
                <strong className="text-[var(--text)]">
                  terapeutas verificados
                </strong>
                . Contato direto pelo{" "}
                <strong className="text-[var(--text)]">WhatsApp</strong> da
                profissional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-[var(--border)] pb-8 animate-on-scroll anim-fadeSlideIn">
            <div className="text-[var(--text-faint)] font-mono text-xs uppercase tracking-widest">
              [ 3.3 ]
            </div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text)] mb-4">
                Modalidades disponíveis
              </h3>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-6">
                Profissionais especializadas em todas as principais
                modalidades.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  "› Terapêuticas",
                  "› Relaxante",
                  "› Estética",
                  "› Com Pedras",
                  "› Tântrica",
                  "› Nuru",
                  "› Sensuais",
                  "› 4 Mãos",
                  "› Sensitive",
                ].map((m) => (
                  <div
                    key={m}
                    className="border border-[var(--border)] bg-white px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition cursor-default"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline animate-on-scroll anim-fadeSlideIn">
            <div className="text-[var(--text-faint)] font-mono text-xs uppercase tracking-widest">
              [ 3.4 ]
            </div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text)] mb-4">
                Como funciona?
              </h3>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                Escolha a cidade, navegue pelos perfis e entre em contato
                diretamente pelo{" "}
                <strong className="text-[var(--text)]">WhatsApp</strong>.
                Agendamento rápido, sem cadastro obrigatório e sem taxa de
                intermediação. Para{" "}
                <strong className="text-[var(--text)]">
                  massagem a domicílio
                </strong>{" "}
                ou atendimento em hotel, basta filtrar pelos perfis com essas
                modalidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="anchor-offset max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)]"
      >
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 04. FAQ ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[var(--text)] mt-2 mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              As dúvidas mais comuns sobre massagem sensual, modalidades,
              atendimento e cadastro.
            </p>
            <div className="mt-8 inline-flex bg-white border border-[var(--border-strong)] rounded-full px-3 py-1.5 gap-2 items-center">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)]">
                10 questões respondidas
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 animate-on-scroll anim-fadeSlideIn">
            {[
              {
                q: "O que é massagem terapêutica?",
                a: "Voltada para o alívio de dores, tensões musculares e recuperação física. Indicada para quem sofre com problemas posturais, contraturas, lesões ou estresse acumulado. Combina técnicas como amassamento, fricção, alongamentos e pressão em pontos específicos.",
              },
              {
                q: "O que é massagem relaxante?",
                a: "Promove relaxamento profundo do corpo e da mente, reduzindo o estresse e a ansiedade, melhorando a circulação e a qualidade do sono. Movimentos suaves, ritmo lento e pressão leve a moderada — ideal pra desligar do dia a dia.",
              },
              {
                q: "O que é massagem com pedras?",
                a: "Utiliza pedras vulcânicas aquecidas posicionadas em pontos estratégicos do corpo. O calor relaxa a musculatura profundamente, melhora a circulação sanguínea e proporciona uma sensação de bem-estar imediato. Sessões geralmente duram 60 a 90 minutos.",
              },
              {
                q: "O que é massagem estética?",
                a: "Voltada para fins estéticos como redução de medidas, modelagem corporal, drenagem linfática, combate à celulite e flacidez. Pode incluir cremes, óleos específicos e equipamentos como roller, ventosas ou aparelhos de radiofrequência.",
              },
              {
                q: "Como encontrar massagem na minha cidade?",
                a: "Selecione sua cidade no campo de busca. A plataforma exibe todos os perfis disponíveis com fotos reais, modalidades, localização aproximada e contato direto via WhatsApp.",
              },
              {
                q: "As fotos das terapeutas são reais?",
                a: "Sim. Todos os perfis cadastrados passam por verificação de fotos e identidade. Em caso de dúvida, entre em contato pelo WhatsApp da profissional antes de se deslocar.",
              },
              {
                q: "É possível receber massagem em hotel?",
                a: "Sim. Diversas terapeutas oferecem atendimento a domicílio, incluindo hotéis e flats. Combine diretamente com a profissional informando hotel, cidade e número do quarto.",
              },
              {
                q: "Como anunciar no Toque Sútil Massagens?",
                a: "Cadastre-se em /cadastre-se. Suporte de segunda a sexta, das 9h às 12h e das 14h às 17h, pelo WhatsApp 34 9999-9999.",
              },
              {
                q: "O que é massagem tântrica?",
                a: "A massagem tântrica integra respiração consciente, energia corporal e estimulação sensorial progressiva. Trabalha a conexão entre corpo e mente, proporcionando relaxamento profundo. As sessões duram entre 60 e 90 minutos.",
              },
              {
                q: "O que é massagem nuru?",
                a: "Técnica japonesa que utiliza um gel especial à base de alga nori para proporcionar contato corporal deslizante e intenso. É realizada em colchão ou lona específica e é uma das modalidades mais procuradas no Toque Sútil Massagens.",
              },
            ].map((f, idx) => (
              <details key={idx} className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[var(--border)] border-dashed p-6 corner-card transition-all hover:border-[var(--primary)]">
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 border-dashed mb-4">
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ Suporte e cadastros ]
              </span>
              <i className="fa fa-clock text-[var(--text-faint)]"></i>
            </div>
            <p className="text-[var(--text)] text-sm">
              Segunda à Sexta · 9h às 12h e 14h às 17h
            </p>
          </div>
          <a
            href="https://wa.me/5582988709008?text=Olá, gostaria de anunciar no Toque Sútil Massagens"
            className="bg-white border border-[var(--border)] border-dashed p-6 corner-card transition-all hover:border-[var(--primary)] group block"
          >
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 border-dashed mb-4">
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ WhatsApp ]
              </span>
              <i className="fab fa-whatsapp text-[var(--text-faint)] group-hover:text-[#25D366] transition"></i>
            </div>
            <p className="font-display text-2xl text-[var(--text)] group-hover:translate-x-1 transition-transform duration-300">
              34 9999-9999
            </p>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1 space-y-6">
              <div className="flex flex-col items-start gap-3">
                <div className="h-16">
                  <svg className="logo-mark" aria-hidden="true" focusable="false">
                    <use href="#logo-ts" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none whitespace-nowrap">
                  <span className="text-2xl font-display tracking-tight text-[var(--text)]">
                    Toque Sútil
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] mt-1 text-[var(--text-muted)]">
                    massagens
                  </span>
                </div>
              </div>
              <h3 className="font-display text-xl text-[var(--text)]">
                Anuncie conosco!
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Horário de suporte: Segunda à Sexta, das 8h às 12h e das 13h às
                17h.
              </p>

              <div className="space-y-2">
                <Link
                  to="/planos"
                  className="group relative flex items-center justify-center gap-2 h-[46px] w-full overflow-hidden border border-[var(--border-strong)] hover:border-[var(--primary)] bg-white transition-all"
                >
                  <span className="absolute inset-0 bg-[var(--primary)] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-[var(--text)] group-hover:text-white transition">
                    <i className="fas fa-list-ul mr-1.5"></i> Ver Planos
                  </span>
                </Link>
                <Link
                  to="/cadastre-se"
                  className="group relative flex items-center justify-center gap-2 h-[46px] w-full overflow-hidden border border-[var(--primary)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-all"
                >
                  <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-white">
                    <i className="fas fa-user-plus mr-1.5"></i> Anuncie Agora
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="group relative flex items-center justify-center gap-2 h-[46px] w-full overflow-hidden border border-[var(--border-strong)] hover:border-[var(--text)] bg-white transition-all"
                >
                  <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-[var(--text)]">
                    <i className="fa fa-user mr-1.5"></i> Login
                  </span>
                </Link>
                <Link
                  to="/fale-conosco"
                  className="group relative flex items-center justify-center gap-2 h-[46px] w-full overflow-hidden border border-[var(--border-strong)] hover:border-[#25D366] bg-white transition-all"
                >
                  <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-[var(--text)] group-hover:text-[#25D366] transition">
                    <i className="fab fa-whatsapp mr-1.5"></i> Suporte
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-6">
                [ Massagens mais buscadas ]
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Terapêuticas", url: "massagem-terapeutica" },
                  { name: "Relaxantes", url: "massagem-relaxante" },
                  { name: "Estéticas", url: "massagem-estetica" },
                  { name: "Sensuais", url: "massagem-sensual" },
                ].map((m) => (
                  <li key={m.url}>
                    <Link
                      to={`/massagens/${m.url}`}
                      className="group flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition"
                    >
                      <span className="w-3 h-px bg-[var(--border-strong)] group-hover:w-6 group-hover:bg-[var(--primary)] transition-all"></span>
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-6">
                [ Informações ]
              </h3>
              <ul className="space-y-3">
                {[
                  ["Cadastre-se", "cadastre-se"],
                  ["Login", "login"],
                  ["Nossos planos", "planos"],
                  ["Espaços para Aluguel", "espacos-para-aluguel"],
                  ["Blog", "blog"],
                  ["Quem Somos", "sobre-o-tops-massagens"],
                  ["Privacidade", "politica-de-privacidade"],
                  ["Termos de uso", "termos-de-uso"],
                  ["Fale Conosco", "fale-conosco"],
                ].map(([label, slug]) => (
                  <li key={slug}>
                    <Link
                      to={`/${slug}`}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition"
                    >
                      › {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
              Toque Sútil Massagens © 2026 — CNPJ: 00.000.000/0001-00
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)]">
                [ Siga nas redes ]
              </span>
              {[
                { ic: "fab fa-instagram", href: "", l: "Instagram" },
                { ic: "fab fa-youtube", href: "", l: "Youtube" },
                { ic: "fab fa-telegram", href: "", l: "Telegram" },
                { ic: "fab fa-tiktok", href: "", l: "TikTok" },
                { ic: "fab fa-twitter", href: "", l: "X" },
              ].map((s) => (
                <a
                  key={s.l}
                  aria-label={s.l}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition"
                >
                  <i className={s.ic}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL CIDADES */}
      <div
        id="modalCidades"
        className={`modal-cidades ${showCidades ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCidades();
        }}
      >
        <div className="modal-cidades-inner corner-card">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)] border-dashed">
            <div>
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ Buscar cidade ]
              </span>
              <h3 className="font-display text-2xl text-[var(--text)] mt-1">
                Onde você está?
              </h3>
            </div>
            <button
              onClick={closeCidades}
              className="w-9 h-9 border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition flex items-center justify-center"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="p-5">
            <div className="relative mb-5">
              <input
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                type="text"
                placeholder="Digite o nome da sua cidade..."
                autoComplete="off"
                className="w-full px-4 py-3 bg-white border border-[var(--border-strong)] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--primary)] outline-none transition"
              />
              <i className="fa fa-search absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"></i>
            </div>

            {citySearch.trim() ? (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {filteredCities.length ? (
                  filteredCities.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/massagem-sensual/${c.slug}`}
                      onClick={closeCidades}
                      className="city-btn"
                    >
                      <i className="fa fa-map-marker-alt text-[var(--primary)]"></i>{" "}
                      {c.name} - {c.state}
                    </Link>
                  ))
                ) : (
                  <Link
                    to={`/search/node?keys=${encodeURIComponent(citySearch)}`}
                    onClick={closeCidades}
                    className="city-btn"
                  >
                    <i className="fa fa-search text-[var(--primary)]"></i> Busca
                    avançada
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {[
                  { name: "Maceió - AL", slug: "maceio-al" },
                  { name: "Aracaju - SE", slug: "aracaju-se" },
                  { name: "Recife - PE", slug: "recife-pe" },
                  { name: "Salvador - BA", slug: "salvador-ba" },
                  { name: "João Pessoa - PB", slug: "joao-pessoa-pb" },
                  { name: "Fortaleza - CE", slug: "fortaleza-ce" },
                ].map((c) => (
                  <Link
                    key={c.slug}
                    to={`/massagem-sensual/${c.slug}`}
                    onClick={closeCidades}
                    className="city-btn"
                  >
                    <i className="fa fa-map-marker-alt text-[var(--primary)]"></i>{" "}
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projetos;
