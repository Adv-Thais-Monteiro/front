import { GraduationCap, Award, Users, BookOpen } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Pós-graduação em Direito Penal e Processual Penal",
    institution: "Instituição de Referência Nacional"
  },
  {
    icon: Award,
    title: "Especialização em Tribunal do Júri",
    institution: "Formação Avançada em Técnicas de Plenário"
  },
  {
    icon: Users,
    title: "Membro da Comissão de Direito Criminal",
    institution: "Ordem dos Advogados do Brasil"
  },
  {
    icon: BookOpen,
    title: "Cursos de Atualização em Processo Penal Estratégico",
    institution: "Formação Contínua e Atualização Jurídica"
  }
];

const QualificationsSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-secondary marble-texture">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Credenciais</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold">
            Formação e Excelência Técnica
          </h2>
        </div>
        
        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {credentials.map((credential, index) => (
            <div 
              key={index}
              className="flex items-start gap-5 group"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-primary/30 bg-card transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-gold-glow">
                <credential.icon className="w-6 h-6 gold-icon" strokeWidth={1.5} />
              </div>
              
              {/* Text */}
              <div>
                <h3 className="font-display text-lg text-foreground mb-1 tracking-wide">
                  {credential.title}
                </h3>
                <p className="text-muted-foreground text-sm font-light">
                  {credential.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" />
    </section>
  );
};

export default QualificationsSection;
