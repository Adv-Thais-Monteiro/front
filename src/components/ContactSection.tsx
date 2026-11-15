import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Shield } from "lucide-react";
import { EMAIL, WHATSAPP_DISPLAY, emailLink, whatsappLink } from "@/lib/contact";

const ContactSection = () => {
  return (
    <footer className="relative py-24 md:py-32 bg-background">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold mb-6">
              Sua defesa exige urgência e sigilo.
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
              Entre em contato para uma consulta confidencial. Cada momento é crucial na defesa dos seus direitos.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="btn-gold px-8 py-6 text-base tracking-wider font-display uppercase flex items-center gap-3"
            >
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp (Atendimento Urgente)
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 px-8 py-6 text-base tracking-wider font-display uppercase flex items-center gap-3 transition-all duration-300"
            >
              <a href={emailLink}>
                <Mail className="w-5 h-5" />
                Enviar E-mail
              </a>
            </Button>
          </div>

          {/* Contact details (visible for copy/paste) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 -mt-8 mb-16 text-sm text-muted-foreground font-light">
            <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            <span className="break-all">E-mail: {EMAIL}</span>
          </div>
          
          {/* Divider */}
          <div className="gold-line mb-12" />
          
          {/* Footer Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 gold-icon flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h4 className="font-display text-foreground mb-2 tracking-wide">Escritório</h4>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  Monteiro Sociedade de Advogados<br />
                  Rua São Sérgio, 305 - 2º andar<br />
                  Leblon, Uberaba - MG
                </p>
              </div>
            </div>
            
            {/* OAB Info */}
            <div className="flex items-start gap-4">
              <Shield className="w-5 h-5 gold-icon flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h4 className="font-display text-foreground mb-2 tracking-wide">Registro Profissional</h4>
                <p className="text-muted-foreground text-sm font-light">
                  OAB/MG 198361<br />
                  Inscrita na Ordem dos Advogados do Brasil
                </p>
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="p-6 border border-primary/20 bg-card/50">
            <p className="text-muted-foreground text-xs font-light text-center leading-relaxed">
              <span className="text-primary">Sigilo Profissional:</span> Todas as informações compartilhadas são protegidas pelo sigilo advogado-cliente, garantido pelo Estatuto da Advocacia (Lei 8.906/94) e pelo Código de Ética e Disciplina da OAB. Seu caso será tratado com a máxima confidencialidade.
            </p>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground/60 text-sm font-light">
              © {new Date().getFullYear()} Thais Monteiro Advocacia Criminal. Todos os direitos reservados.
            </p>
            <p className="mt-3 text-muted-foreground/50 text-xs font-light tracking-wide">
              Desenvolvido por{" "}
              <a
                href="https://www.e9solucoes.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors duration-300 underline-offset-4 hover:underline"
              >
                E9 Soluções
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
