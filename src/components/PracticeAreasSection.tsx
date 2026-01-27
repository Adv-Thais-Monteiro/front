import { Scale, Gavel, Shield, Building } from "lucide-react";

const practiceAreas = [
  {
    icon: Building,
    title: "Crimes de Colarinho Branco",
    description: "Defesa em crimes financeiros, tributários, lavagem de dinheiro e corrupção. Atuação em grandes operações com sigilo e estratégia."
  },
  {
    icon: Gavel,
    title: "Tribunal do Júri",
    description: "Atuação combativa em crimes dolosos contra a vida. Preparação técnica rigorosa para plenário e sustentações orais."
  },
  {
    icon: Shield,
    title: "Crimes Digitais & Cibernéticos",
    description: "Defesa especializada em delitos cometidos em ambiente virtual, fraudes eletrônicas e proteção de dados pessoais."
  },
  {
    icon: Scale,
    title: "Recursos em Tribunais Superiores",
    description: "Atuação estratégica no STJ e STF para reverter condenações. Expertise em Habeas Corpus e Recursos Especiais."
  }
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
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {practiceAreas.map((area, index) => (
            <div 
              key={index}
              className="luxury-card group p-8 md:p-10"
            >
              {/* Icon */}
              <div className="mb-6">
                <area.icon className="w-10 h-10 gold-icon transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-4 tracking-wide">
                {area.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed font-light">
                {area.description}
              </p>
              
              {/* Bottom accent line */}
              <div className="mt-8 w-12 h-px bg-primary/30 transition-all duration-500 group-hover:w-24 group-hover:bg-primary/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
