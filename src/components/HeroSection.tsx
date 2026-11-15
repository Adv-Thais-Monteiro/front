import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { Scale, Gavel, ShieldCheck } from "lucide-react";
import fotoBracosCruzados from "@/assets/thais-bordo-bracos-cruzados.jpg";
import fotoBeca from "@/assets/thais-bordo-beca.jpg";
import fotoSorrindo from "@/assets/thais-azul-sorrindo.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    icon: Scale,
    badge: "Advocacia Criminal",
    title: "Thais Monteiro.",
    subtitle: "Advocacia Criminal Estratégica.",
    description: "Defesa técnica, combativa e discreta para os momentos mais críticos.",
    cta: "Agendar Consulta Sigilosa",
    imagePosition: "right" as const,
    image: fotoBracosCruzados,
    imageAlt: "Dra. Thais Monteiro, advogada criminalista, de braços cruzados",
  },
  {
    id: 2,
    icon: Gavel,
    badge: "Tribunal do Júri",
    title: "Sua voz no Júri.",
    subtitle: "Onde cada palavra decide destinos.",
    description: "Experiência consolidada em plenário. Oratória persuasiva, preparação meticulosa e estratégia vencedora para enfrentar o Conselho de Sentença.",
    cta: "Fale com a Especialista",
    imagePosition: "left" as const,
    image: fotoBeca,
    imageAlt: "Dra. Thais Monteiro vestindo a beca de advogada",
  },
  {
    id: 3,
    icon: ShieldCheck,
    badge: "Atendimento Humanizado",
    title: "Você não está sozinho.",
    subtitle: "Acolhimento em cada etapa.",
    description: "Entendemos que por trás de cada processo existe uma história. Oferecemos suporte jurídico com empatia, transparência e dedicação integral ao seu caso.",
    cta: "Converse Conosco",
    imagePosition: "right" as const,
    image: fotoSorrindo,
    imageAlt: "Dra. Thais Monteiro sorrindo, em atendimento acolhedor",
  },
];

/**
 * Hero com a foto ocupando 100% da altura da tela.
 * - Desktop: a foto preenche metade da tela (lado definido por imagePosition)
 *   e se funde ao fundo bordô com um degradê em direção ao texto.
 * - Mobile: a foto vira o fundo do slide, com o texto sobreposto na parte de baixo.
 */
const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => {
            const IconComponent = slide.icon;
            const imageLeft = slide.imagePosition === "left";
            const active = selectedIndex === index;

            return (
              <div
                key={slide.id}
                className="embla__slide relative h-full flex-[0_0_100%] overflow-hidden"
              >
                {/* Background (solid so the photo's edge blends without a seam) */}
                <div className="absolute inset-0 bg-burgundy-900" />

                {/* Full-height photo */}
                <div
                  className={`absolute inset-0 lg:inset-y-0 lg:w-1/2 ${
                    imageLeft ? "lg:left-0 lg:right-auto" : "lg:right-0 lg:left-auto"
                  } ${active ? "opacity-0 animate-fade-in" : "opacity-0"}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    className="w-full h-full object-cover object-top grayscale-[10%] contrast-[1.05]"
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  {/* Mobile: darken bottom so text is readable */}
                  <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-burgundy-900 from-30% via-burgundy-900/70 via-55% to-transparent" />

                  {/* Desktop: blend photo into the background towards the text */}
                  <div
                    className={`absolute inset-0 hidden lg:block ${
                      imageLeft
                        ? "bg-gradient-to-l from-burgundy-900 via-burgundy-900/10 to-transparent"
                        : "bg-gradient-to-r from-burgundy-900 via-burgundy-900/10 to-transparent"
                    }`}
                  />
                  {/* Desktop: soft fade at the bottom (behind the dots) */}
                  <div className="absolute inset-x-0 bottom-0 h-40 hidden lg:block bg-gradient-to-t from-burgundy-900/80 to-transparent" />
                </div>

                {/* Icon watermark on the text side */}
                <div
                  className={`absolute inset-y-0 hidden lg:flex items-center justify-center pointer-events-none w-1/2 ${
                    imageLeft ? "right-0" : "left-0"
                  }`}
                >
                  <IconComponent
                    className={`w-[600px] h-[600px] text-primary/[0.04] ${
                      index === 1 ? "-rotate-12" : "rotate-12"
                    }`}
                    strokeWidth={0.5}
                  />
                </div>

                {/* Gold accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                {/* Text */}
                <div className="container relative z-10 mx-auto px-6 lg:px-12 h-full flex items-end lg:items-center pb-28 lg:pb-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-w-0">
                    <div
                      className={`text-center ${
                        imageLeft ? "lg:col-start-2 lg:text-right lg:pl-12" : "lg:col-start-1 lg:text-left lg:pr-12"
                      }`}
                    >
                      <div className="space-y-6 lg:space-y-8">
                        {/* Small accent */}
                        <div
                          className={`flex items-center gap-3 justify-center ${
                            imageLeft ? "lg:justify-end" : "lg:justify-start"
                          } ${active ? "opacity-0 animate-fade-up" : "opacity-0"}`}
                        >
                          {imageLeft && (
                            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
                              {slide.badge}
                            </span>
                          )}
                          <div className="w-12 h-px bg-primary/50" />
                          {!imageLeft && (
                            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
                              {slide.badge}
                            </span>
                          )}
                        </div>

                        {/* Main Headline */}
                        <h1 className={active ? "opacity-0 animate-fade-up animate-delay-100" : "opacity-0"}>
                          <span className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl gradient-gold leading-tight">
                            {slide.title}
                          </span>
                          <br />
                          <span className="font-display text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground/90 leading-tight">
                            {slide.subtitle}
                          </span>
                        </h1>

                        {/* Description */}
                        <p
                          className={`text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto ${
                            imageLeft ? "lg:ml-auto lg:mr-0" : "lg:mx-0"
                          } ${active ? "opacity-0 animate-fade-up animate-delay-200" : "opacity-0"}`}
                        >
                          {slide.description}
                        </p>

                        {/* CTA */}
                        <div
                          className={`pt-2 lg:pt-4 flex justify-center ${
                            imageLeft ? "lg:justify-end" : "lg:justify-start"
                          } ${active ? "opacity-0 animate-fade-up animate-delay-300" : "opacity-0"}`}
                        >
                          <Button
                            asChild
                            size="lg"
                            className="btn-gold px-8 py-6 text-sm md:text-base tracking-wider font-display uppercase"
                          >
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                              {slide.cta}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "bg-primary w-8"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
