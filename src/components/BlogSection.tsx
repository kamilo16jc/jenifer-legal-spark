import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    title: "¿Qué hacer ante un despido injustificado?",
    excerpt: "Conoce tus derechos laborales y los pasos legales para protegerte ante un despido sin justa causa en Colombia.",
    category: "Derecho Laboral",
    date: "12 Mar 2026",
    readTime: "5 min",
  },
  {
    title: "Guía completa sobre custodia compartida",
    excerpt: "Todo lo que necesitas saber sobre la custodia compartida, requisitos legales y cómo solicitarla.",
    category: "Derecho de Familia",
    date: "8 Mar 2026",
    readTime: "7 min",
  },
  {
    title: "Protege tu marca: Registro de propiedad intelectual",
    excerpt: "Pasos esenciales para registrar tu marca en Colombia y proteger tu propiedad intelectual.",
    category: "Propiedad Intelectual",
    date: "1 Mar 2026",
    readTime: "6 min",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-4 block">
            Blog Legal
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Artículos <span className="gold-text">Destacados</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mantente informado con nuestros artículos sobre temas legales relevantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="gold-gradient h-1.5 w-full" />
              <div className="p-6">
                <span className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-4">
                  {article.category}
                </span>
                <h3 className="font-display text-lg font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-body text-xs">{article.date}</span>
                    <span className="text-xs">·</span>
                    <span className="font-body text-xs">{article.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-secondary font-body text-xs font-semibold group-hover:gap-2 transition-all">
                    Leer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
