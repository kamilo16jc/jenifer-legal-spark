import logoJW from "@/assets/logo-jw.png";

const Footer = () => (
  <footer className="bg-primary py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="mb-4">
            <img src={logoJW} alt="Wilches Legal" className="h-24 w-auto brightness-0 invert" />
          </div>
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Excelencia jurídica con visión moderna. Tu confianza, nuestra misión.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-primary-foreground mb-4">Enlaces</h4>
          <div className="space-y-2">
            {["Inicio", "Servicios", "Equipo", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block font-body text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-primary-foreground mb-4">Legal</h4>
          <div className="space-y-2">
            {["Política de Privacidad", "Términos y Condiciones", "Aviso Legal"].map((link) => (
              <a key={link} href="#" className="block font-body text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center">
        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 Wilches Legal Boutique. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
