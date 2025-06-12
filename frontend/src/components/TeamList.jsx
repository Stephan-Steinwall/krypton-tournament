import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import TeamDetailModal from './TeamDetailModal'; // Import the enhanced modal

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Enhanced loading simulation
        setTimeout(() => {
            fetch('http://localhost:5000/api/teams')
                .then(response => response.json())
                .then(data => {
                    setTeams(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching teams:", error);
                    
                    setIsLoading(false);
                });
        }, 1200);
    }, []);

    const LoadingState = () => (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="teams">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Team Registry</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                            REGISTERED
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent ml-4">
                            SQUADS
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
                    <p className="text-2xl font-bold text-cyan-400 mt-8 animate-pulse">Loading Elite Squads...</p>
                    <p className="text-gray-400 mt-2">Assembling team data</p>
                </div>
            </div>
        </section>
    );

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="teams">
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

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Team Registry</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block sm:inline">
                            REGISTERED
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
                            SQUADS
                        </span>
                    </h2>
                    
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Elite gaming teams ready to compete for ultimate supremacy
                    </p>
                </div>


                {/* Teams Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
                    {teams.map((team, index) => (
                        <TeamCard 
                            key={team._id} 
                            team={team} 
                            index={index}
                            onClick={() => setSelectedTeam(team)} 
                        />
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
                        <div className="text-3xl font-black text-cyan-400 mb-2">{teams.length}</div>
                        <div className="text-gray-400 uppercase tracking-wide font-semibold">Teams Registered</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-purple-400/20 backdrop-blur-sm">
                        <div className="text-3xl font-black text-purple-400 mb-2">{teams.length * 5}</div>
                        <div className="text-gray-400 uppercase tracking-wide font-semibold">Active Players</div>
                    </div>
                    
                </div>
            </div>

            {/* Enhanced Team Detail Modal */}
            {selectedTeam && (
                <TeamDetailModal 
                    team={selectedTeam} 
                    onClose={() => setSelectedTeam(null)} 
                />
            )}
        </section>
    );
};

export default TeamList;