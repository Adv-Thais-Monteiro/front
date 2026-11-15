import fotoPensativa from "@/assets/thais-bordo-pensativa.jpg";

const StatementSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-secondary">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image (right on desktop: she looks up-left, towards the text) */}
          <div className="relative w-full max-w-xs lg:max-w-sm mx-auto lg:order-2">
            <div className="absolute -inset-3 border border-primary/20" />
            <div className="relative overflow-hidden">
              <img
                src={fotoPensativa}
                alt="Dra. Thais Monteiro em pose reflexiva"
                className="w-full aspect-[4/5] object-cover object-top grayscale-[10%] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Quote */}
          <div className="text-center lg:text-left lg:order-1">
            {/* Section Label */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="w-12 h-px bg-primary/40" />
              <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Minha Missão</span>
            </div>

            {/* Quote marks */}
            <div className="text-primary/30 text-8xl font-display leading-none mb-2">"</div>

            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed tracking-wide">
              Eu busco a justiça em defesa da{" "}
              <span className="gradient-gold">liberdade</span> dos que são julgados não merecedores.
            </blockquote>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="w-16 h-px bg-primary/40" />
              <span className="text-primary text-sm tracking-[0.2em] uppercase">Thais Monteiro</span>
              <div className="w-16 h-px bg-primary/40 lg:hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" />
    </section>
  );
};

export default StatementSection;
