const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  game: { type: String, required: true },
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  player3: { type: String, required: true },
  player4: { type: String, required: true },
  player5: { type: String }, // Not required (sub)
  email: { type: String, required: true },
  logoUrl: { type: String, required: true },
   score: { type: Number, default: 0 },
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);