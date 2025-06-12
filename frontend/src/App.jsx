import React from 'react';
import Navbar from './components/Navbar'; // 1. IMPORT
import Footer from './components/Footer'; // 1. IMPORT
import CountdownTimer from './components/CountdownTimer';
import Leaderboard from './components/LeaderBoard';
import NewsFeed from './components/NewsFeed';
import RegistrationForm from './components/RegistrationForm';
import TeamList from './components/TeamList';
import HeroSection from './components/HeroSection';

function App() {
  return (
    // Changed from flex-col to just a standard div for natural page flow
    <div className="bg-gray-900 text-white">
      <Navbar /> 

      <main>
        {/* HERO SECTION */}
        {/* <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 tracking-widest">
            KRYPTON
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-300 uppercase">THE SIEGE OF CHAMPIONS</p>
          <CountdownTimer />
        </div> */}
        <HeroSection/>

        {/* 2. WRAP SECTIONS WITH DIVs and add IDs */}
        <div id="leaderboard" className="pt-20">
          <Leaderboard />
        </div>

        <div id="news" className="pt-20">
          <NewsFeed />
        </div>

        <div id="teams" className="pt-20">
            <TeamList />
        </div>

        <div id="register" className="pt-20">
          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;