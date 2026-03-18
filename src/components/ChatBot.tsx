import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const faqData = [
  { keywords: ["costo", "precio", "cuánto", "cuanto", "cobran", "tarifa", "gratis"], answer: "La primera consulta es completamente gratuita y sin compromiso. Los honorarios posteriores dependen del tipo de caso y se acuerdan de manera transparente antes de iniciar." },
  { keywords: ["horario", "hora", "atienden", "abierto", "disponible"], answer: "Atendemos de Lunes a Viernes de 8:00 AM a 6:00 PM y Sábados de 9:00 AM a 1:00 PM." },
  { keywords: ["dirección", "direccion", "ubicación", "ubicacion", "donde", "oficina", "dónde"], answer: "Nuestra oficina principal está en Calle 93 #12-45, Oficina 801, Bogotá, Colombia." },
  { keywords: ["teléfono", "telefono", "llamar", "celular", "número", "numero", "contacto", "whatsapp"], answer: "Puedes contactarnos al +57 (302) 630-4951. También puedes escribirnos directamente por WhatsApp al mismo número." },
  { keywords: ["email", "correo", "mail"], answer: "Nuestro correo electrónico es contacto@wilcheslegal.com" },
  { keywords: ["servicio", "área", "area", "especialidad", "practican", "hacen", "ofrecen"], answer: "Manejamos Derecho Civil, Derecho de Familia, Derecho Comercial, Derecho Laboral, Derecho Penal y Propiedad Intelectual." },
  { keywords: ["consulta", "cita", "agendar", "reservar"], answer: "Puedes agendar tu consulta gratuita a través de nuestro formulario de contacto en la web, por WhatsApp o llamándonos directamente." },
  { keywords: ["pago", "tarjeta", "transferencia", "plan de pago"], answer: "Aceptamos transferencias bancarias, tarjetas de crédito y débito, y ofrecemos planes de pago flexibles." },
  { keywords: ["internacional", "exterior", "otro país", "otro pais"], answer: "Sí, contamos con experiencia en casos internacionales y alianzas con firmas en varios países de Latinoamérica." },
  { keywords: ["tiempo", "demora", "tarda", "duración", "duracion", "proceso"], answer: "Los tiempos varían según el caso. En la consulta inicial te daremos una estimación realista basada en nuestra experiencia." },
  { keywords: ["hola", "buenos días", "buenas tardes", "buenas noches", "hey", "saludos"], answer: "¡Hola! 👋 Soy el asistente virtual de Wilches Legal. ¿En qué puedo ayudarte? Puedes preguntarme sobre horarios, servicios, ubicación o cómo agendar una consulta." },
];

const defaultAnswer = "No tengo una respuesta exacta para eso, pero te invito a contactarnos directamente al +57 310 987 6543 o por nuestro formulario de contacto para una atención personalizada. 😊";

type Message = { role: "bot" | "user"; text: string };

function findAnswer(input: string): string {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const faq of faqData) {
    if (faq.keywords.some(kw => normalized.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
      return faq.answer;
    }
  }
  return defaultAnswer;
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "¡Hola! 👋 Soy el asistente virtual de Wilches Legal. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: findAnswer(trimmed) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Abrir chat"
          >
            <MessageCircle className="w-6 h-6 text-accent-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gold-gradient px-5 py-3 flex items-center justify-between">
              <span className="font-display font-semibold text-accent-foreground text-sm">Asistente Wilches Legal</span>
              <button onClick={() => setOpen(false)} aria-label="Cerrar chat">
                <X className="w-5 h-5 text-accent-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gold-gradient text-accent-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="px-3 py-3 border-t border-border/50 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 font-body text-sm px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="gold-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4 text-accent-foreground" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
