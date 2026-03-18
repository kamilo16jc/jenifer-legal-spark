import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Laura Martínez",
    role: "Empresaria",
    text: "Wilches Legal transformó por completo la forma en que manejo los asuntos legales de mi empresa. Su equipo es profesional, cercano y siempre disponible. ¡Totalmente recomendados!",
    rating: 5,
  },
  {
    name: "Roberto Sánchez",
    role: "Director Ejecutivo, TechCo",
    text: "La mejor decisión que tomé fue confiar en Jenifer y su equipo. Resolvieron un caso complejo de propiedad intelectual que otros bufetes no pudieron manejar.",
    rating: 5,
  },
  {
    name: "Carolina Pérez",
    role: "Madre de familia",
    text: "María Fernanda me acompañó en uno de los momentos más difíciles de mi vida. Su empatía y profesionalismo hicieron toda la diferencia en mi caso de custodia.",
    rating: 5,
  },
  {
    name: "Diego Herrera",
    role: "Ingeniero Civil",
    text: "Carlos me defendió de manera brillante. Su conocimiento del derecho penal es impresionante y su estrategia fue clave para obtener un resultado favorable.",
    rating: 5,
  },
  {
    name: "Andrea López",
    role: "Emprendedora Digital",
    text: "Necesitaba asesoría para constituir mi empresa y proteger mi marca. El equipo de Wilches Legal hizo todo el proceso simple y rápido. Excelente servicio.",
    rating: 5,
  },
  {
    name: "Fernando Ruiz",
    role: "Comerciante",
    text: "Tuve un problema contractual serio y Andrés lo resolvió con una eficiencia increíble. Su conocimiento del derecho comercial es de primer nivel.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

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
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Lo que Dicen <span className="gold-text">Nuestros Clientes</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-6 left-0 opacity-10">
            <Quote className="w-24 h-24 text-secondary" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center px-8 md:px-16"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} className="text-secondary text-lg">★</span>
                ))}
              </div>
              <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <div>
                <p className="font-display text-lg font-semibold text-primary">{testimonials[current].name}</p>
                <p className="font-body text-sm text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "gold-gradient w-6" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
