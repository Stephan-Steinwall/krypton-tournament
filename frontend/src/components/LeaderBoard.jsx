import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [selectedGame, setSelectedGame] = useState('all');

    // Game categories configuration
    const gameCategories = {
        'all': {
            name: 'All Games',
            icon: '🎮',
            color: 'cyan',
            description: 'Complete tournament rankings'
        },
        'cod4x': {
            name: 'Call of Duty 4x',
            icon: '🔫',
            color: 'orange',
            description: 'Team-Based FPS'
        },
        'pubg': {
            name: 'PUBG Mobile',
            icon: '🎯',
            color: 'yellow',
            description: 'Mobile Battle Royale'
        },
        'valorant': {
            name: 'Valorant',
            icon: '⚡',
            color: 'red',
            description: 'Tactical FPS'
        },
        'mk1': {
            name: 'Mortal Kombat 1',
            icon: '⚔️',
            color: 'purple',
            description: 'Fighting Game'
        }
    };

    useEffect(() => {
        setMounted(true);
        
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

    // Filter teams by selected game
    const filteredLeaderboard = selectedGame === 'all' 
        ? leaderboard 
        : leaderboard.filter(team => {
            // Map backend game names to our categories
            const gameMapping = {
                'Call of Duty 4x': 'cod4x',
                'COD 4x': 'cod4x',
                'PUBG Mobile': 'pubg',
                'Valorant': 'valorant',
                'Mortal Kombat 1': 'mk1',
                'MK1': 'mk1'
            };
            return gameMapping[team.game] === selectedGame;
        });

    const getGameColorScheme = (gameKey) => {
        const schemes = {
            'all': {
                border: 'border-cyan-400/40',
                shadow: 'shadow-xl shadow-cyan-400/20',
                glow: 'from-cyan-500/10 to-purple-500/10',
                accent: 'bg-cyan-400',
                textColor: 'text-cyan-400',
                bgGlow: 'from-cyan-500/5 to-purple-500/5'
            },
            'cod4x': {
                border: 'border-orange-400/60',
                shadow: 'shadow-xl shadow-orange-400/30',
                glow: 'from-orange-500/15 to-red-500/15',
                accent: 'bg-orange-400',
                textColor: 'text-orange-400',
                bgGlow: 'from-orange-500/5 to-red-500/5'
            },
            'pubg': {
                border: 'border-yellow-400/60',
                shadow: 'shadow-xl shadow-yellow-400/30',
                glow: 'from-yellow-500/15 to-orange-500/15',
                accent: 'bg-yellow-400',
                textColor: 'text-yellow-400',
                bgGlow: 'from-yellow-500/5 to-orange-500/5'
            },
            'valorant': {
                border: 'border-red-400/60',
                shadow: 'shadow-xl shadow-red-400/30',
                glow: 'from-red-500/15 to-pink-500/15',
                accent: 'bg-red-400',
                textColor: 'text-red-400',
                bgGlow: 'from-red-500/5 to-pink-500/5'
            },
            'mk1': {
                border: 'border-purple-400/60',
                shadow: 'shadow-xl shadow-purple-400/30',
                glow: 'from-purple-500/15 to-indigo-500/15',
                accent: 'bg-purple-400',
                textColor: 'text-purple-400',
                bgGlow: 'from-purple-500/5 to-indigo-500/5'
            }
        };
        return schemes[gameKey] || schemes['all'];
    };

    const getRankStyling = (rank, gameKey = 'all') => {
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
        return getGameColorScheme(gameKey);
    };

    const getRankIcon = (rank) => {
        if (rank === 0) return { icon: '👑', label: 'CHAMPION' };
        if (rank === 1) return { icon: '🥈', label: 'RUNNER-UP' };
        if (rank === 2) return { icon: '🥉', label: 'THIRD PLACE' };
        return { icon: `#${rank + 1}`, label: `RANK ${rank + 1}` };
    };

    const GameTab = ({ gameKey, category, isActive, onClick }) => (
        <button
            onClick={() => onClick(gameKey)}
            className={`group relative px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                isActive
                    ? `bg-gradient-to-r ${getGameColorScheme(gameKey).glow} border-2 ${getGameColorScheme(gameKey).border} ${getGameColorScheme(gameKey).textColor} shadow-lg`
                    : 'text-gray-400 hover:text-white border-2 border-gray-600 hover:border-gray-500'
            }`}
        >
            <div className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <div className="text-left">
                    <div className="font-black">{category.name}</div>
                    <div className="text-xs opacity-80 normal-case">{category.description}</div>
                </div>
            </div>
            
            {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${getGameColorScheme(gameKey).glow} opacity-20 rounded-xl`}></div>
            )}
        </button>
    );

    const LoadingState = () => (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="leaderboard">
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="leaderboard">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
                
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

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
                        Elite teams competing across multiple gaming disciplines
                    </p>
                </div>

                {/* Game Filter Tabs */}
                <div className={`mb-12 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '200ms' }}>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-cyan-400/20 backdrop-blur-sm">
                        <h3 className="text-xl font-black text-cyan-400 mb-6 text-center">
                            🎮 Tournament Categories
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {Object.entries(gameCategories).map(([gameKey, category]) => (
                                <GameTab
                                    key={gameKey}
                                    gameKey={gameKey}
                                    category={category}
                                    isActive={selectedGame === gameKey}
                                    onClick={setSelectedGame}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Current Filter Display */}
                <div className={`text-center mb-8 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '300ms' }}>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-xl border border-gray-600/30 backdrop-blur-sm">
                        <span className="text-2xl mr-3">{gameCategories[selectedGame].icon}</span>
                        <div>
                            <div className={`font-black ${getGameColorScheme(selectedGame).textColor}`}>
                                {gameCategories[selectedGame].name} Leaderboard
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">
                                {filteredLeaderboard.length} teams competing
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard List */}
                {filteredLeaderboard.length > 0 ? (
                    <div className="space-y-4 md:space-y-6">
                        {filteredLeaderboard.map((team, index) => {
                            const styling = getRankStyling(index, selectedGame);
                            const rankInfo = getRankIcon(index);
                            
                            return (
                                <div 
                                    key={team._id}
                                    className={`group relative transition-all duration-700 transform ${
                                        mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                                    } hover:scale-[1.02] hover:-translate-y-1`}
                                    style={{ transitionDelay: `${index * 150 + 400}ms` }}
                                >
                                    <div className={`relative bg-gradient-to-r ${styling.bgGlow} backdrop-blur-xl border-2 ${styling.border} ${styling.shadow} rounded-xl overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                            }}></div>
                                        </div>

                                        <div className={`absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b ${styling.glow}`}></div>

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
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wide font-semibold">
                                                        {team.game}
                                                    </span>
                                                    {selectedGame !== 'all' && (
                                                        <span className="text-lg">{gameCategories[selectedGame]?.icon}</span>
                                                    )}
                                                </div>
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

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${styling.glow} rounded-xl`}></div>
                                    </div>

                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                                        <div className={`w-8 h-8 ${styling.accent} rounded-full flex items-center justify-center text-black font-black text-sm shadow-lg`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-cyan-400/30 mb-6">
                            <span className="text-3xl">{gameCategories[selectedGame].icon}</span>
                        </div>
                        <p className="text-xl text-gray-400 mb-2">No teams found for {gameCategories[selectedGame].name}</p>
                        <p className="text-gray-500">Teams will appear here once they register and compete</p>
                    </div>
                )}

                {/* Bottom Action */}
                <div className={`text-center mt-16 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '800ms' }}>
                    <p className="text-gray-400 text-lg mb-6">
                        Rankings update live based on tournament performance across all games
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-white uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/30">
                            <span className="relative z-10">View Full Rankings</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        
                        <button className="group relative px-6 py-3 bg-transparent border-2 border-cyan-400 rounded-lg font-bold text-cyan-400 uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300">
                            <span className="relative z-10">Live Updates</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;