const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  
  // UPDATED: Enhanced game field with specific options
  game: { 
    type: String, 
    required: true,
    enum: [
      'Call of Duty 4x',
      'PUBG Mobile', 
      'Valorant',
      'Mortal Kombat 1'
    ]
  },
  
  // NEW: Game category for filtering
  gameCategory: {
    type: String,
    required: true,
    enum: ['cod4x', 'pubg', 'valorant', 'mk1']
  },
  
  // NEW: Game configuration
  gameMode: {
    type: String,
    enum: ['team', 'individual'],
    default: 'team'
  },
  
  maxPlayers: {
    type: Number,
    default: 5
  },
  
  // Existing player fields
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  player3: { type: String, required: true },
  player4: { type: String, required: true },
  player5: { type: String }, // Not required (sub)
  player6: { type: String }, // Additional substitute
  
  email: { type: String, required: true },
  logoUrl: { type: String, required: true },
  
  // Existing score field
  score: { type: Number, default: 0 },
  
  // NEW: Additional game metrics
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  
  // Game-specific stats
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  kdr: { type: Number, default: 0 }, // Kill/Death Ratio
  
  // Battle Royale specific (PUBG)
  placement: { type: Number, default: 0 }, // Average placement
  damage: { type: Number, default: 0 },
  
  // Fighting game specific (MK1)
  roundsWon: { type: Number, default: 0 },
  perfectWins: { type: Number, default: 0 },
  
  registrationDate: { type: Date, default: Date.now },
  lastMatchDate: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to automatically set gameCategory based on game
TeamSchema.pre('save', function(next) {
  const gameMapping = {
    'Call of Duty 4x': 'cod4x',
    'PUBG Mobile': 'pubg',
    'Valorant': 'valorant',
    'Mortal Kombat 1': 'mk1'
  };
  
  // Auto-set gameCategory
  this.gameCategory = gameMapping[this.game];
  
  // Auto-set game configuration
  const gameConfig = {
    'cod4x': { mode: 'team', maxPlayers: 5 },
    'pubg': { mode: 'team', maxPlayers: 4 },
    'valorant': { mode: 'team', maxPlayers: 5 },
    'mk1': { mode: 'individual', maxPlayers: 1 }
  };
  
  if (this.gameCategory && gameConfig[this.gameCategory]) {
    this.gameMode = gameConfig[this.gameCategory].mode;
    this.maxPlayers = gameConfig[this.gameCategory].maxPlayers;
  }
  
  // Update the updatedAt field
  this.updatedAt = Date.now();
  
  next();
});

// Method to calculate KDR
TeamSchema.methods.calculateKDR = function() {
  if (this.deaths === 0) {
    this.kdr = this.kills;
  } else {
    this.kdr = Math.round((this.kills / this.deaths) * 100) / 100;
  }
  return this.kdr;
};

module.exports = mongoose.model('Team', TeamSchema);