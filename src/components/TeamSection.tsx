import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import heroJenifer from "@/assets/hero-jenifer.jpg";
import teamCarlos from "@/assets/team-carlos.jpg";
import teamMaria from "@/assets/team-maria.jpg";
import teamAndres from "@/assets/team-andres.jpg";

interface Expertise {
  name: string;
  level: number;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: Expertise[];
  timeline: { year: string; event: string }[];
}

const team: TeamMember[] = [
  {
    name: "Jenifer Wilches",
    role: "Socia Fundadora & Directora",
    image: heroJenifer,
    bio: "Abogada con visión estratégica y pasión por la justicia. Líder del bufete con un enfoque innovador en la práctica legal moderna.",
    expertise: [
      { name: "Derecho Civil", level: 95 },
      { name: "Derecho Comercial", level: 90 },
      { name: "Litigios Complejos", level: 88 },
      { name: "Mediación", level: 85 },
    ],
    timeline: [
      { year: "2018", event: "Graduada con honores - Universidad Nacional" },
      { year: "2019", event: "Especialización en Derecho Comercial" },
      { year: "2021", event: "Fundación de Wilches Legal Boutique" },
      { year: "2023", event: "Reconocida como joven líder legal" },
    ],
  },
  {
    name: "Carlos Mendoza",
    role: "Asociado Senior - Derecho Penal",
    image: teamCarlos,
    bio: "Especialista en defensa penal con amplia experiencia en casos de alta complejidad y derecho procesal penal.",
    expertise: [
      { name: "Derecho Penal", level: 92 },
      { name: "Derecho Procesal", level: 88 },
      { name: "Litigios Orales", level: 90 },
      { name: "Garantías Constitucionales", level: 85 },
    ],
    timeline: [
      { year: "2016", event: "Egresado - Universidad del Rosario" },
      { year: "2018", event: "Maestría en Ciencias Penales" },
      { year: "2022", event: "Se une a Wilches Legal" },
      { year: "2024", event: "Promoción a Asociado Senior" },
    ],
  },
  {
    name: "María Fernanda López",
    role: "Asociada - Derecho de Familia",
    image: teamMaria,
    bio: "Apasionada por la defensa de los derechos familiares y la mediación como herramienta de resolución pacífica de conflictos.",
    expertise: [
      { name: "Derecho de Familia", level: 93 },
      { name: "Mediación Familiar", level: 90 },
      { name: "Custodia y Adopción", level: 87 },
      { name: "Violencia Intrafamiliar", level: 85 },
    ],
    timeline: [
      { year: "2017", event: "Egresada - Universidad Javeriana" },
      { year: "2019", event: "Diplomado en Mediación y Conciliación" },
      { year: "2021", event: "Se integra al equipo Wilches Legal" },
      { year: "2023", event: "Certificación internacional en Mediación" },
    ],
  },
  {
    name: "Andrés Gutiérrez",
    role: "Consultor - Derecho Laboral",
    image: teamAndres,
    bio: "Experto en relaciones laborales con décadas de experiencia asesorando empresas y trabajadores en sus derechos.",
    expertise: [
      { name: "Derecho Laboral", level: 95 },
      { name: "Negociación Colectiva", level: 88 },
      { name: "Seguridad Social", level: 86 },
      { name: "Asesoría Empresarial", level: 90 },
    ],
    timeline: [
      { year: "2005", event: "Egresado - Universidad Externado" },
      { year: "2010", event: "Maestría en Derecho Laboral" },
      { year: "2020", event: "Consultor en Wilches Legal" },
      { year: "2024", event: "Publicación de libro sobre Derecho Laboral" },
    ],
  },
];

const ExpertiseBar = ({ expertise, isVisible }: { expertise: Expertise; isVisible: boolean }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="font-body text-xs font-medium text-foreground/80">{expertise.name}</span>
      <span className="font-body text-xs font-semibold text-secondary">{expertise.level}%</span>
    </div>
    <div className="expertise-bar">
      <motion.div
        className="expertise-bar-fill"
        initial={{ width: 0 }}
        animate={isVisible ? { width: `${expertise.level}%` } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  </div>
);

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/5">
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="font-display text-xl font-bold text-primary-foreground">{member.name}</h3>
            <p className="font-body text-xs text-primary-foreground/70 uppercase tracking-wider mt-1">{member.role}</p>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6">
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

                {/* Expertise bars */}
                <h4 className="font-display text-sm font-semibold text-primary mb-4">Especialidades</h4>
                {member.expertise.map((exp) => (
                  <ExpertiseBar key={exp.name} expertise={exp} isVisible={expanded} />
                ))}

                {/* Timeline */}
                <h4 className="font-display text-sm font-semibold text-primary mt-6 mb-4">Trayectoria</h4>
                <div className="space-y-3">
                  {member.timeline.map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="font-body text-xs font-bold text-secondary whitespace-nowrap mt-0.5">
                        {item.year}
                      </span>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full gold-gradient mt-1.5 shrink-0" />
                        <span className="font-body text-xs text-muted-foreground">{item.event}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click hint */}
        <div className="px-6 py-3 border-t border-border/50 flex items-center justify-center">
          <span className="font-body text-xs text-muted-foreground">
            {expanded ? "Clic para cerrar" : "Clic para ver CV completo"}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="ml-2 text-secondary text-xs"
          >
            ▼
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="equipo" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-4 block">
            Nuestro Equipo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Talento <span className="gold-text">Excepcional</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un equipo joven, dinámico y altamente calificado. Haz clic en cada perfil para explorar sus CVs interactivos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
