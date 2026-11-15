import { ArrowRight } from "lucide-react";
import fotoBeca from "@/assets/thais-bordo-beca.jpg";
import { whatsappLink } from "@/lib/contact";

const featured = {
  numeral: "I",
  title: "Tribunal do Júri",
  description:
    "Atuação combativa em crimes dolosos contra a vida. Preparação técnica rigorosa para o plenário, com estratégia e oratória diante do Conselho de Sentença.",
};

const otherAreas = [
  {
    numeral: "II",
    title: "Sustentação Oral e Recursos",
    description:
      "A defesa não termina na sentença. Recursos e sustentação oral perante os Tribunais, levando a causa à segunda e à terceira instância sempre que houver espaço para reverter uma decisão.",
  },
  {
    numeral: "III",
    title: "Crimes Digitais & Cibernéticos",
    description:
      "Defesa especializada em delitos cometidos em ambiente virtual, fraudes eletrônicas e proteção de dados pessoais.",
  },
  {
    numeral: "IV",
    title: "Recursos em Tribunais Superiores",
    description:
      "Atuação estratégica no STJ e no STF para reverter condenações, com domínio de Habeas Corpus e Recursos Especiais.",
  },
];

const PracticeAreasSection = () => {
  return (
    <section className="relative py-24 md:py-32 texture-overlay">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Expertise</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold">
            Atuação Especializada
          </h2>
        </div>

        <div className="grid lg:grid-cols-[7fr_5fr] gap-4 lg:gap-5 max-w-6xl mx-auto">
          {/* Featured: Tribunal do Júri */}
          <article className="group relative min-h-[680px] sm:min-h-[620px] lg:min-h-[600px] overflow-hidden border border-primary/20 flex">
            <img
              src={fotoBeca}
              alt="Dra. Thais Monteiro vestindo a beca, pronta para o plenário do Júri"
              className="absolute inset-0 w-full h-full object-cover object-top origin-[50%_15%] scale-[1.35] contrast-[1.05] transition-transform duration-[1500ms] ease-out group-hover:scale-[1.42]"
              loading="lazy"
            />
            {/* Readability overlay (only behind the text at the bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900 from-35% via-burgundy-900/80 via-55% to-transparent to-80% lg:from-15% lg:via-burgundy-900/75 lg:via-45% lg:to-75%" />

            <div className="relative z-10 mt-auto p-8 md:p-12">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-2xl gradient-gold leading-none">{featured.numeral}</span>
                <div className="w-10 h-px bg-primary/50" />
                <span className="text-primary/80 text-xs tracking-[0.3em] uppercase">Atuação principal</span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl gradient-gold leading-tight mb-5">
                {featured.title}
              </h3>

              <p className="text-foreground/80 font-light leading-relaxed max-w-lg mb-8">
                {featured.description}
              </p>

              <a
                href={whatsappLink("Olá, Dra. Thais! Gostaria de falar sobre um caso de Tribunal do Júri.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-primary font-display uppercase tracking-[0.15em] text-sm border-b border-primary/40 pb-1 hover:border-primary transition-colors duration-300"
              >
                Fale com a Dra. Thais
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </article>

          {/* Other areas */}
          <div className="grid gap-4 lg:gap-5 lg:grid-rows-3">
            {otherAreas.map((area) => (
              <article
                key={area.numeral}
                className="group relative overflow-hidden border border-primary/15 bg-card/60 p-7 md:p-8 flex flex-col justify-center transition-colors duration-500 hover:bg-card hover:border-primary/40"
              >
                {/* Gold side bar that grows on hover */}
                <span className="absolute left-0 top-0 w-px h-full bg-primary/30 origin-top scale-y-50 transition-transform duration-500 group-hover:scale-y-100 group-hover:bg-primary/70" />

                {/* Large numeral in the background */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[7rem] leading-none text-primary/[0.06] transition-colors duration-500 group-hover:text-primary/[0.12]"
                >
                  {area.numeral}
                </span>

                <div className="relative">
                  <span className="block font-display text-sm text-primary/70 tracking-[0.2em] mb-2">
                    {area.numeral}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wide mb-3">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-[0.95rem] leading-relaxed font-light">
                    {area.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
