import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

// The target date for the tournament.
const TOURNAMENT_START_DATE = "2025-08-15T09:00:00";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const TimeUnit = ({ value, label, delay = 0 }) => (
    <div 
      className={`group relative w-16 h-16 md:w-36 md:h-36 lg:w-40 lg:h-40 flex flex-col items-center justify-center transition-all duration-700 transform ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Main container with gaming clip-path */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-sm border border-cyan-400/60 shadow-2xl shadow-cyan-500/30 [clip-path:polygon(15%_0,100%_0,100%_85%,85%_100%,0_100%,0_15%)]">
        {/* Inner glow effect */}
        <div className="absolute inset-1 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 [clip-path:polygon(15%_0,100%_0,100%_85%,85%_100%,0_100%,0_15%)]"></div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-3 border-t-3 border-cyan-400 opacity-80"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-3 border-b-3 border-cyan-400 opacity-80"></div>
      
      {/* Simple accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <p className="font-mono text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wider transition-transform duration-300" 
           style={{ 
             textShadow: '0 0 20px #06b6d4, 0 0 40px #06b6d4',
             filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))'
           }}>
          {String(value).padStart(2, '0')}
        </p>
        <span className="text-xs md:text-sm lg:text-base font-bold text-cyan-300 uppercase tracking-[0.2em] mt-1 transition-colors duration-300">
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20 pb-10">
      {/* Better responsive navbar spacing */}
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        {/* Static Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30"></div>
        
        {/* Optimized Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-12">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'grid-move 25s linear infinite',
            willChange: 'transform'
          }}></div>
        </div>

        {/* Optimized Light Accents */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/25 via-transparent to-cyan-400/25"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-400/25 via-transparent to-purple-400/25"></div>
        
        {/* Central Glow - Optimized */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-radial from-cyan-500/12 via-purple-500/6 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Tournament Badge */}
        <div className={`inline-flex items-center px-4 sm:px-6 py-2 mb-6 sm:mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
          <span className="text-cyan-300 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Live Tournament • August 2025
          </span>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full ml-2 sm:ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Main Title */}
        <div className={`mb-4 sm:mb-6 transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block">
              KRYPTON
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient block">
              2025
            </span>
          </h1>
          
          <div className="mx-auto w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4 sm:mb-6"></div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-300 mb-3 sm:mb-4">
            THE SIEGE OF 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-2 sm:ml-3">
              CHAMPIONS
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            The ultimate gaming tournament where legends are born and champions rise. 
            <span className="text-cyan-400 font-semibold"> Battle for glory, compete for supremacy.</span>
          </p>
        </div>

        {/* Countdown Section */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-6 sm:mb-8 uppercase tracking-widest">
            Tournament Begins In
          </h3>
          
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 mb-6 sm:mb-8">
            <TimeUnit value={timeLeft.days} label="Days" delay={600} />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400 font-black animate-pulse">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" delay={700} />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400 font-black animate-pulse" style={{ animationDelay: '0.5s' }}>:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" delay={800} />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400 font-black animate-pulse">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" delay={900} />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          
          <Link
            to="register"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-black text-white text-base sm:text-lg uppercase tracking-wider shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center">
              <span>Register Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>

          <Link
            to="news"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-transparent border-2 border-cyan-400 rounded-lg font-bold text-cyan-400 text-base sm:text-lg uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300 overflow-hidden cursor-pointer w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <span className="relative z-10">Tournament Info</span>
          </Link>
        </div>

        
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyan-400/60 rounded-full flex justify-center">
          <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-cyan-400 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        /* Performance optimized animations */
        @keyframes grid-move {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(80px, 80px, 0); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          will-change: background-position;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        /* Responsive border utilities */
        .border-l-2 {
          border-left-width: 2px;
        }
        
        .border-t-2 {
          border-top-width: 2px;
        }
        
        .border-r-2 {
          border-right-width: 2px;
        }
        
        .border-b-2 {
          border-bottom-width: 2px;
        }

        /* Performance optimizations */
        * {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-gradient {
            animation-duration: 4s;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;