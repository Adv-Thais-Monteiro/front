import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quando devo procurar um advogado criminalista?",
    answer: "O ideal é procurar um advogado criminalista no momento em que você tomar conhecimento de qualquer investigação ou processo criminal envolvendo seu nome. Quanto antes a defesa técnica for iniciada, maiores são as chances de um resultado favorável. A atuação preventiva pode evitar prisões desnecessárias e proteger seus direitos desde o início."
  },
  {
    question: "Como funciona o sigilo profissional na advocacia criminal?",
    answer: "O sigilo profissional é um dever ético inviolável. Todas as informações compartilhadas com seu advogado são protegidas pelo sigilo absoluto, garantido pelo Estatuto da Advocacia e pelo Código de Ética. Isso significa que nada do que você me contar poderá ser revelado a terceiros, nem mesmo em juízo."
  },
  {
    question: "Qual a diferença entre prisão em flagrante, preventiva e temporária?",
    answer: "A prisão em flagrante ocorre no momento do crime ou logo após. A prisão preventiva é decretada durante a investigação ou processo para garantir a ordem pública ou a instrução criminal. Já a prisão temporária é cabível apenas na fase de investigação, por prazo determinado. Cada modalidade possui requisitos específicos que podem ser contestados tecnicamente."
  },
  {
    question: "O que é Habeas Corpus e quando pode ser utilizado?",
    answer: "O Habeas Corpus é um remédio constitucional que protege o direito de ir e vir. Pode ser impetrado sempre que houver prisão ilegal, ameaça de prisão sem justa causa, ou qualquer constrangimento à liberdade de locomoção. É uma das ferramentas mais eficazes para garantir a liberdade do cliente de forma célere."
  },
  {
    question: "Como funciona a defesa em crimes de colarinho branco?",
    answer: "A defesa em crimes de colarinho branco exige profundo conhecimento técnico em direito penal econômico, tributário e empresarial. Envolve análise minuciosa de documentos, perícias contábeis e estratégias sofisticadas. A atuação é discreta e visa tanto a absolvição quanto a preservação da reputação do cliente."
  },
  {
    question: "É possível recorrer de uma condenação criminal?",
    answer: "Sim, o sistema brasileiro prevê múltiplas instâncias recursais. Após uma condenação, é possível recorrer aos Tribunais de Justiça, Tribunais Regionais Federais, Superior Tribunal de Justiça (STJ) e Supremo Tribunal Federal (STF). Cada recurso possui requisitos específicos e prazos que devem ser rigorosamente observados."
  }
];

const FAQSection = () => {
  return (
    <section className="relative py-24 md:py-32 texture-overlay">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Insights</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold mb-6">
            Dúvidas Frequentes
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Esclarecimentos essenciais sobre direito criminal e o funcionamento da defesa técnica.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="luxury-card border-border/50 px-6 md:px-8 rounded-sm overflow-hidden"
              >
                <AccordionTrigger className="text-left font-display text-lg md:text-xl text-foreground hover:text-primary transition-colors hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
