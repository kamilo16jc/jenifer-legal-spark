import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta la primera consulta?",
    answer: "La primera consulta es completamente gratuita y sin compromiso. En ella evaluamos tu caso, te orientamos sobre tus opciones legales y definimos juntos la mejor estrategia a seguir.",
  },
  {
    question: "¿En qué ciudades operan?",
    answer: "Nuestra oficina principal está en Bogotá, pero atendemos casos a nivel nacional. Además, ofrecemos asesoría virtual para clientes en cualquier parte de Colombia y el exterior.",
  },
  {
    question: "¿Cuánto tiempo tarda un proceso legal?",
    answer: "Los tiempos varían según el tipo de caso y su complejidad. En la consulta inicial te daremos una estimación realista basada en nuestra experiencia. Siempre trabajamos para resolver tu caso en el menor tiempo posible.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos transferencias bancarias, tarjetas de crédito y débito, y ofrecemos planes de pago flexibles adaptados a las necesidades de cada cliente.",
  },
  {
    question: "¿Manejan casos internacionales?",
    answer: "Sí, contamos con experiencia en casos con componentes internacionales y tenemos alianzas con firmas en varios países de Latinoamérica para ofrecer una cobertura integral.",
  },
  {
    question: "¿Cómo puedo hacer seguimiento de mi caso?",
    answer: "Mantenemos comunicación constante con nuestros clientes a través de canales digitales. Recibirás actualizaciones periódicas y tendrás acceso directo a tu abogado asignado en todo momento.",
  },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="border-b border-border/50 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-display text-base font-semibold text-primary group-hover:text-secondary transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-secondary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
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
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Preguntas <span className="gold-text">Frecuentes</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border/50 px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
