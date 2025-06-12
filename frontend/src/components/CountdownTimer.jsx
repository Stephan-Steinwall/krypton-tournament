import React, { useEffect, useState } from 'react';

// The target date for the tournament.
// IMPORTANT: Change this to your actual tournament start date!
const TOURNAMENT_START_DATE = "2025-08-15T09:00:00";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(TOURNAMENT_START_DATE);
      const totalSecondsLeft = (targetDate - now) / 1000;

      if (totalSecondsLeft < 0) {
        clearInterval(timerInterval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(totalSecondsLeft / 86400),
          hours: Math.floor((totalSecondsLeft % 86400) / 3600),
          minutes: Math.floor((totalSecondsLeft % 3600) / 60),
          seconds: Math.floor(totalSecondsLeft % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // This is our new, heavily styled time unit component!
  const TimeUnit = ({ value, label }) => (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 [clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)]">
        {/* Top-left corner graphic */}
        <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
        {/* Bottom-right corner graphic */}
        <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>

        <p className="font-mono text-4xl md:text-5xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}>
            {String(value).padStart(2, '0')}
        </p>
        <span className="text-sm md:text-base font-light text-cyan-400 uppercase tracking-widest">
            {label}
        </span>
    </div>
  );

  return (
    <div className="mt-12 flex justify-center space-x-2 md:space-x-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;