import React, { useState, useEffect } from 'react';

const OrganizingCommittee = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock committee data - replace with your actual data
    const committeeMembers = [
        {
            id: 1,
            name: "Alex Chen",
            role: "Tournament Director",
            description: "Leading KRYPTON 2025 with 5+ years of esports tournament experience. Former pro player turned organizer.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Strategy & Operations"
        },
        {
            id: 2,
            name: "Sarah Rodriguez",
            role: "Technical Lead",
            description: "Ensuring seamless tournament infrastructure and broadcast quality. Expert in gaming tech and live streaming.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Technology & Broadcasting"
        },
        {
            id: 3,
            name: "Marcus Thompson",
            role: "Community Manager",
            description: "Building and maintaining our gaming community. Your go-to person for player relations and communications.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Community & Relations"
        },
        {
            id: 4,
            name: "Priya Patel",
            role: "Event Coordinator",
            description: "Managing logistics and ensuring every detail is perfect. Making KRYPTON 2025 an unforgettable experience.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Logistics & Planning"
        },
        {
            id: 5,
            name: "David Kim",
            role: "Marketing Director",
            description: "Spreading the word about KRYPTON 2025. Creating buzz and bringing the gaming community together.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Marketing & Outreach"
        },
        {
            id: 6,
            name: "Emma Wilson",
            role: "Referee & Rules",
            description: "Ensuring fair play and maintaining competitive integrity. Former professional referee with deep game knowledge.",
            imageUrl: "https://via.placeholder.com/300x300",
            specialization: "Rules & Fair Play"
        }
    ];

    const MemberCard = ({ member, index }) => {
        const [imageError, setImageError] = useState(false);

        const handleImageError = () => {
            setImageError(true);
        };

        const DefaultAvatar = () => (
            <div className="w-full h-48 bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-black text-4xl">
                {member.name.split(' ').map(n => n[0]).join('')}
            </div>
        );

        return (
            <div 
                className={`group relative transition-all duration-700 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } hover:scale-[1.02] hover:-translate-y-2`}
                style={{ transitionDelay: `${index * 150}ms` }}
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
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Member Photo */}
                    <div className="relative h-48 overflow-hidden">
                        {!imageError ? (
                            <img 
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={handleImageError}
                            />
                        ) : (
                            <DefaultAvatar />
                        )}
                        
                        {/* Photo Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Role Badge */}
                        <div className="absolute top-4 left-4">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/90 to-purple-500/90 rounded-full border border-cyan-400/50 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                                    CREW
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6">
                        {/* Name & Role */}
                        <div className="mb-4">
                            <h3 className="text-xl lg:text-2xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                                {member.name}
                            </h3>
                            <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest">
                                {member.role}
                            </p>
                        </div>

                        {/* Specialization */}
                        <div className="mb-4">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-full border border-purple-400/30">
                                <svg className="w-3 h-3 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-purple-300 font-semibold">
                                    {member.specialization}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {member.description}
                        </p>

                        {/* Contact Indicator */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
                                    <svg className="w-4 h-4 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wide">Connect</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs text-green-400 font-semibold">Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Hover Scan Line Effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Gaming Clip Path Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
                         style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}></div>
                </div>

                {/* External Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
        );
    };

    return (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="committee">
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
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Backstage Crew</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block sm:inline">
                            ORGANIZING
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
                            COMMITTEE
                        </span>
                    </h2>
                    
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Meet the legendary team behind KRYPTON 2025 - dedicated professionals making this tournament epic
                    </p>
                </div>

                {/* Committee Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {committeeMembers.map((member, index) => (
                        <MemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '800ms' }}>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-cyan-400/20 backdrop-blur-sm">
                        <h3 className="text-2xl font-black text-cyan-400 mb-4">
                            Want to Join Our Team?
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            We're always looking for passionate individuals to help organize future tournaments. 
                            Get involved in the gaming community!
                        </p>
                        <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-white uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/30">
                            <span className="relative z-10">Contact Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizingCommittee;