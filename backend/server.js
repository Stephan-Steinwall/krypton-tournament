const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Team = require("./models/Team");

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER CONFIG ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- GAME CONFIGURATION ---
const gameConfig = {
  'Call of Duty 4x': { category: 'cod4x', mode: 'team', maxPlayers: 5, icon: '🔫' },
  'PUBG Mobile': { category: 'pubg', mode: 'team', maxPlayers: 4, icon: '🎯' },
  'Valorant': { category: 'valorant', mode: 'team', maxPlayers: 5, icon: '⚡' },
  'Mortal Kombat 1': { category: 'mk1', mode: 'individual', maxPlayers: 1, icon: '⚔️' }
};

// --- API ROUTES ---

// UPDATED REGISTRATION ROUTE with game categorization
app.post("/api/register", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Team logo is required." });
    }

    const { game } = req.body;
    
    // Validate game selection
    if (!gameConfig[game]) {
      return res.status(400).json({ message: "Invalid game selection." });
    }

    // Upload logo to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "krypton_logos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Create new team with enhanced fields
    const newTeam = new Team({
      ...req.body,
      logoUrl: uploadResponse.secure_url,
      gameCategory: gameConfig[game].category,
      gameMode: gameConfig[game].mode,
      maxPlayers: gameConfig[game].maxPlayers
    });

    await newTeam.save();

    console.log("Team Saved with Enhanced Data:", newTeam);
    res.status(201).json({ 
      message: `Team '${newTeam.teamName}' registered successfully for ${game}!`,
      teamId: newTeam._id,
      gameCategory: newTeam.gameCategory
    });
  } catch (error) {
    console.error("Error saving team:", error);
    res.status(500).json({ 
      message: "Error: Registration failed.", 
      error: error.message 
    });
  }
});

// ENHANCED LEADERBOARD ROUTE with game filtering
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { category, game, limit = 50 } = req.query;
    
    let filter = {};
    
    // Filter by game category (cod4x, pubg, valorant, mk1)
    if (category && category !== 'all') {
      filter.gameCategory = category;
    }
    
    // Filter by specific game name
    if (game) {
      filter.game = game;
    }
    
    // Build sort criteria - prioritize score, then wins, then KDR
    const sortCriteria = { 
      score: -1, 
      wins: -1, 
      kdr: -1, 
      registrationDate: 1 
    };
    
    const teams = await Team
      .find(filter)
      .sort(sortCriteria)
      .limit(parseInt(limit))
      .select('teamName game gameCategory logoUrl score wins losses kills deaths kdr placement damage roundsWon perfectWins registrationDate')
      .exec();
    
    // Add ranking position to each team
    const rankedTeams = teams.map((team, index) => ({
      ...team.toObject(),
      rank: index + 1,
      gameIcon: gameConfig[team.game]?.icon || '🎮'
    }));
    
    res.status(200).json(rankedTeams);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard data." });
  }
});

// NEW: Get game statistics
app.get('/api/leaderboard/games', async (req, res) => {
  try {
    const gameStats = await Promise.all(
      Object.entries(gameConfig).map(async ([gameName, config]) => {
        const teamCount = await Team.countDocuments({ game: gameName });
        const avgScore = await Team.aggregate([
          { $match: { game: gameName } },
          { $group: { _id: null, avgScore: { $avg: "$score" } } }
        ]);
        
        return {
          game: gameName,
          category: config.category,
          icon: config.icon,
          teamCount,
          avgScore: avgScore[0]?.avgScore || 0,
          mode: config.mode,
          maxPlayers: config.maxPlayers
        };
      })
    );
    
    res.status(200).json(gameStats);
  } catch (error) {
    console.error("Error fetching game statistics:", error);
    res.status(500).json({ message: "Error fetching game statistics." });
  }
});

