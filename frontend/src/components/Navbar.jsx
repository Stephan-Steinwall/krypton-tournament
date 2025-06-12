import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastYPos, setLastYPos] = useState(0);
    const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const yPos = window.scrollY;
            const isScrollingUp = yPos < lastYPos;

            setIsScrolled(yPos > 50);
            setShouldShowNavbar(yPos < 50 || isScrollingUp);
            setLastYPos(yPos);
        };

        window.addEventListener('scroll', handleScroll, false);
        return () => window.removeEventListener('scroll', handleScroll, false);
    }, [lastYPos]);

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="group cursor-pointer relative text-gray-300 hover:text-cyan-400 transition-all duration-300 uppercase tracking-widest font-medium text-sm"
            activeClass="text-cyan-400"
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>
    );

    return (
        <>
            {/* Animated background elements */}
            <div className="fixed top-0 left-0 right-0 h-20 pointer-events-none z-40">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20 animate-pulse"></div>
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/40 to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-400/40 to-transparent"></div>
            </div>

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                shouldShowNavbar ? 'translate-y-0' : '-translate-y-full'
            } ${
                isScrolled 
                    ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 group">
                            <h1 className="text-2xl font-bold text-white relative">
                                <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                                    KRYPTON
                                </span>
                                <span className="ml-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-black">
                                    2025
                                </span>
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <NavLink to="leaderboard">Leaderboard</NavLink>
                                <NavLink to="news">News</NavLink>
                                <NavLink to="teams">Teams</NavLink>
                                <NavLink to="register">
                                    <span className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300">
                                        Register
                                    </span>
                                </NavLink>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 p-2"
                            >
                                <div className="space-y-1">
                                    <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                                    <div className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                                    <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-cyan-500/20 mt-2">
                            <div className="block px-3 py-2">
                                <NavLink to="leaderboard">Leaderboard</NavLink>
                            </div>
                            <div className="block px-3 py-2">
                                <NavLink to="news">News</NavLink>
                            </div>
                            <div className="block px-3 py-2">
                                <NavLink to="teams">Teams</NavLink>
                            </div>
                            <div className="block px-3 py-2">
                                <NavLink to="register">Register</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;