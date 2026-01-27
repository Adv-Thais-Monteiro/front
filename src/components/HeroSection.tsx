import { Button } from "@/components/ui/button";
import { Scale, Gavel, Heart } from "lucide-react";
import thaisHero from "@/assets/thais-hero.jpg";
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
  },
  {
    id: 3,
    icon: Heart,
    badge: "Atendimento Humanizado",
    title: "Você não está sozinho.",
    subtitle: "Acolhimento em cada etapa.",
    description: "Entendemos que por trás de cada processo existe uma história. Oferecemos suporte jurídico com empatia, transparência e dedicação integral ao seu caso.",
    cta: "Converse Conosco",
    imagePosition: "right" as const,
  },
];

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
    <section className="relative min-h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => {
            const IconComponent = slide.icon;
            return (
              <div
                key={slide.id}
                className="embla__slide relative min-h-screen flex items-center texture-overlay flex-[0_0_100%]"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900" />

                {/* Icon Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <IconComponent
                    className={`w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] text-primary/[0.03] ${
                      index === 1 ? "-rotate-12" : "rotate-12"
                    }`}
                    strokeWidth={0.5}
                  />
                </div>

                {/* Gold accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="container relative z-10 mx-auto px-6 lg:px-12">
                  <div
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                      slide.imagePosition === "left" ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Text Content */}
                    <div
                      className={`text-center lg:text-left ${
                        slide.imagePosition === "left"
                          ? "order-2 lg:order-2 lg:col-start-2"
                          : "order-2 lg:order-1"
                      }`}
                    >
                      <div className="space-y-8">
                        {/* Small accent */}
                        <div
                          className={`flex items-center gap-3 ${
                            slide.imagePosition === "left"
                              ? "justify-center lg:justify-end"
                              : "justify-center lg:justify-start"
                          } ${selectedIndex === index ? "opacity-0 animate-fade-up" : "opacity-0"}`}
                        >
                          {slide.imagePosition === "left" && (
                            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
                              {slide.badge}
                            </span>
                          )}
                          <div className="w-12 h-px bg-primary/50" />
                          {slide.imagePosition === "right" && (
                            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
                              {slide.badge}
                            </span>
                          )}
                        </div>

                        {/* Main Headline */}
                        <h1
                          className={`${
                            slide.imagePosition === "left" ? "lg:text-right" : ""
                          } ${selectedIndex === index ? "opacity-0 animate-fade-up animate-delay-100" : "opacity-0"}`}
                        >
                          <span className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl gradient-gold leading-tight">
                            {slide.title}
                          </span>
                          <br />
                          <span className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground/90 leading-tight">
                            {slide.subtitle}
                          </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                          className={`text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl ${
                            slide.imagePosition === "left"
                              ? "mx-auto lg:ml-auto lg:mr-0 lg:text-right"
                              : "mx-auto lg:mx-0"
                          } ${selectedIndex === index ? "opacity-0 animate-fade-up animate-delay-200" : "opacity-0"}`}
                        >
                          {slide.description}
                        </p>

                        {/* CTA Button */}
                        <div
                          className={`pt-4 ${
                            slide.imagePosition === "left"
                              ? "flex justify-center lg:justify-end"
                              : ""
                          } ${selectedIndex === index ? "opacity-0 animate-fade-up animate-delay-300" : "opacity-0"}`}
                        >
                          <Button
                            size="lg"
                            className="btn-gold px-8 py-6 text-base tracking-wider font-display uppercase"
                          >
                            {slide.cta}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      className={`flex ${
                        slide.imagePosition === "left"
                          ? "order-1 lg:order-1 lg:col-start-1 justify-center lg:justify-start"
                          : "order-1 lg:order-2 justify-center lg:justify-end"
                      } ${selectedIndex === index ? "opacity-0 animate-fade-in animate-delay-200" : "opacity-0"}`}
                    >
                      <div className="relative">
                        {/* Gold frame accent */}
                        <div className="absolute -inset-4 border border-primary/20 -z-10" />
                        <div className="absolute -inset-8 border border-primary/10 -z-20" />

                        {/* Image container */}
                        <div className="relative overflow-hidden max-w-md lg:max-w-lg">
                          <img
                            src={thaisHero}
                            alt="Dra. Thais Monteiro - Advogada Criminalista"
                            className="w-full h-auto object-cover grayscale-[20%] contrast-[1.05]"
                          />
                          {/* Subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/50 via-transparent to-transparent" />
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

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animate-delay-500 z-20">
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-subtle-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
