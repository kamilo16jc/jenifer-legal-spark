import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, FileText, Users, Building2, Shield, Briefcase } from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Derecho Civil",
    description: "Contratos, obligaciones, responsabilidad civil y resolución de conflictos patrimoniales.",
  },
  {
    icon: Users,
    title: "Derecho de Familia",
    description: "Divorcios, custodia, adopciones y protección integral de los derechos familiares.",
  },
  {
    icon: Building2,
    title: "Derecho Comercial",
    description: "Constitución de empresas, fusiones, adquisiciones y asesoría corporativa integral.",
  },
  {
    icon: FileText,
    title: "Derecho Laboral",
    description: "Defensa de derechos laborales, despidos injustificados y negociaciones colectivas.",
  },
  {
    icon: Shield,
    title: "Derecho Penal",
    description: "Defensa penal estratégica, audiencias y protección de tus garantías constitucionales.",
  },
  {
    icon: Briefcase,
    title: "Propiedad Intelectual",
    description: "Registro de marcas, patentes, derechos de autor y protección de activos intangibles.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-500"
    >
      <div className="gold-gradient w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <service.icon className="w-6 h-6 text-accent-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-primary mb-3">{service.title}</h3>
      <p className="font-body text-muted-foreground leading-relaxed text-sm">{service.description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-4 block">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Áreas de <span className="gold-text">Práctica</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ofrecemos soluciones legales integrales adaptadas a las necesidades de cada cliente, con un enfoque moderno y personalizado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
