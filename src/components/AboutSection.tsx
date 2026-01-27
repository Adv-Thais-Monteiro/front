import thaisAbout from "@/assets/thais-about.jpg";

const AboutSection = () => {
  return (
    <section className="relative py-24 md:py-32 texture-overlay">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            {/* Gold frame accent */}
            <div className="absolute -inset-3 border border-primary/20" />
            <div className="absolute -inset-6 border border-primary/10" />
            
            <div className="relative overflow-hidden">
              <img 
                src={thaisAbout} 
                alt="Dra. Thais Monteiro"
                className="w-full h-auto object-cover grayscale-[20%] contrast-[1.05]"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-900/40 via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary/40" />
              <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Sobre</span>
            </div>
            
            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold">
              A Advogada
            </h2>
            
            {/* Content */}
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Com anos de dedicação exclusiva ao Direito Penal, a Dra. Thais Monteiro construiu uma reputação sólida na advocacia criminal, pautada pela{" "}
                <span className="text-foreground">ética inabalável</span> e pelo compromisso absoluto com a defesa dos direitos de seus clientes.
              </p>
              <p>
                Sua atuação é marcada por uma postura{" "}
                <span className="text-foreground">combativa e estratégica</span>, sempre fundamentada em profundo conhecimento técnico e atualização constante das teses jurídicas mais relevantes.
              </p>
              <p>
                Cada caso recebe{" "}
                <span className="text-foreground">atenção personalizada</span>, com análise minuciosa das particularidades e desenvolvimento de estratégias sob medida para garantir a melhor defesa possível.
              </p>
            </div>
            
            {/* Signature accent */}
            <div className="pt-4">
              <div className="w-24 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
