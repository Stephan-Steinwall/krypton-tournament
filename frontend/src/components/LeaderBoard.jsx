import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Enhanced loading with better UX
        setTimeout(() => {
            fetch('http://localhost:5000/api/leaderboard')
                .then(response => response.json())
                .then(data => {
                    setLeaderboard(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching leaderboard:", error);
                    setIsLoading(false);
                });
        }, 1500);
    }, []);

    const getRankStyling = (rank) => {
        if (rank === 0) return {
            border: 'border-yellow-400/60',
            shadow: 'shadow-2xl shadow-yellow-400/40',
            glow: 'from-yellow-500/20 to-orange-500/20',
            accent: 'bg-yellow-400',
            textColor: 'text-yellow-400',
            bgGlow: 'from-yellow-500/5 to-orange-500/5'
        };
        if (rank === 1) return {
            border: 'border-gray-300/60',
            shadow: 'shadow-2xl shadow-gray-300/40',
            glow: 'from-gray-400/20 to-gray-500/20',
            accent: 'bg-gray-300',
            textColor: 'text-gray-300',
            bgGlow: 'from-gray-400/5 to-gray-500/5'
        };
        if (rank === 2) return {
            border: 'border-orange-400/60',
            shadow: 'shadow-2xl shadow-orange-400/40',
            glow: 'from-orange-500/20 to-red-500/20',
            accent: 'bg-orange-400',
            textColor: 'text-orange-400',
            bgGlow: 'from-orange-500/5 to-red-500/5'
        };
        return {
            border: 'border-cyan-400/40',
            shadow: 'shadow-xl shadow-cyan-400/20',
            glow: 'from-cyan-500/10 to-purple-500/10',
            accent: 'bg-cyan-400',
            textColor: 'text-cyan-400',
            bgGlow: 'from-cyan-500/5 to-purple-500/5'
        };
    };

    const getRankIcon = (rank) => {
        if (rank === 0) return { icon: '👑', label: 'CHAMPION' };
        if (rank === 1) return { icon: '🥈', label: 'RUNNER-UP' };
        if (rank === 2) return { icon: '🥉', label: 'THIRD PLACE' };
        return { icon: `#${rank + 1}`, label: `RANK ${rank + 1}` };
    };

    const LoadingState = () => (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="leaderboard">
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Live Rankings</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                            TOP
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent ml-4">
                            CONTENDERS
                        </span>
                    </h2>
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin">
                            <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full"></div>
                        </div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-2xl font-bold text-cyan-400 mt-8 animate-pulse">Calculating Rankings...</p>
                    <p className="text-gray-400 mt-2">Analyzing tournament data</p>
                </div>
            </div>
        </section>
    );

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <section className="relative w-full py-10 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="leaderboard">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Accent Lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Live Rankings</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block sm:inline">
                            TOP
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
                            CONTENDERS
                        </span>
                    </h2>
                    
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Elite teams competing for the ultimate prize in competitive gaming
                    </p>
                </div>

                {/* Leaderboard List */}
                <div className="space-y-4 md:space-y-6">
                    {leaderboard.map((team, index) => {
                        const styling = getRankStyling(index);
                        const rankInfo = getRankIcon(index);
                        
                        return (
                            <div 
                                key={team._id}
                                className={`group relative transition-all duration-700 transform ${
                                    mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                                } hover:scale-[1.02] hover:-translate-y-1`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Main Card */}
                                <div className={`relative bg-gradient-to-r ${styling.bgGlow} backdrop-blur-xl border-2 ${styling.border} ${styling.shadow} rounded-xl overflow-hidden`}>
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                        }}></div>
                                    </div>

                                    {/* Rank Indicator Strip */}
                                    <div className={`absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b ${styling.glow}`}></div>

                                    {/* Card Content */}
                                    <div className="relative flex items-center p-4 md:p-6">
                                        {/* Rank Section */}
                                        <div className="flex-shrink-0 mr-4 md:mr-6">
                                            <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${styling.border} flex items-center justify-center ${styling.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                                <span className="text-2xl md:text-3xl font-black">{rankInfo.icon}</span>
                                                {index < 3 && (
                                                    <div className={`absolute -top-2 -right-2 w-6 h-6 ${styling.accent} rounded-full animate-pulse`}></div>
                                                )}
                                            </div>
                                            <p className={`text-xs font-bold ${styling.textColor} text-center mt-2 tracking-widest hidden md:block`}>
                                                {rankInfo.label}
                                            </p>
                                        </div>

                                        {/* Team Logo */}
                                        <div className="flex-shrink-0 mr-4 md:mr-6">
                                            <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 ${styling.border} ${styling.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                                <img 
                                                    src={team.logoUrl} 
                                                    alt={`${team.teamName} Logo`} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik00MCAyMEw1MCA0MEw0MCA2MEwzMCA0MEw0MCAyMFoiIGZpbGw9IiMwNkI2RDQiLz4KPC9zdmc+';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                            </div>
                                        </div>

                                        {/* Team Info */}
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-1 truncate group-hover:text-cyan-300 transition-colors duration-300">
                                                {team.teamName}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wide font-semibold">
                                                {team.game}
                                            </p>
                                            {index < 3 && (
                                                <div className="flex items-center mt-1">
                                                    <div className={`w-2 h-2 ${styling.accent} rounded-full mr-2 animate-pulse`}></div>
                                                    <span className={`text-xs ${styling.textColor} font-bold uppercase tracking-wider`}>
                                                        Elite Tier
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Score Section */}
                                        <div className="flex-shrink-0 text-right">
                                            <div className={`inline-flex items-center px-3 md:px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-lg border ${styling.border} backdrop-blur-sm`}>
                                                <span className="text-xl md:text-2xl lg:text-3xl font-mono font-black text-white">
                                                    {team.score.toLocaleString()}
                                                </span>
                                                <span className={`ml-2 text-xs md:text-sm font-bold ${styling.textColor} uppercase tracking-wider`}>
                                                    PTS
                                                </span>
                                            </div>
                                            
                                            {/* Movement Indicator */}
                                            <div className="mt-2 flex justify-end">
                                                <div className="flex items-center">
                                                    {index < 3 ? (
                                                        <svg className="w-4 h-4 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    <span className="text-xs text-gray-500 font-bold">
                                                        {index < 3 ? '+' + Math.floor(Math.random() * 50 + 10) : '--'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${styling.glow} rounded-xl`}></div>
                                </div>

                                {/* Position Number Indicator */}
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                                    <div className={`w-8 h-8 ${styling.accent} rounded-full flex items-center justify-center text-black font-black text-sm shadow-lg`}>
                                        {index + 1}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

               
            </div>
        </section>
    );
};

export default Leaderboard;