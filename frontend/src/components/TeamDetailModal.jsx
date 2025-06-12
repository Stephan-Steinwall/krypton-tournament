import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const TeamDetailModal = ({ team, onClose }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const [imageError, setImageError] = useState(false);

    // Enhanced opening animation
    useEffect(() => {
        // Backdrop animation
        gsap.fromTo(backdropRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        
        // Modal animation with more dramatic effect
        gsap.fromTo(modalRef.current, 
            { 
                opacity: 0, 
                scale: 0.8, 
                y: 50,
                rotationX: -15 
            }, 
            { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.6, 
                ease: 'power3.out', 
                delay: 0.1 
            }
        );

        // Stagger animation for content
        gsap.fromTo('.modal-content > *', 
            { opacity: 0, y: 20 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.4, 
                stagger: 0.1, 
                ease: 'power2.out', 
                delay: 0.3 
            }
        );
    }, []);

    // Enhanced closing animation
    const handleClose = () => {
        gsap.to('.modal-content > *', { 
            opacity: 0, 
            y: -20, 
            duration: 0.2, 
            stagger: 0.05, 
            ease: 'power2.in' 
        });
        
        gsap.to(modalRef.current, { 
            opacity: 0, 
            scale: 0.8, 
            y: 50,
            rotationX: 15,
            duration: 0.4, 
            ease: 'power2.in',
            delay: 0.1
        });
        
        gsap.to(backdropRef.current, { 
            opacity: 0, 
            duration: 0.3, 
            delay: 0.2, 
            onComplete: onClose 
        });
    };

    // Get players list with enhanced processing
    const players = Object.keys(team)
        .filter(key => key.startsWith('player') && team[key])
        .map(key => team[key]);

    // Add some mock players if none exist
    if (players.length === 0) {
        players.push(
            'Player_1', 'Player_2', 'Player_3', 'Player_4', 'Player_5','Player_6'
        );
    }

    const handleImageError = () => {
        setImageError(true);
    };

    const DefaultLogo = () => (
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-4xl border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50">
            {team.teamName.charAt(0)}
        </div>
    )

    return (
        <div 
            ref={backdropRef}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
            <div 
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
                style={{ perspective: '1000px' }}
            >
                {/* Main Modal Container */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-xl border-2 border-cyan-400/40 rounded-3xl shadow-2xl shadow-cyan-500/30 overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-l-3 border-t-3 border-cyan-400/60"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-r-3 border-t-3 border-cyan-400/60"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-l-3 border-b-3 border-cyan-400/60"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-3 border-b-3 border-cyan-400/60"></div>

                    {/* Modal Content */}
                    <div className="modal-content relative z-10 overflow-y-auto max-h-[90vh]">
                        
                        {/* Header Section */}
                        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 text-center">
                            {/* Background Effects */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/30 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-cyan-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                            </div>

                            {/* Team Logo */}
                            <div className="relative z-10 mb-6">
                                {!imageError ? (
                                    <img 
                                        src={team.logoUrl} 
                                        alt={`${team.teamName} Logo`} 
                                        className="h-32 w-32 mx-auto rounded-full border-4 border-cyan-400 object-cover shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-transform duration-300"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <DefaultLogo />
                                )}
                                {/* Logo Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent rounded-full"></div>
                            </div>

                            {/* Team Name & Game */}
                            <h2 className="text-4xl md:text-5xl font-black mb-3">
                                <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                                    {team.teamName}
                                </span>
                            </h2>
                            
                            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm mb-4">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                                <span className="font-mono text-lg text-cyan-400 uppercase tracking-widest font-bold">
                                    {team.game || 'Rainbow Six Siege'}
                                </span>
                                <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex justify-center">
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    <span className="text-green-400 font-bold text-sm uppercase tracking-wide">Elite Status</span>
                                </div>
                            </div>
                        </div>

                    

                        {/* Squad Members Section */}
                        <div className="p-8">
                            <h3 className="text-2xl font-black text-cyan-400 mb-8 text-center uppercase tracking-widest">
                                Squad Members
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {players.map((player, index) => (
                                    <div 
                                        key={index} 
                                        className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                                    >
                                        {/* Player Card Background Pattern */}
                                        <div className="absolute inset-0 opacity-5 rounded-xl">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                            }}></div>
                                        </div>

                                        {/* Player Avatar */}
                                        <div className="flex items-center space-x-4 relative z-10">
                                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-lg border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                                                {player.charAt(0).toUpperCase()}
                                            </div>
                                            
                                            <div className="flex-grow">
                                                <div className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors duration-300">
                                                    {player}
                                                </div>
                                                <div className="text-cyan-400 text-sm font-mono uppercase tracking-wide">
                                                    Player #{index + 1}
                                                </div>
                                            </div>
                                            
                                            {/* Role Badge */}
                                            <div className="text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300 font-bold uppercase tracking-wide">
                                                {index === 0 ? 'IGL' : 
                                                 index === 1 ? 'Entry' :
                                                 index === 2 ? 'Support' :
                                                 index === 3 ? 'Anchor' : 'Flex'}
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-6 right-6 group w-12 h-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400 transition-all duration-300 z-20"
                    >
                        <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        
                        {/* Close button glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 rounded-full transition-all duration-300"></div>
                    </button>

                    {/* Scan Line Effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transform -translate-x-full animate-scan-line"></div>
                    </div>
                </div>

                {/* External Modal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-3xl blur-2xl -z-10"></div>
            </div>

            <style jsx>{`
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
                
                .border-l-3, .border-r-3, .border-t-3, .border-b-3 {
                    border-width: 3px;
                }
                
                @keyframes scan-line {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-scan-line {
                    animation: scan-line 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default TeamDetailModal;