import { Award, TrendingUp, Users, CheckCircle } from "lucide-react";

const successCases = [
  {
    icon: Award,
    number: "150+",
    label: "Absolvições",
    description: "Clientes absolvidos em crimes complexos"
  },
  {
    icon: TrendingUp,
    number: "98%",
    label: "Taxa de Sucesso",
    description: "Em recursos nos Tribunais Superiores"
  },
  {
    icon: Users,
    number: "500+",
    label: "Clientes Atendidos",
    description: "Com total sigilo e discrição"
  },
  {
    icon: CheckCircle,
    number: "80+",
    label: "Habeas Corpus",
    description: "Deferidos em casos urgentes"
  }
];

const SuccessCasesSection = () => {
  return (
    <section className="relative py-24 md:py-32 texture-overlay overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/50 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Resultados</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold mb-6">
            Casos de Sucesso
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Décadas de experiência traduzidas em resultados concretos para nossos clientes.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {successCases.map((item, index) => (
            <div 
              key={index}
              className="luxury-card group p-6 md:p-8 text-center"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <item.icon className="w-8 h-8 gold-icon transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </div>
              
              {/* Number */}
              <div className="font-display text-3xl md:text-4xl gradient-gold mb-2">
                {item.number}
              </div>
              
              {/* Label */}
              <h3 className="font-display text-lg text-foreground mb-2 tracking-wide">
                {item.label}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Disclaimer */}
        <p className="text-center text-muted-foreground/60 text-xs mt-12 max-w-xl mx-auto">
          *Os números apresentados refletem a experiência acumulada ao longo da carreira. 
          Cada caso é único e os resultados podem variar.
        </p>
      </div>
    </section>
  );
};

export default SuccessCasesSection;
