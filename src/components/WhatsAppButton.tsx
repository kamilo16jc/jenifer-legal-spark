import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/573109876543?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" style={{ color: "white" }} />
      
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "2px solid #25D366" }}
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.a>
  );
};

export default WhatsAppButton;
