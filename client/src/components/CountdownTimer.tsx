import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const conferenceDate = new Date("May 18, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const difference = conferenceDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#231942]/90 backdrop-blur-md py-6 border-t border-b border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:mr-8 mb-4 md:mb-0">
            <h3 className="font-heading font-bold text-xl text-center md:text-left text-white">
              Conference Starts In:
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <CountdownItem value={timeLeft.days} label="Days" color="text-[#22D1EE]" />
            <CountdownItem value={timeLeft.hours} label="Hours" color="text-[#FF3A8C]" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" color="text-[#FF9244]" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" color="text-[#4AE290]" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CountdownItemProps {
  value: number;
  label: string;
  color: string;
}

const CountdownItem = ({ value, label, color }: CountdownItemProps) => (
  <motion.div 
    className="relative bg-[#231942]/50 rounded-lg p-3 min-w-20 overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-xs uppercase text-gray-400">{label}</div>
    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#22D1EE] to-[#FF3A8C]"></div>
  </motion.div>
);

export default CountdownTimer;
