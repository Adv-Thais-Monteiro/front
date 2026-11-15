import { MessageCircle, FileSearch, Compass, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Primeiro Contato Sigiloso",
    description: "Você relata a sua situação com total confidencialidade. Tudo o que for dito está protegido pelo sigilo profissional desde o primeiro minuto.",
  },
  {
    icon: FileSearch,
    title: "Análise Técnica do Caso",
    description: "Estudo minucioso dos autos, das provas e dos fatos para identificar riscos, nulidades e as melhores teses de defesa.",
  },
  {
    icon: Compass,
    title: "Estratégia Sob Medida",
    description: "Definição clara dos caminhos possíveis, com transparência sobre cada etapa, prazos e decisões a serem tomadas em conjunto.",
  },
  {
    icon: ShieldCheck,
    title: "Defesa e Acompanhamento",
    description: "Atuação presente em todas as fases do processo, com atualizações constantes para que você nunca fique sem respostas.",
  },
];

const ProcessSection = () => {
  return (
    <section className="relative py-24 md:py-32 texture-overlay overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/50 to-transparent" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Método</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold mb-6">
            Como Funciona o Atendimento
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Um caminho claro, do primeiro contato até a conclusão do processo, para que você saiba exatamente o que esperar.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="luxury-card group p-6 md:p-8 relative">
              {/* Step number */}
              <div className="flex items-center justify-between mb-6">
                <step.icon
                  className="w-8 h-8 gold-icon transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="font-display text-3xl md:text-4xl text-primary/25 transition-colors duration-500 group-hover:text-primary/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display text-lg text-foreground mb-3 tracking-wide">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 w-12 h-px bg-primary/30 transition-all duration-500 group-hover:w-24 group-hover:bg-primary/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
