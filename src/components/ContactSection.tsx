import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary mb-4 block">
            Contáctanos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Tu Primera <span className="gold-text">Consulta</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Agenda una consulta inicial sin compromiso. Estamos aquí para escucharte y orientarte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex gap-4 items-start">
              <div className="gold-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-primary mb-1">Oficina Principal</h4>
                <p className="font-body text-sm text-muted-foreground">Calle 93 #12-45, Oficina 801<br />Bogotá, Colombia</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="gold-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-primary mb-1">Teléfono</h4>
                <p className="font-body text-sm text-muted-foreground">+57 (1) 234 5678<br />+57 310 987 6543</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="gold-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-primary mb-1">Email</h4>
                <p className="font-body text-sm text-muted-foreground">contacto@wilcheslegal.com</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="gold-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-primary mb-1">Horario</h4>
                <p className="font-body text-sm text-muted-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                className="font-body text-sm px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="font-body text-sm px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              className="w-full font-body text-sm px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all text-foreground placeholder:text-muted-foreground"
            />
            <select
              className="w-full font-body text-sm px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all text-foreground"
              defaultValue=""
            >
              <option value="" disabled>Área de consulta</option>
              <option>Derecho Civil</option>
              <option>Derecho de Familia</option>
              <option>Derecho Comercial</option>
              <option>Derecho Laboral</option>
              <option>Derecho Penal</option>
              <option>Propiedad Intelectual</option>
              <option>Otro</option>
            </select>
            <textarea
              rows={4}
              placeholder="Cuéntanos brevemente tu caso..."
              className="w-full font-body text-sm px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/30 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
            />
            <button
              type="submit"
              className="w-full gold-gradient px-8 py-4 rounded-full font-body font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              {submitted ? "✓ Mensaje Enviado" : "Enviar Consulta"}
            </button>
          </motion.form>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/50 shadow-lg"
        >
          <iframe
            title="Ubicación Wilches Legal"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6!2d-74.05!3d4.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDAnNDguMCJOIDc0wrAwMycwMC4wIlc!5e0!3m2!1ses!2sco!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
