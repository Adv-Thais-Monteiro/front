import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const allPosts = [
  {
    id: 1,
    title: "Direitos do Acusado: O que você precisa saber",
    excerpt: "Conheça os principais direitos garantidos pela Constituição Federal a todo cidadão acusado em processo criminal. Este artigo explora as garantias fundamentais que protegem o réu durante todo o processo.",
    date: "15 Jan 2024",
    category: "Direito Penal",
    featured: true,
  },
  {
    id: 2,
    title: "Habeas Corpus: Quando e como solicitar",
    excerpt: "Entenda em quais situações o habeas corpus pode ser utilizado para garantir a liberdade do indivíduo e como funciona o processo de impetração.",
    date: "08 Jan 2024",
    category: "Recursos",
    featured: true,
  },
  {
    id: 3,
    title: "Tribunal do Júri: Como funciona o processo",
    excerpt: "Um guia completo sobre o funcionamento do Tribunal do Júri no sistema jurídico brasileiro, desde a fase de pronúncia até o julgamento popular.",
    date: "02 Jan 2024",
    category: "Processo Penal",
    featured: true,
  },
  {
    id: 4,
    title: "Prisão Preventiva: Requisitos e contestação",
    excerpt: "Análise detalhada dos requisitos legais para decretação da prisão preventiva e as estratégias de defesa para sua revogação.",
    date: "28 Dez 2023",
    category: "Direito Penal",
    featured: false,
  },
  {
    id: 5,
    title: "Crimes Econômicos: Defesa técnica especializada",
    excerpt: "Os crimes contra a ordem econômica exigem conhecimento técnico aprofundado. Conheça as principais estratégias de defesa nessa área.",
    date: "20 Dez 2023",
    category: "Crimes Econômicos",
    featured: false,
  },
  {
    id: 6,
    title: "A importância do sigilo profissional na advocacia criminal",
    excerpt: "O sigilo advogado-cliente é fundamental para uma defesa efetiva. Entenda como ele funciona e sua proteção legal.",
    date: "15 Dez 2023",
    category: "Ética Profissional",
    featured: false,
  },
  {
    id: 7,
    title: "Acordo de Não Persecução Penal: O que mudou",
    excerpt: "Conheça as alterações trazidas pelo pacote anticrime sobre o ANPP e como ele pode beneficiar o acusado.",
    date: "10 Dez 2023",
    category: "Processo Penal",
    featured: false,
  },
  {
    id: 8,
    title: "Delação Premiada: Riscos e benefícios",
    excerpt: "Uma análise criteriosa sobre os aspectos positivos e negativos da colaboração premiada para o delator.",
    date: "05 Dez 2023",
    category: "Direito Penal",
    featured: false,
  },
];

const categories = ["Todos", "Direito Penal", "Processo Penal", "Recursos", "Crimes Econômicos", "Ética Profissional"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = selectedCategory === "Todos"
    ? allPosts
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative py-20 md:py-28 bg-card">
        <div className="absolute inset-0 bg-burgundy-gradient opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wide">Voltar ao início</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 gold-icon" strokeWidth={1.5} />
            <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-light">
              Blog Jurídico
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl gradient-gold mb-6">
            Publicações
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl">
            Artigos, análises e insights sobre direito criminal para mantê-lo informado sobre seus direitos e as atualizações do mundo jurídico.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "btn-gold"
                    : "border-primary/30 text-muted-foreground hover:border-primary/50 hover:text-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col p-6 border border-primary/20 bg-card hover:border-primary/40 transition-all duration-300"
              >
                {post.featured && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs bg-primary/20 text-primary tracking-wider uppercase">
                      Destaque
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                <h2 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground text-sm font-light mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-primary text-sm font-light cursor-pointer group-hover:gap-2 transition-all">
                  <span>Ler artigo</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Nenhuma publicação encontrada nesta categoria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer CTA */}
      <section className="py-16 border-t border-primary/20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-muted-foreground mb-6">
            Tem dúvidas sobre algum tema jurídico?
          </p>
          <Button 
            asChild
            className="btn-gold px-8 py-6 text-base tracking-wider font-display uppercase"
          >
            <Link to="/">Entre em contato</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
