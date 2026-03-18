import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import heroJenifer from "@/assets/hero-jenifer.jpg";
import teamCarlos from "@/assets/team-carlos.jpg";
import teamMaria from "@/assets/team-maria.jpg";
import teamAndres from "@/assets/team-andres.jpg";
import { GraduationCap, Award, Briefcase, Star } from "lucide-react";

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
  timeline: { year: string; event: string; icon: "grad" | "award" | "work" | "star" }[];
  achievements: string[];
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
      { year: "2018", event: "Graduada con honores - Universidad Nacional", icon: "grad" },
      { year: "2019", event: "Especialización en Derecho Comercial", icon: "award" },
      { year: "2021", event: "Fundación de Wilches Legal Boutique", icon: "work" },
      { year: "2023", event: "Reconocida como joven líder legal", icon: "star" },
    ],
    achievements: ["Top 30 Under 30 en Derecho", "200+ casos exitosos", "Conferencista invitada en 3 universidades"],
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
      { year: "2016", event: "Egresado - Universidad del Rosario", icon: "grad" },
      { year: "2018", event: "Maestría en Ciencias Penales", icon: "award" },
      { year: "2022", event: "Se une a Wilches Legal", icon: "work" },
      { year: "2024", event: "Promoción a Asociado Senior", icon: "star" },
    ],
    achievements: ["150+ audiencias exitosas", "Especialista en casos de alta complejidad", "Docente universitario"],
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
      { year: "2017", event: "Egresada - Universidad Javeriana", icon: "grad" },
      { year: "2019", event: "Diplomado en Mediación y Conciliación", icon: "award" },
      { year: "2021", event: "Se integra al equipo Wilches Legal", icon: "work" },
      { year: "2023", event: "Certificación internacional en Mediación", icon: "star" },
    ],
    achievements: ["Certificada por el Centro de Mediación Internacional", "120+ familias asesoradas", "Voluntaria en fundaciones sociales"],
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
      { year: "2005", event: "Egresado - Universidad Externado", icon: "grad" },
      { year: "2010", event: "Maestría en Derecho Laboral", icon: "award" },
      { year: "2020", event: "Consultor en Wilches Legal", icon: "work" },
      { year: "2024", event: "Publicación de libro sobre Derecho Laboral", icon: "star" },
    ],
    achievements: ["Autor de 'Derecho Laboral Moderno'", "Asesor de 50+ empresas", "Miembro del Colegio de Abogados"],
  },
];

const iconMap = {
  grad: GraduationCap,
  award: Award,
  work: Briefcase,
  star: Star,
};

const ExpertiseBar = ({ expertise, isVisible, delay }: { expertise: Expertise; isVisible: boolean; delay: number }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1.5">
      <span className="font-body text-xs font-medium text-foreground/80">{expertise.name}</span>
      <motion.span
        className="font-body text-xs font-semibold text-secondary"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5 }}
      >
        {expertise.level}%
      </motion.span>
    </div>
    <div className="expertise-bar">
      <motion.div
        className="expertise-bar-fill"
        initial={{ width: 0 }}
        animate={isVisible ? { width: `${expertise.level}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay }}
      />
    </div>
  </div>
);

type TabType = "expertise" | "timeline" | "achievements";

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("expertise");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const tabs: { key: TabType; label: string }[] = [
    { key: "expertise", label: "Especialidades" },
    { key: "timeline", label: "Trayectoria" },
    { key: "achievements", label: "Logros" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group cursor-pointer perspective-1000"
      onClick={() => setExpanded(!expanded)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-secondary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with shine effect */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          {/* Shine on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-secondary/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-100%] pointer-events-none" style={{ transition: "transform 0.7s, opacity 0.3s" }} />
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
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">{member.bio}</p>

                {/* Tabs */}
                <div className="flex gap-1 mb-5 bg-muted/50 rounded-xl p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={(e) => { e.stopPropagation(); setActiveTab(tab.key); }}
                      className={`flex-1 font-body text-[10px] font-semibold py-2 px-2 rounded-lg transition-all uppercase tracking-wider ${
                        activeTab === tab.key
                          ? "gold-gradient text-accent-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "expertise" && (
                    <motion.div
                      key="expertise"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {member.expertise.map((exp, i) => (
                        <ExpertiseBar key={exp.name} expertise={exp} isVisible={expanded && activeTab === "expertise"} delay={i * 0.15} />
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "timeline" && (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {member.timeline.map((item, i) => {
                        const Icon = iconMap[item.icon];
                        return (
                          <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-3 items-start"
                          >
                            <div className="gold-gradient w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 text-accent-foreground" />
                            </div>
                            <div>
                              <span className="font-body text-[10px] font-bold text-secondary uppercase tracking-wider">{item.year}</span>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">{item.event}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === "achievements" && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {member.achievements.map((achievement, i) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-3 items-center p-3 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <Star className="w-4 h-4 text-secondary shrink-0" />
                          <span className="font-body text-xs text-foreground/80">{achievement}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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
      </motion.div>
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
