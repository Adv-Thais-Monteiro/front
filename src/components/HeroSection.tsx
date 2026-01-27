import { Button } from "@/components/ui/button";
import thaisHero from "@/assets/thais-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center texture-overlay">
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900" />
      
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-8">
              {/* Small accent */}
              <div className="flex items-center justify-center lg:justify-start gap-3 opacity-0 animate-fade-up">
                <div className="w-12 h-px bg-primary/50" />
                <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
                  Advocacia Criminal
                </span>
              </div>
              
              {/* Main Headline */}
              <h1 className="opacity-0 animate-fade-up animate-delay-100">
                <span className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl gradient-gold leading-tight">
                  Thais Monteiro.
                </span>
                <br />
                <span className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground/90 leading-tight">
                  Advocacia Criminal Estratégica.
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-0 animate-fade-up animate-delay-200">
                Defesa técnica, combativa e discreta para os momentos mais críticos.
              </p>
              
              {/* CTA Button */}
              <div className="pt-4 opacity-0 animate-fade-up animate-delay-300">
                <Button 
                  size="lg" 
                  className="btn-gold px-8 py-6 text-base tracking-wider font-display uppercase"
                >
                  Agendar Consulta Sigilosa
                </Button>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 animate-fade-in animate-delay-200">
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
      
      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animate-delay-500">
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-subtle-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
