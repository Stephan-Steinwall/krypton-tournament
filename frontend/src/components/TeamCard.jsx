import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TeamCard = ({ team, onClick, index = 0 }) => {
    const cardRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setMounted(true);
        const card = cardRef.current;
        
        // Enhanced GSAP animations
        const onMouseEnter = () => {
            gsap.to(card, { 
                y: -15, 
                scale: 1.05, 
                rotationX: 5,
                duration: 0.4, 
                ease: 'power3.out',
                boxShadow: '0px 25px 50px -10px rgba(6, 182, 212, 0.4)',
                filter: 'brightness(1.1)'
            });
            
            // Animate inner elements
            gsap.to(card.querySelector('.team-logo'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.team-name'), {
                color: '#06b6d4',
                duration: 0.3
            });
        };
        
        const onMouseLeave = () => {
            gsap.to(card, { 
                y: 0, 
                scale: 1, 
                rotationX: 0,
                duration: 0.4, 
                ease: 'power3.out',
                boxShadow: '0px 8px 25px -5px rgba(6, 182, 212, 0.2)',
                filter: 'brightness(1)'
            });
            
            gsap.to(card.querySelector('.team-logo'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.team-name'), {
                color: '#ffffff',
                duration: 0.3
            });
        };
        
        card.addEventListener('mouseenter', onMouseEnter);
        card.addEventListener('mouseleave', onMouseLeave);
        
        return () => {
            card.removeEventListener('mouseenter', onMouseEnter);
            card.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    const handleImageError = () => {
        setImageError(true);
    };

    const DefaultLogo = () => (
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-2xl">
            {team.teamName.charAt(0)}
        </div>
    );

    return (
        <div 
            ref={cardRef}
            onClick={onClick}
            className={`group relative cursor-pointer transition-all duration-700 transform perspective-1000 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ 
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Main Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Gaming Clip Path Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}></div>

                {/* Logo Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center p-6 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    {/* Team Logo */}
                    <div className="team-logo relative z-10 transition-transform duration-300">
                        {!imageError ? (
                            <img 
                                src={team.logoUrl} 
                                alt={`${team.teamName} Logo`} 
                                className="max-h-28 max-w-28 object-contain filter drop-shadow-lg"
                                onError={handleImageError}
                            />
                        ) : (
                            <DefaultLogo />
                        )}
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Team Info Section */}
                <div className="relative p-6 bg-gradient-to-b from-transparent to-black/20">
                    {/* Team Name */}
                    <h3 className="team-name text-2xl lg:text-3xl font-black text-white mb-2 truncate transition-colors duration-300 group-hover:text-cyan-300">
                        {team.teamName}
                    </h3>

                    {/* Game Info */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest font-bold">
                            {team.game || 'Rainbow Six Siege'}
                        </p>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                            <span className="text-xs text-green-400 font-semibold uppercase tracking-wide">Active</span>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 uppercase font-bold">Power Level</span>
                            <span className="text-xs text-cyan-400 font-bold">{Math.floor(Math.random() * 40) + 60}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000 group-hover:from-cyan-300 group-hover:to-purple-400"
                                style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Action Indicator */}
                    <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
                            <svg className="w-4 h-4 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wide">View Details</span>
                        </div>
                    </div>
                </div>

                {/* Hover Scan Line Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
            </div>

            {/* External Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

            <style jsx>{`
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
};

export default TeamCard;