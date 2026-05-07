import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoSymbol from "../projetos/LogoSymbol";
import { MASSAGISTAS } from "../projetos/massagistasData";
import "./projetos2.css";

const HERO_PLAYLIST = [
  { id: 1140992315, hash: "4a0ae71ab8" },
  { id: 721808009, hash: null as string | null },
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

// Hero h1 — typewriter state-driven
const H1_PRE = "O ritual ";
const H1_EM = "sensual";
const H1_POST = " encontra você.";
const H1_TOTAL = H1_PRE.length + H1_EM.length + H1_POST.length;
const H1_BR_AT = H1_PRE.length + H1_EM.length;

// Modalidades que rotacionam no parágrafo do hero
const MODALIDADES = ["tântrica", "nuru", "erótica", "tailandesa"];
const ROLL_INTERVAL = 2200; // ms — espaço entre trocas (e duração total da animação)

let sessionAgeAccepted2 = false;

const Projetos2 = () => {
  const [showAgeGate, setShowAgeGate] = useState(!sessionAgeAccepted2);
  const [showLoading, setShowLoading] = useState(false);
  const [showCidades, setShowCidades] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [h1Typed, setH1Typed] = useState(0);
  const [h1Done, setH1Done] = useState(false);
  const [heroStartIdx] = useState(() =>
    Math.floor(Math.random() * HERO_PLAYLIST.length)
  );
  const [modalidadePair, setModalidadePair] = useState<{
    current: number;
    previous: number;
  }>({ current: 0, previous: -1 });
  const heroIframeRef = useRef<HTMLIFrameElement>(null);

  const openCidades = () => {
    setShowCidades(true);
    document.body.style.overflow = "hidden";
  };
  const closeCidades = () => {
    setShowCidades(false);
    document.body.style.overflow = "auto";
  };

  // Block scroll while gate open
  useEffect(() => {
    if (!sessionAgeAccepted2) {
      document.body.style.overflow = "hidden";
    }
  }, []);

  // h1 typewriter — só dispara depois do age gate e do loading sumirem,
  // pra digitação ser visível desde o primeiro caractere.
  useEffect(() => {
    if (showAgeGate || showLoading) return;
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
  }, [showAgeGate, showLoading]);

  // Rotação das modalidades no parágrafo do hero — também espera gate/loading
  useEffect(() => {
    if (showAgeGate || showLoading) return;
    const interval = setInterval(() => {
      setModalidadePair((p) => ({
        previous: p.current,
        current: (p.current + 1) % MODALIDADES.length,
      }));
    }, ROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [showAgeGate, showLoading]);

  const acceptAge = () => {
    sessionAgeAccepted2 = true;
    setShowAgeGate(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      document.body.style.overflow = "auto";
    }, 2000);
  };
  const rejectAge = () => {
    window.location.href = "https://www.google.com";
  };

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

  // IO para animações on-scroll
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".projetos2-page .animate-on-scroll, .projetos2-page .col-anim")
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
      ".projetos2-page .animate-on-scroll, .projetos2-page .col-anim"
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

  // Reels lazy Vimeo
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      ".projetos2-page .reel-card[data-vimeo-id]"
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

  // Vimeo Hero Playlist
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
  }, [heroStartIdx]);

  // City filter
  const norm = (t: string) =>
    t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
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
    <div className="projetos2-page">
      <LogoSymbol />

      {/* Gradient blur top */}
      <div className="gradient-blur" aria-hidden="true"></div>

      {/* LOADING */}
      {showLoading && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-6"
          style={{ zIndex: 10000, background: "#000" }}
        >
          <div className="h-32 animate-pulse">
            <svg className="logo-mark" aria-hidden="true">
              <use href="#logo-ts" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl tracking-tight text-white">
              Toque Sútil
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--primary)]">
              massagens
            </span>
          </div>
          <div className="mt-4 flex gap-1.5">
            <span className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse" style={{ animationDelay: "200ms" }} />
            <span className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      )}

      {/* AGE GATE */}
      <div id="ageGate2" className={showAgeGate ? "open" : ""}>
        <div className="max-w-md w-full bg-black border border-zinc-800 p-8 corner-card relative shadow-2xl">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>
          <div className="text-[10px] font-mono text-[var(--primary)] tracking-widest uppercase font-bold mb-4">
            [ Conteúdo Adulto ]
          </div>
          <h2 className="font-display text-3xl tracking-tight text-white mb-3">
            Você tem 18 anos ou mais?
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Este site apresenta conteúdo destinado exclusivamente para maiores de 18 anos.
          </p>
          <div className="flex gap-3">
            <button onClick={acceptAge} className="flex-1 btn-red">
              Sim, sou maior de 18
            </button>
            <button
              onClick={rejectAge}
              className="px-5 border border-zinc-700 bg-transparent text-zinc-400 text-xs font-medium uppercase tracking-wide hover:text-white hover:border-white transition"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="fixed flex anim-fadeSlideIn-3 w-full z-50 md:pt-6 md:pr-4 md:pl-4 top-0 left-0 justify-center">
        <nav
          className="shadow-black/50 flex md:gap-12 md:w-auto bg-black/60 w-full max-w-6xl rounded-none pt-2 pr-2 pb-2 pl-3 shadow-2xl backdrop-blur-lg gap-x-8 gap-y-8 items-center justify-between"
          style={{ position: "relative", border: "1px solid rgba(255,255,255,.15)" }}
        >
          <Link to="/v2" className="flex items-center shrink-0 cursor-pointer">
            <div className="h-9">
              <svg className="logo-mark" aria-hidden="true">
                <use href="#logo-ts" />
              </svg>
            </div>
            <div className="flex flex-col leading-none whitespace-nowrap">
              <span className="font-display text-base font-bold tracking-tight text-white">
                Toque Sútil
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--primary)] mt-0.5">
                massagens
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a className="nav-link2" href="#hero">Início</a>
            <a className="nav-link2" href="#reels">Vídeos</a>
            <a className="nav-link2" href="#massagistas">Massagistas</a>
            <a className="nav-link2" href="#galeria">Galeria</a>
            <a className="nav-link2" href="#sobre">Sobre</a>
            <a className="nav-link2" href="#faq">FAQ</a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openCidades}
              className="hidden md:inline-flex btn-red px-3 py-2 text-[10px]"
            >
              <i className="fa fa-search"></i> Buscar
            </button>
            <Link
              to="/v2/login"
              className="hidden md:inline-flex text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition px-2"
            >
              <i className="fa fa-user mr-1"></i> Login
            </Link>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setShowMobileMenu((s) => !s)}
              className="md:hidden hamburger"
              aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={showMobileMenu}
            >
              <i className={`fa ${showMobileMenu ? "fa-times" : "fa-bars"} text-base`}></i>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {showMobileMenu && (
        <div className="mobile-menu-overlay md:hidden" onClick={() => setShowMobileMenu(false)}>
          <div
            className="relative h-full flex flex-col px-6 pt-28 pb-12 max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
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
                { label: "Vídeos", href: "#reels" },
                { label: "Massagistas", href: "#massagistas" },
                { label: "Galeria", href: "#galeria" },
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
                className="btn-red w-full"
                style={{ padding: "10px" }}
              >
                <i className="fa fa-search"></i> Buscar Cidade
              </button>
              <Link
                to="/v2/login"
                onClick={() => setShowMobileMenu(false)}
                className="btn-red w-full"
                style={{ background: "var(--primary)", color: "#fff" }}
              >
                <i className="fa fa-user"></i> Login
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                Toque Sútil Massagens © 2026
              </span>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/tops.massagens/" target="_blank" rel="noreferrer" className="w-7 h-7 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition">
                  <i className="fab fa-instagram text-xs"></i>
                </a>
                <a href="https://www.tiktok.com/@tops.massagens" target="_blank" rel="noreferrer" className="w-7 h-7 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition">
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
        className="relative min-h-[760px] md:min-h-[820px] flex items-center overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent, black 0%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 0%, black 95%, transparent)",
        }}
      >
        <div className="hero-video-bg" aria-hidden="true">
          <iframe
            ref={heroIframeRef}
            id="heroVimeo"
            src={`https://player.vimeo.com/video/${HERO_PLAYLIST[heroStartIdx].id}?${
              HERO_PLAYLIST[heroStartIdx].hash
                ? `h=${HERO_PLAYLIST[heroStartIdx].hash}&`
                : ""
            }autoplay=1&muted=1&loop=0&controls=0&title=0&byline=0&portrait=0&autopause=0&dnt=1&playsinline=1&keyboard=0&pip=0&badge=0`}
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

        <div className="z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20 w-full relative">
          <div className="anim-fadeSlideIn-2 inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-sm rounded-full" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" style={{ boxShadow: "0 0 10px rgba(239,35,60,.5)" }}></span>
            <span className="text-[11px] font-medium tracking-wide text-red-100/80">
              Boutique de Massagem · Verificadas
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-medium tracking-tighter mb-8"
            style={{ minHeight: "1.9em" }}
          >
            <span className="gradient-text">
              {H1_PRE.slice(0, Math.max(0, Math.min(h1Typed, H1_PRE.length)))}
            </span>
            <span className="text-[var(--primary)] italic font-normal">
              {H1_EM.slice(
                0,
                Math.max(0, Math.min(h1Typed - H1_PRE.length, H1_EM.length))
              )}
            </span>
            {h1Typed >= H1_BR_AT && <br />}
            <span className="gradient-text">
              {H1_POST.slice(
                0,
                Math.max(0, Math.min(h1Typed - H1_BR_AT, H1_POST.length))
              )}
            </span>
            {!h1Done && <span className="tw-cursor" />}
          </h1>

          <p className="anim-fadeSlideIn-3 leading-relaxed md:text-2xl text-xl font-medium text-zinc-400 tracking-normal font-display max-w-3xl mx-auto mb-12">
            Massoterapeutas de{" "}
            <span className="rolling-container" aria-live="polite">
              <span
                key={`cur-${modalidadePair.current}`}
                className="rolling-word rolling-current"
              >
                {MODALIDADES[modalidadePair.current]}
              </span>
              {modalidadePair.previous !== -1 && (
                <span
                  key={`prev-${modalidadePair.previous}-${modalidadePair.current}`}
                  className="rolling-word rolling-previous"
                >
                  {MODALIDADES[modalidadePair.previous]}
                </span>
              )}
            </span>
            , em mais de 50 cidades — fotos reais, contato direto, agendamento sem intermediários.
          </p>

          <div className="anim-fadeSlideIn-4 flex flex-col md:flex-row mb-12 gap-6 items-center justify-center">
            <button onClick={openCidades} className="btn-spin">
              <span className="btn-spin-arc"></span>
              <span className="btn-spin-bg"></span>
              <span className="btn-spin-fill"></span>
              <span className="btn-spin-glow"></span>
              <span className="btn-spin-text">
                <i className="fa fa-search"></i> Buscar Massagistas
                <i className="fa fa-arrow-right text-[10px]"></i>
              </span>
            </button>
            <a href="#reels" className="btn-red">
              <i className="fas fa-circle-play"></i> Ver Vídeos
            </a>
          </div>

          <div className="anim-fadeSlideIn-5 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { v: "50+", l: "Cidades" },
              { v: "100%", l: "Verificadas" },
              { v: "24/7", l: "Sempre online" },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-[var(--primary)] pl-4 text-left">
                <div className="font-display text-3xl text-white font-medium">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-6 animate-on-scroll anim-fadeSlideIn">
          <div className="flex items-center gap-3">
            <span className="label-blink font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ Online Agora ]
            </span>
            <span className="text-zinc-400 text-sm">
              Toque em uma massoterapeuta para ver o status
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-600">→ Deslize</span>
        </div>

        <div className="scroll-x flex gap-5 pb-3">
          {MASSAGISTAS.slice(0, 8).map((m) => (
            <Link
              key={m.slug}
              to={`/v2/massagista/${m.slug}`}
              className="shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="story-ring">
                <img src={m.profilePhoto} alt={m.name} />
              </div>
              <span className="text-xs text-white font-medium">{m.name.split(" ")[0]}</span>
              <span className="font-mono text-[9px] text-zinc-600 uppercase">{m.postedAgo.replace("Há ", "")}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* REELS */}
      <section
        id="reels"
        className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4 animate-on-scroll anim-fadeSlideIn">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 01. Reels ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-white mt-2 font-medium tracking-tighter">
              <span className="gradient-text">Vídeos em destaque</span>
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl">
              Apresentações curtas das massoterapeutas — clique no perfil para ver o reel completo.
            </p>
          </div>
          <button className="btn-red">
            Ver todos <i className="fa fa-arrow-right text-xs"></i>
          </button>
        </div>

        <div className="scroll-x flex gap-4 pb-4">
          {[
            { vid: "20784267", h: "bafedaddf9", city: "Maceió - AL", name: "Sophia", v: "8.2k", l: "642", d: "delay-1" },
            { vid: "25546879", h: "10de44524b", city: "Aracaju - SE", name: "Deusa Maya", v: "14.7k", l: "1.1k", d: "delay-2" },
            { vid: "20972562", h: "e6cf03be96", city: "Recife - PE", name: "Isla Ferreira", v: "6.3k", l: "487", d: "delay-3" },
            { vid: "29158045", h: "66046799a3", city: "Salvador - BA", name: "Danny", v: "22.1k", l: "1.8k", d: "delay-4" },
            { vid: "20784267", h: "bafedaddf9", city: "Maceió - AL", name: "Ágatha", v: "9.9k", l: "723", d: "delay-5" },
          ].map((r, idx) => (
            <a
              key={idx}
              href="#"
              data-vimeo-id={r.vid}
              data-vimeo-h={r.h}
              className={`shrink-0 w-[260px] reel-card col-anim animate-on-scroll ${r.d} corner-card`}
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="reel-thumb"></div>
              <div className="reel-overlay"></div>
              <span className="media-badge">
                <i className="fas fa-circle-play"></i> Reel
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--primary)] mb-1">
                  {r.city}
                </div>
                <div className="font-display text-lg text-white font-medium">{r.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono mt-1.5">
                  <i className="far fa-eye"></i> {r.v} · <i className="fas fa-heart"></i> {r.l}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* MASSAGISTAS */}
      <section
        id="massagistas"
        className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4 animate-on-scroll anim-fadeSlideIn">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 02. Massagistas ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-white mt-2 font-medium tracking-tighter">
              <span className="gradient-text">Em destaque</span>
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl">
              Perfis verificados com fotos reais. Toque para acessar contato direto via WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-zinc-800"></div>
              <div className="w-1.5 h-1.5 bg-zinc-800"></div>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
              Atualizado há 2 min
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {MASSAGISTAS.map((m) => (
            <Link
              key={m.slug}
              to={`/v2/massagista/${m.slug}`}
              className={`massagista-card col-anim animate-on-scroll ${m.delay} group block aspect-[3/4]`}
            >
              <img
                src={m.profilePhoto}
                alt={`${m.name} - ${m.city}`}
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
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--primary)] mb-1">
                  {m.city} - {m.state}
                </div>
                <div className="font-display text-base text-white font-medium leading-tight">
                  {m.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-1">
                  {m.postedAgo}
                </div>
              </div>
            </Link>
          ))}
          <button
            onClick={openCidades}
            className="col-anim animate-on-scroll delay-1 group aspect-[3/4] border border-zinc-800 border-dashed bg-black hover:border-[var(--primary)] transition-all duration-500 flex flex-col items-center justify-center gap-3 corner-card"
          >
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="w-12 h-12 bg-[var(--primary-soft)] flex items-center justify-center group-hover:bg-[var(--primary)] transition">
              <svg
                className="w-5 h-5 text-[var(--primary)] group-hover:text-white transition-colors transform group-hover:rotate-[-45deg] duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--primary)] mb-1">
                [ Ver todas ]
              </div>
              <div className="font-display text-lg text-white">+ 50 cidades</div>
            </div>
          </button>
        </div>
      </section>

      {/* GALERIA */}
      <section
        id="galeria"
        className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800"
      >
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start animate-on-scroll anim-fadeSlideIn">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 03. Galeria Privada ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2 mb-6 font-medium tracking-tighter">
              <span className="gradient-text">Conteúdo exclusivo</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Fotos e vídeos exclusivos das massoterapeutas — passe o cursor para revelar uma prévia.
              Conteúdo completo disponível mediante login.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {["Fotos verificadas", "Atualizadas semanalmente", "Reels exclusivos no perfil"].map((t) => (
                <div key={t} className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="w-8 h-8 bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center text-xs">
                    <i className="fas fa-check"></i>
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <Link to="/v2/login" className="btn-red inline-flex">
              Acessar Galeria <i className="fa fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { grad: "linear-gradient(135deg, #ef233c, #1a0a0e 60%, #000)", label: "Sophia · MCZ", aspect: "aspect-[3/4]", span: "row-span-2", delay: "delay-1" },
              { grad: "linear-gradient(160deg, #7a1f37, #ef233c)", label: "Anne · AJU", aspect: "aspect-square", span: "", delay: "delay-2" },
              { grad: "linear-gradient(120deg, #ef233c, #1a0a0e, #c01a30)", label: "Danny · SSA · Vídeo", aspect: "aspect-square", span: "", delay: "delay-3", video: "0:24" },
              { grad: "linear-gradient(100deg, #1a0a0e, #ef233c 50%, #ffe1e6)", label: "Deusa Maya · AJU", aspect: "aspect-[4/3]", span: "col-span-2", delay: "delay-4" },
              { grad: "linear-gradient(140deg, #c01a30, #ffe1e6)", label: "Ágatha · MCZ · Vídeo", aspect: "aspect-square", span: "", delay: "delay-5", video: "0:38" },
              { grad: "linear-gradient(180deg, #7a1f37, #ef233c, #ffe1e6)", label: "Isla · REC", aspect: "aspect-square", span: "", delay: "delay-6" },
            ].map((g, idx) => (
              <div key={idx} className={`gallery-tile col-anim animate-on-scroll ${g.delay} ${g.aspect} ${g.span}`}>
                <div className="gt-img" style={{ background: g.grad, filter: "blur(14px)" }}></div>
                <div className="gt-veil">
                  <div className="gt-lock">
                    <i className={g.video ? "fas fa-play" : "fas fa-lock"}></i>
                  </div>
                </div>
                {g.video && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="media-badge"><i className="fas fa-video"></i> {g.video}</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="inline-block bg-black/90 backdrop-blur px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--primary)] border border-zinc-800">
                    {g.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Massoterapeuta */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="bg-black border border-zinc-800 p-8 md:p-16 corner-card relative overflow-hidden animate-on-scroll anim-fadeSlideIn">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>
          <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] opacity-50" style={{ background: "radial-gradient(circle, rgba(239,35,60,.25), transparent 60%)" }}></div>
          <div className="absolute -bottom-1/3 -left-1/3 w-[500px] h-[500px] opacity-30" style={{ background: "radial-gradient(circle, rgba(239,35,60,.15), transparent 60%)" }}></div>

          <div className="grid md:grid-cols-5 gap-12 items-center relative z-10">
            <div className="md:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                [ 04. Para Massoterapeutas ]
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-white mt-2 mb-4 font-medium tracking-tighter">
                <span className="gradient-text">Você é massoterapeuta?</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-2">
                Anuncie conosco e descubra como deixar sua agenda cheia.
              </p>
              <p className="text-[var(--primary)] font-mono text-xs uppercase tracking-widest mb-8">
                CADASTRE-SE GRÁTIS<sup>*</sup>{" "}
                <span className="text-zinc-600">(*Exceto Maceió e Aracaju)</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/v2/planos" className="btn-spin">
                  <span className="btn-spin-arc"></span>
                  <span className="btn-spin-bg"></span>
                  <span className="btn-spin-fill"></span>
                  <span className="btn-spin-glow"></span>
                  <span className="btn-spin-text">
                    <i className="fa fa-rectangle-list"></i> Ver Planos
                  </span>
                </Link>
                <Link to="/v2/cadastre-se" className="btn-red">
                  <i className="fa fa-user-plus"></i> Cadastre-se
                </Link>
              </div>
            </div>
            <div className="md:col-span-2 hidden md:block">
              <div className="relative aspect-square corner-card border border-zinc-800 overflow-hidden bg-black">
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
                <img src="/Screenshot_7.png" alt="Você é massoterapeuta?" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/30 via-transparent to-black/60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG + DEPOIMENTOS */}
      <section id="blog" className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-on-scroll anim-fadeSlideIn">
            <div className="flex items-baseline justify-between mb-8 border-b border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                  [ 05. Blog ]
                </span>
                <h3 className="font-display text-3xl text-white mt-1 font-medium tracking-tighter">
                  <span className="gradient-text">Últimas postagens</span>
                </h3>
              </div>
              <Link to="/v2/blog" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-[var(--primary)] transition">
                Ver todas →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { img: "/assets/7e42582f-199b-4905-870b-5ca82d_e410b19388ae.png", cat: "Massagem com Finalização · 08/06/2025", title: "Massagem com final feliz: o que é, como funciona e por que atrai tantos homens?" },
                { img: "/assets/tecnicas-de-massagem-recife_065520370151.png", cat: "Técnicas · 08/04/2026", title: "Técnicas de massagem mais procuradas por homens em Recife" },
                { img: "/assets/nova-logo-tops-massagens_dd49e392c682.jpg", cat: "Brand · 13/03/2026", title: "Toque Sútil Massagens apresenta nova logo: mais moderna, discreta e sofisticada" },
              ].map((b, idx) => (
                <Link
                  key={idx}
                  to="/v2/blog"
                  className="p-4 bg-black border border-zinc-800 flex items-center gap-4 group hover:border-[var(--primary)] transition-all relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
                  <img src={b.img} alt="" className="w-20 h-20 object-cover border border-zinc-800 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-[var(--primary)] transition-colors">
                      {b.cat}
                    </div>
                    <h4 className="text-sm text-white font-medium group-hover:translate-x-1 transition-transform duration-300 line-clamp-2">
                      {b.title}
                    </h4>
                  </div>
                  <i className="fa fa-arrow-up-right-from-square text-xs text-zinc-600 group-hover:text-[var(--primary)] transition shrink-0"></i>
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll anim-fadeSlideIn-1">
            <div className="flex items-baseline justify-between mb-8 border-b border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
                  [ 06. Depoimentos ]
                </span>
                <h3 className="font-display text-3xl text-white mt-1 font-medium tracking-tighter">
                  <span className="gradient-text">Comentários recentes</span>
                </h3>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[var(--primary)] animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-zinc-800"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Cris", city: "Maceió - AL", ago: "há 1d 22h", msg: '"essa pretinha tira onda nas massagens!"', img: "/assets/sem-titulo_c2e8c4f1b6bc.jpeg" },
                { name: "Agata Massoterapeuta", city: "Recife - PE", ago: "há 2d 22h", msg: '"Existe a massagem vivência?"', img: "/assets/tm---agata-massoterapeuta_a0bffc5fd6af.jpg" },
                { name: "Sophie Massoterapeuta", city: "Maceió - AL", ago: "há 3d 16h", msg: '"Além da massagem, tem interação sexual?"', img: "/assets/tm---sophie-massoterapeuta_3541bcab967c.jpg" },
              ].map((d, idx) => (
                <div key={idx} className="bg-black border border-zinc-800 border-dashed p-5 hover:border-[var(--primary)] transition-all duration-500 corner-card">
                  <span className="corner-bl"></span>
                  <span className="corner-br"></span>
                  <div className="flex items-start gap-4">
                    <img src={d.img} alt={d.name} className="w-12 h-12 object-cover border border-zinc-800 shrink-0 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-white font-medium text-sm">{d.name}</span>
                        <span className="text-zinc-700 text-xs">/</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)]">{d.city}</span>
                        <span className="text-zinc-700 text-xs">·</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{d.ago}</span>
                      </div>
                      <p className="text-zinc-400 text-sm italic font-display">{d.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
          [ 07. Sobre ]
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-white mt-2 mb-12 font-medium tracking-tighter">
          <span className="gradient-text">O que é o Toque Sútil Massagens?</span>
        </h2>

        <div className="space-y-12">
          {[
            {
              n: "7.1", t: "Boutique de massagem sensual",
              p: <>Portal especializado em <strong className="text-white">massagem sensual</strong>, reunindo as melhores massoterapeutas verificadas em <strong className="text-white">tântrica</strong>, <strong className="text-white">nuru</strong>, <strong className="text-white">erótica</strong> e <strong className="text-white">com finalização</strong> em mais de 50 cidades. Integrante do <strong className="text-white">grupo Tops do Brasil</strong>, conecta clientes e profissionais de forma direta, segura e discreta.</>
            },
            {
              n: "7.2", t: "Por que escolher?",
              p: <>Especializado exclusivamente em massagem sensual. Todos os perfis verificados com fotos reais. Contato direto pelo WhatsApp da profissional. Presente em mais de 30 cidades — de <strong className="text-white">Maceió</strong> e <strong className="text-white">Aracaju</strong> a <strong className="text-white">São Paulo</strong>, <strong className="text-white">Recife</strong>, <strong className="text-white">Salvador</strong> e <strong className="text-white">João Pessoa</strong>.</>
            },
          ].map((b, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-zinc-800 pb-8 animate-on-scroll anim-fadeSlideIn">
              <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest">[ {b.n} ]</div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4 font-medium tracking-tight">{b.t}</h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{b.p}</p>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-zinc-800 pb-8 animate-on-scroll anim-fadeSlideIn">
            <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest">[ 7.3 ]</div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4 font-medium tracking-tight">Modalidades disponíveis</h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
                Profissionais especializadas em todas as principais modalidades.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["› Tântrica", "› Nuru", "› Erótica", "› Relaxante Masculina", "› Com Finalização", "› 4 Mãos", "› Sensitive", "› Mútua", "› Tailandesa"].map((m) => (
                  <div key={m} className="border border-zinc-800 bg-black px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition cursor-default">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline animate-on-scroll anim-fadeSlideIn">
            <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest">[ 7.4 ]</div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4 font-medium tracking-tight">Como funciona?</h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Escolha a cidade, navegue pelos perfis e entre em contato diretamente pelo{" "}
                <strong className="text-white">WhatsApp</strong>. Agendamento rápido, sem cadastro obrigatório e sem taxa de intermediação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold">
              [ 08. FAQ ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2 mb-4 font-medium tracking-tighter">
              <span className="gradient-text">Perguntas frequentes</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              As dúvidas mais comuns sobre massagem sensual, modalidades, atendimento e cadastro.
            </p>
            <div className="mt-8 inline-flex bg-black border border-zinc-800 px-3 py-1.5 gap-2 items-center">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)]">
                8 questões respondidas
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 animate-on-scroll anim-fadeSlideIn">
            {[
              { q: "O que é massagem tântrica?", a: "A massagem tântrica integra respiração consciente, energia corporal e estimulação sensorial progressiva. As sessões duram entre 60 e 90 minutos." },
              { q: "O que é massagem nuru?", a: "Técnica japonesa que utiliza um gel especial à base de alga nori para proporcionar contato corporal deslizante e intenso." },
              { q: "O que é massagem com finalização?", a: "Sessão que inclui estimulação íntima ao final do atendimento. O escopo é sempre definido diretamente com a massoterapeuta." },
              { q: "Como encontrar massagem sensual na minha cidade?", a: "Selecione sua cidade no campo de busca. A plataforma exibe todos os perfis disponíveis com fotos reais e contato direto via WhatsApp." },
              { q: "As fotos das massagistas são reais?", a: "Sim. Todos os perfis cadastrados passam por verificação de fotos e identidade." },
              { q: "É possível receber massagem sensual em hotel?", a: "Sim. Diversas massoterapeutas oferecem atendimento a domicílio, incluindo hotéis e flats." },
              { q: "As massoterapeutas atendem casais?", a: "Sim. Algumas profissionais oferecem atendimento a casais, incluindo massagem nuru voyeur e massagem mútua." },
              { q: "Como anunciar no Toque Sútil Massagens?", a: "Cadastre-se em /cadastre-se. Suporte de segunda a sexta, das 9h às 12h e das 14h às 17h." },
            ].map((f, idx) => (
              <details key={idx} className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-black border border-zinc-800 border-dashed p-6 corner-card transition-all hover:border-[var(--primary)]">
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 border-dashed mb-4">
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ Suporte e cadastros ]
              </span>
              <i className="fa fa-clock text-zinc-600"></i>
            </div>
            <p className="text-white text-sm">Segunda à Sexta · 9h às 12h e 14h às 17h</p>
          </div>
          <a href="https://wa.me/5582988709008" target="_blank" rel="noreferrer" className="bg-black border border-zinc-800 border-dashed p-6 corner-card transition-all hover:border-[var(--primary)] group block">
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 border-dashed mb-4">
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ WhatsApp ]
              </span>
              <i className="fab fa-whatsapp text-zinc-600 group-hover:text-[#25D366] transition"></i>
            </div>
            <p className="font-display text-2xl text-white group-hover:translate-x-1 transition-transform duration-300">
              34 9999-9999
            </p>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 mt-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1 space-y-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="h-16">
                  <svg className="logo-mark" aria-hidden="true">
                    <use href="#logo-ts" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none whitespace-nowrap items-center md:items-start">
                  <span className="text-2xl font-display tracking-tight text-white font-medium">
                    Toque Sútil
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] mt-1 text-[var(--primary)]">
                    massagens
                  </span>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Horário de suporte: Segunda à Sexta, das 8h às 12h e das 13h às 17h.
              </p>
              <div className="space-y-2">
                <Link to="/v2/planos" className="btn-red w-full">
                  <i className="fas fa-list-ul"></i> Ver Planos
                </Link>
                <Link to="/v2/cadastre-se" className="btn-red w-full" style={{ background: "var(--primary)", color: "#fff" }}>
                  <i className="fas fa-user-plus"></i> Anuncie Agora
                </Link>
                <Link to="/v2/login" className="btn-red w-full" style={{ borderColor: "#3f3f46", color: "#fff" }}>
                  <i className="fa fa-user"></i> Login
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-6">
                [ Cidades mais buscadas ]
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Massagem em Maceió", url: "maceio-al" },
                  { name: "Massagem em Aracaju", url: "aracaju-se" },
                  { name: "Massagem em Recife", url: "recife-pe" },
                  { name: "Massagem em Salvador", url: "salvador-ba" },
                  { name: "Massagem em João Pessoa", url: "joao-pessoa-pb" },
                ].map((c) => (
                  <li key={c.url}>
                    <Link to={`/v2/massagem-sensual/${c.url}`} className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
                      <span className="w-3 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-[var(--primary)] transition-all"></span>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-6">
                [ Massagens mais buscadas ]
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Massagem Tântrica", url: "massagem-tantrica" },
                  { name: "Massagem Nuru", url: "massagem-nuru" },
                  { name: "Massagem Relaxante", url: "massagem-relaxante" },
                  { name: "Massagem Sensitive", url: "massagem-sensitive" },
                ].map((m) => (
                  <li key={m.url}>
                    <Link to={`/v2/massagens/${m.url}`} className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
                      <span className="w-3 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-[var(--primary)] transition-all"></span>
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
                  ["Blog", "blog"],
                  ["Quem Somos", "sobre"],
                  ["Privacidade", "politica-de-privacidade"],
                  ["Termos de uso", "termos-de-uso"],
                  ["Fale Conosco", "fale-conosco"],
                ].map(([label, slug]) => (
                  <li key={slug}>
                    <Link to={`/v2/${slug}`} className="text-sm text-zinc-400 hover:text-white transition">
                      › {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-800">
            <h3 className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
              [ Sites parceiros ]
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-zinc-400">
              <a href="https://saltsbr.com.br/acompanhantes-curitiba/" className="hover:text-[var(--primary)] transition">Acompanhantes em Curitiba</a>
              <span className="text-zinc-700">|</span>
              <a href="https://www.topsdemaceio.com.br/" className="hover:text-[var(--primary)] transition">Acompanhantes Maceió</a>
              <span className="text-zinc-700">|</span>
              <a href="https://www.topsdobrasil.com.br/acompanhantes-recife-pe" className="hover:text-[var(--primary)] transition">Acompanhantes Recife</a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-[11px] text-zinc-500 tracking-wider">
              Toque Sútil Massagens © 2026 — CNPJ: 21.989.396/0001-11
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                [ Siga nas redes ]
              </span>
              {[
                { ic: "fab fa-instagram", href: "https://www.instagram.com/tops.massagens/", l: "Instagram" },
                { ic: "fab fa-youtube", href: "https://www.youtube.com/@TopsMassagens", l: "Youtube" },
                { ic: "fab fa-telegram", href: "http://t.me/topsmassagens", l: "Telegram" },
                { ic: "fab fa-tiktok", href: "https://www.tiktok.com/@tops.massagens", l: "TikTok" },
                { ic: "fab fa-twitter", href: "https://x.com/topsmassagens", l: "X" },
              ].map((s) => (
                <a key={s.l} aria-label={s.l} href={s.href} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition">
                  <i className={s.ic}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile floating menu */}
      <div className="menu-flutuante2">
        <a href="#hero"><i className="fa fa-home"></i>Início</a>
        <a href="#reels"><i className="fas fa-circle-play"></i>Vídeos</a>
        <a href="#blog"><i className="fa fa-list"></i>Blog</a>
        <Link to="/v2/login"><i className="fa fa-user"></i>Login</Link>
      </div>

      {/* MODAL CIDADES */}
      <div
        className={`modal-cidades2 ${showCidades ? "open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeCidades(); }}
      >
        <div className="modal-cidades-inner2 corner-card">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>
          <div className="flex items-center justify-between p-5 border-b border-zinc-800 border-dashed">
            <div>
              <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase font-bold">
                [ Buscar cidade ]
              </span>
              <h3 className="font-display text-2xl text-white mt-1 font-medium">
                Onde você está?
              </h3>
            </div>
            <button
              onClick={closeCidades}
              className="w-9 h-9 border border-zinc-700 text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition flex items-center justify-center"
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
                className="w-full px-4 py-3 bg-transparent border border-zinc-700 text-white placeholder:text-zinc-600 focus:border-[var(--primary)] outline-none transition"
              />
              <i className="fa fa-search absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600"></i>
            </div>
            {citySearch.trim() ? (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {filteredCities.length ? (
                  filteredCities.map((c) => (
                    <Link key={c.slug} to={`/v2/massagem-sensual/${c.slug}`} onClick={closeCidades} className="city-btn2">
                      <i className="fa fa-map-marker-alt text-[var(--primary)]"></i>{" "}
                      {c.name} - {c.state}
                    </Link>
                  ))
                ) : (
                  <Link to={`/v2/search/node?keys=${encodeURIComponent(citySearch)}`} onClick={closeCidades} className="city-btn2">
                    <i className="fa fa-search text-[var(--primary)]"></i> Busca avançada
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
                  <Link key={c.slug} to={`/v2/massagem-sensual/${c.slug}`} onClick={closeCidades} className="city-btn2">
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

export default Projetos2;
