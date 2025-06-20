import React, { useState, useEffect } from 'react';

const WhatsAppChannel = () => {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);

    const whatsappLink = "https://whatsapp.com/channel/0029Vb5xzHmBVJl0Vt4lbd3s";

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(whatsappLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const benefits = [
        {
            icon: "⚡",
            title: "Instant Updates",
            description: "Get real-time tournament announcements and schedule changes"
        },
        {
            icon: "🏆",
            title: "Exclusive Content",
            description: "Behind-the-scenes content and exclusive tournament insights"
        },
        {
            icon: "🎮",
            title: "Match Alerts",
            description: "Live match notifications and score updates as they happen"
        },
        {
            icon: "🎁",
            title: "Special Offers",
            description: "Early access to registration and exclusive tournament perks"
        }
    ];

    const BenefitCard = ({ benefit, index }) => (
        <div 
            className={`group relative transition-all duration-700 transform ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100 + 400}ms` }}
        >
            <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 rounded-xl">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative z-10 text-center">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {benefit.description}
                    </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
        </div>
    );

    return (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="whatsapp">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-cyan-900/20"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Accent Lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Stay Connected</span>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent block sm:inline">
                            JOIN OUR
                        </span>
                        <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
                            WHATSAPP
                        </span>
                    </h2>
                    
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Get instant tournament updates, exclusive content, and be part of the KRYPTON 2025 community
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    
                    {/* Left Side - QR Code & Call to Action */}
                    <div className={`text-center lg:text-left transition-all duration-1000 transform ${
                        mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`} style={{ transitionDelay: '200ms' }}>
                        
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 overflow-hidden shadow-2xl shadow-green-500/20">
                            
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }}></div>
                            </div>

                            {/* Top Accent */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-cyan-500 to-green-400"></div>

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400/60"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-400/60"></div>

                            <div className="relative z-10">
                                {/* WhatsApp Icon */}
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl shadow-green-500/50 mb-4">
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        KRYPTON 2025 Updates
                                    </h3>
                                    <p className="text-green-400 font-bold uppercase tracking-wide text-sm">
                                        Official Channel
                                    </p>
                                </div>

                                
                                <div className="bg-white rounded-2xl p-6 mb-6 mx-auto max-w-xs">
                                    <img
                                        src="/other/channelQRC.jpg"
                                        alt="WhatsApp Channel QR Code"
                                        className="w-full h-50 object-contain rounded-xl border-2 border-green-400/30 shadow-md bg-white"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-4">
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-black text-white text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-green-500/30"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                                        </svg>
                                        <span className="relative z-10">Join Channel</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </a>

                                    <button
                                        onClick={handleCopyLink}
                                        className="group relative w-full flex items-center justify-center px-8 py-3 bg-transparent border-2 border-green-400 rounded-xl font-bold text-green-400 uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                                        </svg>
                                        <span className="relative z-10">
                                            {copied ? "Link Copied!" : "Copy Link"}
                                        </span>
                                        <div className="absolute inset-0 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Benefits */}
                    <div className={`transition-all duration-1000 transform ${
                        mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`} style={{ transitionDelay: '300ms' }}>
                        
                        <h3 className="text-3xl font-black text-white mb-8 text-center lg:text-left">
                            Why Join Our 
                            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent ml-2">
                                Channel?
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <BenefitCard key={index} benefit={benefit} index={index} />
                            ))}
                        </div>

                        {/* Stats */}
                        <div className={`mt-12 transition-all duration-1000 transform ${
                            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`} style={{ transitionDelay: '800ms' }}>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-green-400/20">
                                    <div className="text-2xl font-black text-green-400 mb-1">500+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Members</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-cyan-400/20">
                                    <div className="text-2xl font-black text-cyan-400 mb-1">24/7</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Updates</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-purple-400/20">
                                    <div className="text-2xl font-black text-purple-400 mb-1">Live</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`text-center transition-all duration-1000 transform ${
                    mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '1000ms' }}>
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-green-400/20 backdrop-blur-sm">
                        <p className="text-gray-400 text-lg mb-4">
                            Don't miss out on any tournament action! Join now and be part of the KRYPTON 2025 community.
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 font-bold text-sm uppercase tracking-wide">
                                Active Channel - Join the Elite
                            </span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatsAppChannel;