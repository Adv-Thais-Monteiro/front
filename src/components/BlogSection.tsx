import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const featuredPosts = [
  {
    id: 1,
    title: "Direitos do Acusado: O que você precisa saber",
    excerpt: "Conheça os principais direitos garantidos pela Constituição Federal a todo cidadão acusado em processo criminal.",
    date: "15 Jan 2024",
    category: "Direito Penal",
  },
  {
    id: 2,
    title: "Habeas Corpus: Quando e como solicitar",
    excerpt: "Entenda em quais situações o habeas corpus pode ser utilizado para garantir a liberdade do indivíduo.",
    date: "08 Jan 2024",
    category: "Recursos",
  },
  {
    id: 3,
    title: "Tribunal do Júri: Como funciona o processo",
    excerpt: "Um guia completo sobre o funcionamento do Tribunal do Júri no sistema jurídico brasileiro.",
    date: "02 Jan 2024",
    category: "Processo Penal",
  },
];

const BlogSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-card/50">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 gold-icon" strokeWidth={1.5} />
            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
              Conhecimento Jurídico
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold mb-6">
            Blog & Publicações
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Artigos e insights sobre direito criminal para mantê-lo informado sobre seus direitos.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group p-6 border border-primary/20 bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="mb-4">
                <span className="text-xs text-primary/70 tracking-wider uppercase">
                  {post.category}
                </span>
              </div>
              <h3 className="font-display text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm font-light mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground/60 text-xs">{post.date}</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 px-8 py-6 text-base tracking-wider font-display uppercase transition-all duration-300"
          >
            <Link to="/blog" className="flex items-center gap-3">
              Ver Todas as Publicações
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
