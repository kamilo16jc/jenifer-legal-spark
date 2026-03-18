import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import heroImg from "@/assets/hero-jenifer.jpg";

const stats = [
  { value: 500, suffix: "+", label: "Casos Resueltos" },
  { value: 98, suffix: "%", label: "Clientes Satisfechos" },
  { value: 5, suffix: "", label: "Años de Experiencia" },
  { value: 4, suffix: "", label: "Abogados Expertos" },
];

const AnimatedCounter = ({ value, suffix, delay }: { value: number; suffix: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl md:text-4xl font-bold gold-text">
        {count}{suffix}
      </span>
      <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">{/* label set by parent */}</p>
    </div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Parallax background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
        <motion.img
          style={{ y: imageY }}
          src={heroImg}
          alt="Jenifer Wilches"
          className="absolute right-0 -top-12 h-[120%] w-2/3 object-cover object-top"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-secondary/30"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y: textY, opacity }} className="container mx-auto px-6 relative z-20">
        <div className="max-w-xl">
          {/* Animated label with typewriter-style reveal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-6">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-block w-8 h-px bg-secondary origin-left"
              />
              Bufete de Abogados
            </span>
          </motion.div>

          {/* Title with staggered word animation */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
            {"Excelencia Jurídica".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.3em]"
                style={{ perspective: 600 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="gold-text">
              {"con Visión Moderna".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Animated decorative line under title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            className="w-24 h-0.5 gold-gradient origin-left mb-6"
          />

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
            className="flex flex-wrap gap-4 pb-28"
          >
            <a
              href="#contacto"
              className="gold-gradient px-8 py-4 rounded-full font-body font-semibold text-accent-foreground hover:opacity-90 transition-opacity hover:shadow-lg hover:shadow-secondary/20"
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
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="container mx-auto px-6">
          <div className="bg-card/80 backdrop-blur-lg rounded-t-2xl border border-border/50 border-b-0 px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 200} />
                <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative line */}
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
