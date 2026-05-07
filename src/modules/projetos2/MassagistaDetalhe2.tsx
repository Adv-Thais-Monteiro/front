import { useEffect, useState, useCallback } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import LogoSymbol from "../projetos/LogoSymbol";
import { getMassagistaBySlug } from "../projetos/massagistasData";
import "./projetos2.css";

const MassagistaDetalhe2 = () => {
  const { slug } = useParams<{ slug: string }>();
  const massagista = slug ? getMassagistaBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIdx(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  if (!massagista) {
    return <Navigate to="/v2" replace />;
  }
  const m = massagista;

  return (
    <div className="projetos2-page">
      <LogoSymbol />

      {/* Gradient blur top */}
      <div className="gradient-blur" aria-hidden="true"></div>

      {/* NAV */}
      <div className="fixed flex w-full z-50 pt-6 pr-4 pl-4 top-0 left-0 justify-center">
        <nav
          className="shadow-black/50 flex md:gap-12 md:w-auto bg-black/60 w-full max-w-6xl rounded-none pt-2 pr-2 pb-2 pl-3 shadow-2xl backdrop-blur-lg gap-x-8 gap-y-8 items-center justify-between"
          style={{ position: "relative", border: "1px solid rgba(255,255,255,.15)" }}
        >
          <Link to="/v2" className="flex items-center gap-3 shrink-0 cursor-pointer">
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
            <Link className="nav-link2" to="/v2#hero">Início</Link>
            <Link className="nav-link2" to="/v2#massagistas">Massagistas</Link>
            <Link className="nav-link2" to="/v2#galeria">Galeria</Link>
            <Link className="nav-link2" to="/v2#sobre">Sobre</Link>
            <Link className="nav-link2" to="/v2#faq">FAQ</Link>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/v2" className="hidden md:inline-flex btn-red px-3 py-2 text-[10px]">
              <i className="fa fa-arrow-left"></i> Voltar
            </Link>
            <a
              href={`https://wa.me/${m.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-mono uppercase tracking-widest px-3 py-2 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/v2" className="hover:text-[var(--primary)] transition">Início</Link>
          <span className="text-zinc-700">›</span>
          <span>{m.city} - {m.state}</span>
          <span className="text-zinc-700">›</span>
          <span className="text-[var(--primary)]">{m.name}</span>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* LEFT — DADOS */}
          <aside className="space-y-4">
            <div className="bg-black border border-zinc-800 corner-card relative">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={m.profilePhoto} alt={m.name} className="w-full h-full object-cover" />
                {m.online && (
                  <span className="online-pill"><span className="dot"></span> Online</span>
                )}
              </div>

              <div className="p-5">
                <h1 className="font-display text-2xl text-white font-medium tracking-tight leading-tight">
                  {m.name}
                </h1>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-[var(--primary-soft)] border border-[var(--primary)]/40">
                  <i className="fas fa-check-circle text-[var(--primary)] text-[10px]"></i>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--primary)] font-bold">
                    Perfil verificado
                  </span>
                </div>

                <ul className="mt-5 divide-y divide-zinc-800">
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Gênero</span>
                    <span className="text-white">{m.gender}</span>
                  </li>
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Cidade</span>
                    <span className="text-white">{m.city} - {m.state}</span>
                  </li>
                  {m.neighborhood && (
                    <li className="py-2.5 flex justify-between gap-3 text-sm">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Bairro</span>
                      <span className="text-white">{m.neighborhood}</span>
                    </li>
                  )}
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Atende</span>
                    <span className="text-white">{m.attends}</span>
                  </li>
                  <li className="py-2.5 text-sm">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">
                      Formas de pagamento
                    </span>
                    <ul className="space-y-1.5">
                      {m.paymentMethods.map((pm) => (
                        <li key={pm} className="flex items-center gap-2 text-white">
                          <i className="fa fa-circle text-[5px] text-[var(--primary)]"></i>
                          {pm}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Horário</span>
                    <span className="text-white flex items-center gap-1.5">
                      <i className="fa fa-clock text-[var(--primary)] text-xs"></i>
                      {m.schedule}
                    </span>
                  </li>
                </ul>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400">
                  <div className="border border-zinc-800 px-2 py-1.5 flex items-center gap-1.5">
                    <i className="far fa-comment text-[var(--primary)]"></i>
                    {m.comments} Coment.
                  </div>
                  <div className="border border-zinc-800 px-2 py-1.5 flex items-center gap-1.5">
                    <i className="far fa-eye text-[var(--primary)]"></i>
                    {m.views.toLocaleString("pt-BR")}
                  </div>
                  <div className="border border-zinc-800 px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fas fa-eye text-[var(--primary)]"></i>
                    {m.viewsToday} Visualizações hoje
                  </div>
                  <div className="border border-zinc-800 px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fa fa-bullhorn text-[var(--primary)]"></i>
                    Anuncia há {m.announcedSince}
                  </div>
                  <div className="border border-zinc-800 px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fa fa-rotate text-[var(--primary)]"></i>
                    Perfil atualizado {m.updatedAt}
                  </div>
                </div>

                {m.noSexualInteraction && (
                  <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-[var(--primary-soft)] border border-[var(--primary)]/30 text-[11px] text-[var(--primary)]">
                    <i className="fa fa-circle-info mt-0.5"></i>
                    <span>Não há interação sexual com a(o) Massagista</span>
                  </div>
                )}

                <button className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-[var(--primary)] hover:border-[var(--primary)] transition">
                  <i className="fa fa-flag"></i> Denunciar {m.name}
                </button>
              </div>
            </div>

            {/* WhatsApp card */}
            <div className="bg-black border border-zinc-800 corner-card relative p-5">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-4">
                [ Informações e Agendamentos ]
              </h3>
              <a
                href={`https://wa.me/${m.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 h-[56px] px-5 w-full overflow-hidden bg-[#25D366] hover:bg-[#1da851] transition-all"
              >
                <span className="flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm">
                  <i className="fab fa-whatsapp text-xl"></i>
                  WhatsApp
                </span>
                <span className="font-mono text-sm text-white">{m.whatsappDisplay}</span>
              </a>
              <p className="mt-4 text-[11px] text-zinc-400 flex items-center gap-1.5">
                <i className="fa fa-map-marker-alt text-[var(--primary)]"></i>
                Profissional encontra-se em <strong className="text-white">{m.city} - {m.state}</strong>
              </p>
            </div>
          </aside>

          {/* RIGHT — DESCRIÇÃO + SLIDER */}
          <section className="space-y-4 min-w-0">
            <div className="bg-black border border-zinc-800 corner-card relative p-6">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-3">
                [ Sobre {m.name} ]
              </h2>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {m.description}
              </p>
            </div>

            {/* SLIDER */}
            <div className="bg-black border border-zinc-800 corner-card relative overflow-hidden">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div
                className="overflow-hidden"
                ref={emblaRef}
                style={{ height: "70vh", minHeight: 480 }}
              >
                <div className="flex h-full">
                  {m.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative shrink-0 grow-0 basis-full h-full bg-black flex items-center justify-center"
                    >
                      {item.type === "photo" ? (
                        <img src={item.url} alt={item.alt || `${m.name} ${idx + 1}`} className="w-full h-full object-contain" />
                      ) : (
                        <iframe
                          src={`https://player.vimeo.com/video/${item.vimeoId}${
                            item.vimeoHash ? `?h=${item.vimeoHash}` : "?"
                          }${item.vimeoHash ? "&" : ""}autoplay=${idx === selectedIdx ? 1 : 0}&muted=1&loop=1&dnt=1`}
                          className="w-full h-full"
                          frameBorder={0}
                          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={`${m.name} vídeo ${idx + 1}`}
                        ></iframe>
                      )}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="media-badge">
                          {item.type === "video" ? (<><i className="fas fa-video"></i> Vídeo</>) : (<><i className="fas fa-image"></i> Foto</>)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev && m.gallery.length <= 1}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 border border-[var(--primary)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white flex items-center justify-center transition disabled:opacity-30"
                aria-label="Anterior"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext && m.gallery.length <= 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 border border-[var(--primary)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white flex items-center justify-center transition disabled:opacity-30"
                aria-label="Próximo"
              >
                <i className="fa fa-chevron-right"></i>
              </button>

              <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-black/80 border border-zinc-800 text-white font-mono text-xs">
                {selectedIdx + 1} / {m.gallery.length}
              </div>
            </div>

            {m.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-x">
                {m.gallery.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`shrink-0 w-20 h-20 relative overflow-hidden border-2 transition ${
                      idx === selectedIdx ? "border-[var(--primary)]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {item.type === "photo" ? (
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-zinc-800 flex items-center justify-center">
                        <i className="fas fa-circle-play text-white text-2xl"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/v2" className="flex items-center gap-3 shrink-0">
            <div className="h-12">
              <svg className="logo-mark" aria-hidden="true">
                <use href="#logo-ts" />
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight text-white font-medium">
              Toque Sútil Massagens
            </span>
          </Link>
          <div className="font-mono text-[11px] text-zinc-500 tracking-wider">
            © 2026 — CNPJ: 21.989.396/0001-11
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MassagistaDetalhe2;
