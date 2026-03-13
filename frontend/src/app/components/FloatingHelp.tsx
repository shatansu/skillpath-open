import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function FloatingHelp() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/help")}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl flex items-center justify-center group z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <HelpCircle className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ x: 10 }}
        whileHover={{ x: 0 }}
      >
        Need help?
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </motion.div>
    </motion.button>
  );
}
