import { motion } from "framer-motion";

export const VibeLogo = () => {
  return (
    <motion.svg 
      width="48" 
      height="48" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="#231942" />
      
      {/* S wave lines */}
      <path d="M60,50 Q70,30 90,40 Q110,50 130,40" stroke="#22D1EE" strokeWidth="8" strokeLinecap="round" />
      
      {/* Wave pattern in middle */}
      <path d="M40,90 Q60,70 80,90 Q100,110 120,90 Q140,70 160,90" stroke="#4AE290" strokeWidth="8" strokeLinecap="round" />
      <path d="M40,110 Q60,90 80,110 Q100,130 120,110 Q140,90 160,110" stroke="#FF9244" strokeWidth="8" strokeLinecap="round" />
      <path d="M40,130 Q60,110 80,130 Q100,150 120,130 Q140,110 160,130" stroke="#FF3A8C" strokeWidth="8" strokeLinecap="round" />
      
      {/* Vertical lines */}
      <path d="M70,40 L70,160" stroke="#22D1EE" strokeWidth="4" strokeLinecap="round" />
      <path d="M90,40 L90,160" stroke="#22D1EE" strokeWidth="4" strokeLinecap="round" />
      <path d="M110,40 L110,160" stroke="#22D1EE" strokeWidth="4" strokeLinecap="round" />
      <path d="M130,40 L130,160" stroke="#22D1EE" strokeWidth="4" strokeLinecap="round" />
      
      {/* Decorative circles */}
      <circle cx="50" cy="50" r="8" fill="#22D1EE" />
      <circle cx="150" cy="50" r="8" fill="#4AE290" />
      <circle cx="50" cy="150" r="8" fill="#FF3A8C" />
      <circle cx="150" cy="150" r="8" fill="#FF9244" />
    </motion.svg>
  );
};

export default VibeLogo;
