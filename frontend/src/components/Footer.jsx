import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                onClick={() => scroll.scrollToTop()}
                className={`group relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center text-white font-bold text-lg">
                    <svg className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-ping opacity-20"></div>
            </button>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="relative mt-20 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse opacity-70"></div>
            </div>

            <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Main content */}
                <div className="text-center space-y-6">
                    {/* Logo/Title */}
                    <div className="group">
                        <h2 className="text-3xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                                KRYPTON
                            </span>
                            <span className="ml-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                2025
                            </span>
                        </h2>
                        <div className="mx-auto w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                        <p className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                            The Siege of Champions
                        </p>
                        <p className="text-gray-400 text-lg">
                            Gaming Community | Java Institute for Advanced Technology 
                            <span className="text-cyan-400 font-mono ml-2">S4K3TH4</span>
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="pt-6 border-t border-cyan-500/20">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} KRYPTON Championship. All rights reserved.
                        </p>
                    </div>

                    {/* Gaming-style accent */}
                    <div className="flex justify-center space-x-4 pt-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            <ScrollToTopButton />
        </footer>
    );
};

export default Footer;