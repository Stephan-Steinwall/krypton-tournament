import React, { useState, useEffect } from "react";

// Enhanced StyledInput Component
const StyledInput = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  animatingField,
  icon
}) => (
  <div className="relative group">
    {/* Main Input Container */}
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={name !== "player6"}
        className={`w-full bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-cyan-400/30 p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-xl focus:shadow-cyan-400/30 transition-all duration-300 rounded-xl backdrop-blur-sm hover:border-cyan-300/50 group-hover:bg-gradient-to-br group-hover:from-gray-800/90 group-hover:via-black/70 group-hover:to-gray-700/90 ${
          animatingField === name ? "animate-pulse border-cyan-400 shadow-lg shadow-cyan-400/40" : ""
        }`}
      />
      
      {/* Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 text-lg">
        {icon}
      </div>
      
      {/* Success Checkmark */}
      {value && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            ✓
          </div>
        </div>
      )}
    </div>
    
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    {/* Corner Accents */}
    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
  </div>
);

// Enhanced File Input Component
const StyledFileInput = ({ name, onChange, fileName }) => (
  <div className="relative group">
    <label
      htmlFor={name}
      className="cursor-pointer w-full flex items-center justify-center bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-dashed border-cyan-400/30 p-6 text-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 rounded-xl backdrop-blur-sm hover:border-cyan-300/50 hover:text-cyan-300 group-hover:bg-gradient-to-br group-hover:from-gray-800/90 group-hover:via-black/70 group-hover:to-gray-700/90"
    >
      <div className="text-center">
        <div className="text-4xl mb-3">
          {fileName ? "🏆" : "🖼️"}
        </div>
        <div className="text-lg font-bold">
          {fileName || "Upload Team Logo"}
        </div>
        {fileName && (
          <div className="text-sm text-cyan-400 mt-2 font-mono">
            {fileName}
          </div>
        )}
        {!fileName && (
          <div className="text-xs text-gray-500 mt-2">
            PNG, JPG, WEBP up to 5MB
          </div>
        )}
      </div>
    </label>
    
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      className="hidden"
      accept="image/png, image/jpeg, image/webp"
      required
    />
    
    {/* Upload Success Effect */}
    {fileName && (
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    )}
    
    {/* Corner Accents */}
    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

// Enhanced Game Select Component
const GameSelect = ({ name, value, onChange, animatingField }) => (
  <div className="relative group">
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className={`w-full bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-cyan-400/30 p-4 pl-12 text-white focus:outline-none focus:border-cyan-400 focus:shadow-xl focus:shadow-cyan-400/30 transition-all duration-300 rounded-xl backdrop-blur-sm hover:border-cyan-300/50 appearance-none group-hover:bg-gradient-to-br group-hover:from-gray-800/90 group-hover:via-black/70 group-hover:to-gray-700/90 ${
        animatingField === name ? "animate-pulse border-cyan-400 shadow-lg shadow-cyan-400/40" : ""
      }`}
    >
      <option value="" disabled className="bg-gray-800">
        🎮 Select Your Battleground
      </option>
      <option value="Rainbow Six Siege" className="bg-gray-800">
        🎯 Rainbow Six Siege
      </option>
      <option value="Valorant" className="bg-gray-800">
        🔫 Valorant
      </option>
      <option value="League of Legends" className="bg-gray-800">
        ⚔️ League of Legends
      </option>
      <option value="CS2" className="bg-gray-800">
        💥 Counter-Strike 2
      </option>
      <option value="Mobile Legends" className="bg-gray-800">
        🏰 Mobile Legends
      </option>
    </select>
    
    {/* Game Icon */}
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 text-lg">
      🎮
    </div>
    
    {/* Custom Arrow */}
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 pointer-events-none">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
    
    {/* Hover Effects */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    {/* Corner Accents */}
    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/40 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
  </div>
);

// Achievement Toast Component
const AchievementToast = ({ message, onClose }) => (
  <div className="fixed top-8 right-8 z-50 animate-bounce">
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-4 rounded-xl font-bold shadow-2xl shadow-yellow-500/50 border-2 border-yellow-400">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">🏆</div>
        <div>
          <div className="font-black text-lg">ACHIEVEMENT UNLOCKED!</div>
          <div className="text-sm">{message}</div>
        </div>
        <button onClick={onClose} className="ml-4 text-black hover:text-gray-800 font-bold">×</button>
      </div>
    </div>
  </div>
);

// Main Registration Form Component
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    game: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    player5: "",
    player6: "",
    email: "",
    logo: null,
  });
  
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [animatingField, setAnimatingField] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const requiredFields = [
      "teamName", "game", "player1", "player2", "player3", "player4", "player5", "email", "logo"
    ];
    const filledFields = requiredFields.filter((field) => {
      if (field === "logo") return formData[field] !== null;
      return formData[field] && formData[field].trim() !== "";
    });
    const newProgress = (filledFields.length / requiredFields.length) * 100;
    setProgress(newProgress);

    // Achievement System
    if (newProgress >= 25 && !achievements.includes("First Steps")) {
      setAchievements((prev) => [...prev, "First Steps"]);
      setShowAchievement("First Steps Unlocked! 🎮");
    }
    if (newProgress >= 50 && !achievements.includes("Half Way")) {
      setAchievements((prev) => [...prev, "Half Way"]);
      setShowAchievement("Halfway There! ⚡");
    }
    if (newProgress >= 100 && !achievements.includes("Form Master")) {
      setAchievements((prev) => [...prev, "Form Master"]);
      setShowAchievement("Form Master! Ready to Battle! 👑");
    }
  }, [formData, achievements]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData((prevData) => ({ ...prevData, logo: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    
    setAnimatingField(name);
    setTimeout(() => setAnimatingField(""), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Uploading assets...");

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");
      setStatusMessage("🎉 Team Successfully Registered!");
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressColor = () => {
    if (progress < 33) return "from-red-500 to-orange-500";
    if (progress < 66) return "from-orange-500 to-yellow-500";
    if (progress < 100) return "from-yellow-500 to-cyan-500";
    return "from-cyan-500 to-purple-500";
  };

  const getProgressRank = () => {
    if (progress < 33) return "Rookie";
    if (progress < 66) return "Warrior";
    if (progress < 100) return "Elite";
    return "Legendary";
  };

  const resetForm = () => {
    setStatusMessage("");
    setFormData({
      teamName: "",
      game: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      player5: "",
      player6: "",
      email: "",
      logo: null,
    });
    setProgress(0);
    setAchievements([]);
  };

  // Loading/Success States
  if (isSubmitting || (statusMessage && !isSubmitting)) {
    return (
      <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="register">
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
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center p-12 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-xl border-2 ${
            isSubmitting ? "border-cyan-400/50" : "border-green-400/50"
          } rounded-3xl shadow-2xl`}>
            
            {isSubmitting ? (
              <>
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin">
                    <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl text-cyan-400 font-black mb-4">
                  {statusMessage}
                </h3>
                <p className="text-gray-400">Preparing your team for battle...</p>
              </>
            ) : (
              <>
                <div className="text-8xl mb-6 animate-bounce">🏆</div>
                <h3 className="text-4xl font-black mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {statusMessage}
                  </span>
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  Your team has been added to the tournament roster!
                </p>
                <button
                  onClick={resetForm}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/30"
                >
                  <span className="relative z-10">Register Another Team</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black" id="register">
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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Battle Registration</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block sm:inline">
              JOIN THE
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block sm:inline sm:ml-4">
              BATTLE
            </span>
          </h1>
          
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6"></div>
          
          {/* Progress Section */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold">
                <span className="text-cyan-400">Rank:</span>{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {getProgressRank()}
                </span>
              </div>
              <div className="text-lg font-bold">
                <span className="text-purple-400">Progress:</span>{" "}
                <span className="text-white">{Math.round(progress)}%</span>
              </div>
            </div>
            
            <div className="relative w-full bg-gray-800/50 rounded-full h-6 border-2 border-cyan-400/30 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 relative`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className={`transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          
          <div className="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
            
            {/* Top Accent */}
            <div className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
            
            <div className="p-8 space-y-8">
              
              {/* Team Configuration Section */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-cyan-400/20 overflow-hidden">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40"></div>
                
                <h3 className="text-2xl font-black text-cyan-400 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🛡️</span>
                  Team Configuration
                </h3>
                
                <div className="space-y-6">
                  <StyledInput
                    name="teamName"
                    placeholder="Enter your legendary team name"
                    value={formData.teamName}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="⚡"
                  />
                  <GameSelect
                    name="game"
                    value={formData.game}
                    onChange={handleChange}
                    animatingField={animatingField}
                  />
                  <StyledFileInput
                    name="logo"
                    onChange={handleChange}
                    fileName={formData.logo ? formData.logo.name : ""}
                  />
                </div>
              </div>

              {/* Squad Roster Section */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-cyan-400/20 overflow-hidden">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40"></div>
                
                <h3 className="text-2xl font-black text-cyan-400 mb-6 flex items-center">
                  <span className="text-3xl mr-3">👥</span>
                  Squad Roster
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StyledInput
                    name="player1"
                    placeholder="Captain (Player 1 IGN)"
                    value={formData.player1}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="🎖️"
                  />
                  <StyledInput
                    name="player2"
                    placeholder="Player 2 IGN"
                    value={formData.player2}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="⚔️"
                  />
                  <StyledInput
                    name="player3"
                    placeholder="Player 3 IGN"
                    value={formData.player3}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="🛡️"
                  />
                  <StyledInput
                    name="player4"
                    placeholder="Player 4 IGN"
                    value={formData.player4}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="🔫"
                  />
                  <StyledInput
                    name="player5"
                    placeholder="Player 5 IGN"
                    value={formData.player5}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="💥"
                  />
                  <StyledInput
                    name="player6"
                    placeholder="Substitute (Optional)"
                    value={formData.player6}
                    onChange={handleChange}
                    animatingField={animatingField}
                    icon="🎯"
                  />
                </div>
              </div>

              {/* Command Center Section */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-cyan-400/20 overflow-hidden">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40"></div>
                
                <h3 className="text-2xl font-black text-cyan-400 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📧</span>
                  Command Center
                </h3>
                
                <StyledInput
                  name="email"
                  placeholder="Team Captain's Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  animatingField={animatingField}
                  icon="📬"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={progress < 100 || isSubmitting}
                className={`relative w-full p-8 font-black text-2xl uppercase transition-all duration-300 rounded-2xl overflow-hidden ${
                  progress < 100
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center">
                  <span className="text-4xl mr-4">
                    {progress < 100 ? "🔒" : "🚀"}
                  </span>
                  {progress < 100 ? "Complete Form to Unlock" : "Launch Into Battle!"}
                </div>
                
                {progress >= 100 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Achievement Toast */}
      {showAchievement && (
        <AchievementToast
          message={showAchievement}
          onClose={() => setShowAchievement(null)}
        />
      )}
    </section>
  );
};

export default RegistrationForm;