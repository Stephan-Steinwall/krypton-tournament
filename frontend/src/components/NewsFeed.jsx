import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Enhanced NewsItem Component
const NewsItem = ({ post, index = 0 }) => {
    const cardRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setMounted(true);
        const card = cardRef.current;
        
        // Enhanced GSAP animations
        const onMouseEnter = () => {
            gsap.to(card, { 
                y: -12, 
                scale: 1.05, 
                rotationX: 5,
                duration: 0.4, 
                ease: 'power3.out',
                boxShadow: '0px 20px 40px -5px rgba(6, 182, 212, 0.4)',
                filter: 'brightness(1.1)'
            });
            
            // Animate inner elements
            gsap.to(card.querySelector('.news-title'), {
                color: '#06b6d4',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.news-image'), {
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
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
            
            gsap.to(card.querySelector('.news-title'), {
                color: '#ffffff',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.news-image'), {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
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

    const getCategoryStyle = (category) => {
        const styles = {
            'tournament': 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-400',
            'update': 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-400',
            'announcement': 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-400',
            'results': 'from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-400',
            'news': 'from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-400'
        };
        return styles[category?.toLowerCase()] || styles.news;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const DefaultImage = () => (
        <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-cyan-400/50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        </div>
    );

    return (
        <article 
            ref={cardRef}
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
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                    <div className="news-image w-full h-full transition-transform duration-300">
                        {post.imageUrl && !imageError ? (
                            <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        ) : (
                            <DefaultImage />
                        )}
                    </div>
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${getCategoryStyle(post.category)} rounded-full border backdrop-blur-sm`}>
                            <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">
                                {post.category || 'News'}
                            </span>
                        </div>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-gray-600/30">
                            <svg className="w-3 h-3 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-mono text-xs text-gray-300 font-bold">
                                {formatDate(post.date)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6">
                    {/* Title */}
                    <h3 className="news-title text-xl lg:text-2xl font-black text-white mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-cyan-300">
                        {post.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.content}
                    </p>

                    {/* Action Indicator */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
                                <svg className="w-4 h-4 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wide">Read More</span>
                            </div>
                        </div>

                        {/* Reading Time */}
                        <div className="text-xs text-gray-500 font-mono">
                            {Math.max(1, Math.ceil(post.content?.length / 200) || 1)} min read
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

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </article>
    );
};

// Enhanced NewsFeed Component
const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Enhanced loading with better UX
        setTimeout(() => {
            fetch('http://localhost:5000/api/news')
                .then(response => response.json())
                .then(data => {
                    setNews(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching news:", error);
                    setIsLoading(false);
                });
        }, 1200);
    }, []);

    const LoadingState = () => (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="news">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Live Feed</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                            LATEST
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent ml-4">
                            DISPATCHES
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
                    <p className="text-2xl font-bold text-cyan-400 mt-8 animate-pulse">Loading Latest News...</p>
                    <p className="text-gray-400 mt-2">Fetching tournament updates</p>
                </div>
            </div>
        </section>
    );

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="news">
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
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Live Feed</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block sm:inline">
                            LATEST
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
                            DISPATCHES
                        </span>
                    </h2>
                    
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Stay updated with the latest tournament news, announcements, and highlights
                    </p>
                </div>

                {/* News Grid */}
                {news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {news.map((post, index) => (
                            <NewsItem key={post.id || index} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-cyan-400/30 mb-6">
                            <svg className="w-10 h-10 text-cyan-400/50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-xl text-gray-400 mb-2">No news updates available</p>
                        <p className="text-gray-500">Check back soon for the latest tournament news</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default NewsFeed;