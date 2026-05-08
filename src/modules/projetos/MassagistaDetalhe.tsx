import { useEffect, useState, useCallback } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import LogoSymbol from "./LogoSymbol";
import { getMassagistaBySlug } from "./massagistasData";
import "./projetos.css";

const MassagistaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const massagista = slug ? getMassagistaBySlug(slug) : undefined;

  // Rola pro topo ao entrar na rota / trocar de massagista
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
    return <Navigate to="/" replace />;
  }

  const m = massagista;

  return (
    <div className="projetos-page">
      <LogoSymbol />

      {/* NAV (versão simplificada com bg sólido — não há vídeo de hero) */}
      <nav id="mainNav" className="fixed top-0 left-0 right-0 z-50 scrolled">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 cursor-pointer no-underline"
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
          </Link>

          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            <Link className="nav-link" to="/#hero">
              Início
            </Link>
            <Link className="nav-link" to="/#reels">
              Vídeos
            </Link>
            <Link className="nav-link" to="/#massagistas">
              Terapeutas
            </Link>
            <Link className="nav-link" to="/#galeria">
              Galeria
            </Link>
            <Link className="nav-link" to="/#sobre">
              Sobre
            </Link>
            <Link className="nav-link" to="/#faq">
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="nav-action">
              <i className="fa fa-arrow-left text-[10px]"></i> Voltar
            </Link>
            <a
              href={`https://wa.me/${m.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="nav-action nav-action-primary"
            >
              <i className="fab fa-whatsapp text-[10px]"></i> WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[var(--primary)] transition">
            Início
          </Link>
          <span className="text-[var(--text-faint)]">›</span>
          <span>
            {m.city} - {m.state}
          </span>
          <span className="text-[var(--text-faint)]">›</span>
          <span className="text-[var(--primary)]">{m.name}</span>
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* COLUNA ESQUERDA — DADOS */}
          <aside className="space-y-4">
            {/* Foto + nome + dados */}
            <div className="bg-white border border-[var(--border-strong)] corner-card relative">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={m.profilePhoto}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
                {m.online && (
                  <span className="online-pill">
                    <span className="dot"></span> Online
                  </span>
                )}
              </div>

              <div className="p-5">
                <h1 className="font-display text-2xl text-[var(--text)] leading-tight">
                  {m.name}
                </h1>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-[var(--primary-soft)] border border-[var(--primary)]/30 rounded-full">
                  <i className="fas fa-check-circle text-[var(--primary)] text-[10px]"></i>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--primary)] font-bold">
                    Perfil verificado
                  </span>
                </div>

                <ul className="mt-5 divide-y divide-[var(--border)]">
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold">
                      Gênero
                    </span>
                    <span className="text-[var(--text)]">{m.gender}</span>
                  </li>
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold">
                      Cidade
                    </span>
                    <span className="text-[var(--text)]">
                      {m.city} - {m.state}
                    </span>
                  </li>
                  {m.neighborhood && (
                    <li className="py-2.5 flex justify-between gap-3 text-sm">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold">
                        Bairro
                      </span>
                      <span className="text-[var(--text)]">
                        {m.neighborhood}
                      </span>
                    </li>
                  )}
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold">
                      Atende
                    </span>
                    <span className="text-[var(--text)]">{m.attends}</span>
                  </li>
                  <li className="py-2.5 text-sm">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold mb-2">
                      Formas de pagamento
                    </span>
                    <ul className="space-y-1.5">
                      {m.paymentMethods.map((pm) => (
                        <li
                          key={pm}
                          className="flex items-center gap-2 text-[var(--text)]"
                        >
                          <i className="fa fa-circle text-[5px] text-[var(--primary)]"></i>
                          {pm}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="py-2.5 flex justify-between gap-3 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)] font-bold">
                      Horário
                    </span>
                    <span className="text-[var(--text)] flex items-center gap-1.5">
                      <i className="fa fa-clock text-[var(--primary)] text-xs"></i>
                      {m.schedule}
                    </span>
                  </li>
                </ul>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                  <div className="border border-[var(--border)] px-2 py-1.5 flex items-center gap-1.5">
                    <i className="far fa-comment text-[var(--primary)]"></i>
                    {m.comments} Comentário{m.comments === 1 ? "" : "s"}
                  </div>
                  <div className="border border-[var(--border)] px-2 py-1.5 flex items-center gap-1.5">
                    <i className="far fa-eye text-[var(--primary)]"></i>
                    {m.views.toLocaleString("pt-BR")} Visualizações
                  </div>
                  <div className="border border-[var(--border)] px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fas fa-eye text-[var(--primary)]"></i>
                    {m.viewsToday} Visualizações hoje
                  </div>
                  <div className="border border-[var(--border)] px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fa fa-bullhorn text-[var(--primary)]"></i>
                    Anuncia há {m.announcedSince}
                  </div>
                  <div className="border border-[var(--border)] px-2 py-1.5 flex items-center gap-1.5 col-span-2">
                    <i className="fa fa-rotate text-[var(--primary)]"></i>
                    Perfil atualizado {m.updatedAt}
                  </div>
                </div>

                {m.noSexualInteraction && (
                  <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-[var(--primary-soft)] border border-[var(--primary)]/30 text-[11px] text-[var(--primary-dark)]">
                    <i className="fa fa-circle-info mt-0.5"></i>
                    <span>Não há interação sexual com a(o) Terapeuta</span>
                  </div>
                )}

                <button className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 border border-[var(--border-strong)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition">
                  <i className="fa fa-flag"></i> Denunciar {m.name}
                </button>
              </div>
            </div>

            {/* Bloco WhatsApp / Agendamento */}
            <div className="bg-white border border-[var(--border-strong)] corner-card relative p-5">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-4">
                [ Informações e Agendamentos ]
              </h3>

              <a
                href={`https://wa.me/${m.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between gap-3 h-[56px] px-5 w-full overflow-hidden bg-[#25D366] hover:bg-[#1da851] transition-all rounded-md"
              >
                <span className="flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm">
                  <i className="fab fa-whatsapp text-xl"></i>
                  WhatsApp
                </span>
                <span className="font-mono text-sm text-white">
                  {m.whatsappDisplay}
                </span>
              </a>

              <p className="mt-4 text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                <i className="fa fa-map-marker-alt text-[var(--primary)]"></i>
                Profissional encontra-se em{" "}
                <strong className="text-[var(--text)]">
                  {m.city} - {m.state}
                </strong>
              </p>
            </div>
          </aside>

          {/* COLUNA DIREITA — DESCRIÇÃO + SLIDER */}
          <section className="space-y-4 min-w-0">
            {/* Descrição */}
            <div className="bg-white border border-[var(--border-strong)] corner-card relative p-6">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mb-3">
                [ Sobre {m.name} ]
              </h2>
              <p className="text-[var(--text)] leading-relaxed whitespace-pre-line">
                {m.description}
              </p>
            </div>

            {/* SLIDER */}
            <div className="bg-black border border-[var(--border-strong)] corner-card relative overflow-hidden">
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
                        <img
                          src={item.url}
                          alt={item.alt || `${m.name} ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <iframe
                            src={`https://player.vimeo.com/video/${item.vimeoId}${
                              item.vimeoHash ? `?h=${item.vimeoHash}` : "?"
                            }${item.vimeoHash ? "&" : ""}autoplay=${
                              idx === selectedIdx ? 1 : 0
                            }&muted=1&loop=1&dnt=1`}
                            className="w-full h-full"
                            frameBorder={0}
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={`${m.name} vídeo ${idx + 1}`}
                          ></iframe>
                        </div>
                      )}

                      {/* Badge tipo */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="media-badge">
                          {item.type === "video" ? (
                            <>
                              <i className="fas fa-video"></i> Vídeo
                            </>
                          ) : (
                            <>
                              <i className="fas fa-image"></i> Foto
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões prev/next */}
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev && m.gallery.length <= 1}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[var(--primary)] flex items-center justify-center transition shadow-lg disabled:opacity-30"
                aria-label="Anterior"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext && m.gallery.length <= 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[var(--primary)] flex items-center justify-center transition shadow-lg disabled:opacity-30"
                aria-label="Próximo"
              >
                <i className="fa fa-chevron-right"></i>
              </button>

              {/* Contador */}
              <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-black/60 backdrop-blur text-white font-mono text-xs rounded-full">
                {selectedIdx + 1} / {m.gallery.length}
              </div>
            </div>

            {/* Thumbnails */}
            {m.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-x">
                {m.gallery.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`shrink-0 w-20 h-20 relative overflow-hidden border-2 transition ${
                      idx === selectedIdx
                        ? "border-[var(--primary)]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {item.type === "photo" ? (
                      <img
                        src={item.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
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

      {/* Footer mínimo */}
      <footer className="border-t border-[var(--border)] mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="h-12">
              <svg
                className="logo-mark"
                aria-hidden="true"
                focusable="false"
              >
                <use href="#logo-ts" />
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight text-[var(--text)]">
              Toque Sútil Massagens
            </span>
          </Link>
          <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
            © 2026 — CNPJ: 21.989.396/0001-11
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MassagistaDetalhe;