// ENHANCED TEAMS ROUTE with filtering
app.get("/api/teams", async (req, res) => {
  try {
    const { category, game } = req.query;
    
    let filter = {};
    if (category && category !== 'all') {
      filter.gameCategory = category;
    }
    if (game) {
      filter.game = game;
    }
    
    const teams = await Team
      .find(filter)
      .sort({ registrationDate: -1 })
      .exec();
    
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams." });
  }
});

// ENHANCED SCORE UPDATE ROUTE with additional stats
app.patch('/api/teams/:id/score', async (req, res) => {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { 
      score, 
      wins, 
      losses, 
      kills, 
      deaths, 
      placement, 
      damage, 
      roundsWon, 
      perfectWins 
    } = req.body;
    const { id } = req.params;

    // Build update object with only provided fields
    const updateData = { lastMatchDate: new Date() };
    
    if (typeof score === 'number') updateData.score = score;
    if (typeof wins === 'number') updateData.wins = wins;
    if (typeof losses === 'number') updateData.losses = losses;
    if (typeof kills === 'number') updateData.kills = kills;
    if (typeof deaths === 'number') updateData.deaths = deaths;
    if (typeof placement === 'number') updateData.placement = placement;
    if (typeof damage === 'number') updateData.damage = damage;
    if (typeof roundsWon === 'number') updateData.roundsWon = roundsWon;
    if (typeof perfectWins === 'number') updateData.perfectWins = perfectWins;

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    // Recalculate KDR if kills/deaths were updated
    if (kills !== undefined || deaths !== undefined) {
      updatedTeam.calculateKDR();
      await updatedTeam.save();
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error updating team stats:", error);
    res.status(500).json({ message: "Error updating team statistics." });
  }
});

// NEWS ROUTE (unchanged)
app.get("/api/news", (req, res) => {
  const newsData = [
    {
      id: 1,
      category: "TOURNAMENT UPDATE",
      title: "Registration Is Now Open!",
      date: "2025-06-12",
      content: "The moment you have been waiting for has arrived. Team registrations for KRYPTON are officially open. Assemble your squad and sign up now!",
    },
    {
      id: 2,
      category: "GAME ANNOUNCEMENT", 
      title: "Multiple Games Added to Tournament",
      date: "2025-06-10",
      content: "KRYPTON 2025 now features Call of Duty 4x, PUBG Mobile, Valorant, and Mortal Kombat 1. Choose your battleground and compete for glory!",
    },
    {
      id: 3,
      category: "LEADERBOARD",
      title: "Live Rankings Now Available",
      date: "2025-06-08", 
      content: "Track your team's progress with our new game-specific leaderboards. See how you rank against other competitors in your chosen game.",
    }
  ];
  res.json(newsData);
});

// NEW: Migration endpoint to update existing teams
app.post('/api/migrate-teams', async (req, res) => {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const teams = await Team.find({});
    let updatedCount = 0;

    for (const team of teams) {
      // Only update if gameCategory is missing
      if (!team.gameCategory) {
        const config = gameConfig[team.game];
        if (config) {
          team.gameCategory = config.category;
          team.gameMode = config.mode;
          team.maxPlayers = config.maxPlayers;
          await team.save();
          updatedCount++;
        }
      }
    }

    res.status(200).json({ 
      message: `Migration completed. Updated ${updatedCount} teams.`,
      totalTeams: teams.length,
      updatedTeams: updatedCount
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({ message: "Migration failed." });
  }
});

// NEW: Get available games for dropdown
app.get('/api/games', (req, res) => {
  const games = Object.entries(gameConfig).map(([gameName, config]) => ({
    name: gameName,
    category: config.category,
    icon: config.icon,
    mode: config.mode,
    maxPlayers: config.maxPlayers
  }));
  
  res.status(200).json(games);
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 KRYPTON 2025 Server running on http://localhost:${PORT}`);
  console.log(`📊 Game categories supported: ${Object.keys(gameConfig).join(', ')}`);
});