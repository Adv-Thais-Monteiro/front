const StatementSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-secondary">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote marks */}
          <div className="text-primary/30 text-8xl font-display leading-none mb-6">"</div>
          
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed tracking-wide">
            No direito penal, a excelência técnica não é um diferencial, é uma{" "}
            <span className="gradient-gold">obrigação</span>. Lutamos pela sua liberdade com rigor e dedicação absoluta.
          </blockquote>
          
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-primary/40" />
            <span className="text-primary text-sm tracking-[0.2em] uppercase">Thais Monteiro</span>
            <div className="w-16 h-px bg-primary/40" />
          </div>
        </div>
      </div>
      
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" />
    </section>
  );
};

export default StatementSection;
