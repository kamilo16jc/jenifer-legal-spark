import { motion } from "framer-motion";
import heroImg from "@/assets/hero-jenifer.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30 z-10" />
        <img
          src={heroImg}
          alt="Jenifer Wilches"
          className="absolute right-0 top-0 h-full w-2/3 object-cover object-top"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-6">
              Bufete de Abogados
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary leading-tight mb-6"
          >
            Excelencia Jurídica
            <br />
            <span className="gold-text">con Visión Moderna</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-md"
          >
            Asesoría legal integral con un enfoque fresco, cercano y comprometido con tus derechos. Tu tranquilidad es nuestra prioridad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-4"
          >
            <a
              href="#contacto"
              className="gold-gradient px-8 py-4 rounded-full font-body font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Agenda tu Consulta
            </a>
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full font-body font-semibold border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Conoce Más
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute left-12 top-1/4 bottom-1/4 w-px gold-gradient origin-top hidden lg:block"
      />
    </section>
  );
};

export default HeroSection;
