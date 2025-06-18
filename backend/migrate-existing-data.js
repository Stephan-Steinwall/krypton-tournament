// migrate-existing-data.js
// Run this script ONCE to update existing teams with new game categorization

const mongoose = require("mongoose");
require("dotenv").config();

// Import your Team model (make sure the path is correct)
const Team = require("./models/Team");

// Game mapping configuration
const gameMapping = {
  'Call of Duty 4x': { category: 'cod4x', mode: 'team', maxPlayers: 5 },
  'COD 4x': { category: 'cod4x', mode: 'team', maxPlayers: 5 },
  'PUBG Mobile': { category: 'pubg', mode: 'team', maxPlayers: 4 },
  'Valorant': { category: 'valorant', mode: 'team', maxPlayers: 5 },
  'Mortal Kombat 1': { category: 'mk1', mode: 'individual', maxPlayers: 1 },
  'MK1': { category: 'mk1', mode: 'individual', maxPlayers: 1 }
};

async function migrateExistingTeams() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration...");

    // Get all existing teams
    const teams = await Team.find({});
    console.log(`Found ${teams.length} teams to migrate`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const team of teams) {
      try {
        // Check if team already has gameCategory (already migrated)
        if (team.gameCategory) {
          console.log(`⏭️  Skipping ${team.teamName} - already migrated`);
          skipCount++;
          continue;
        }

        // Find matching game configuration
        const gameConfig = gameMapping[team.game];
        
        if (!gameConfig) {
          console.log(`❌ Unknown game for team ${team.teamName}: ${team.game}`);
          errorCount++;
          continue;
        }

        // Update team with new fields
        const updateData = {
          gameCategory: gameConfig.category,
          gameMode: gameConfig.mode,
          maxPlayers: gameConfig.maxPlayers,
          // Initialize new stat fields with defaults
          wins: team.wins || 0,
          losses: team.losses || 0,
          kills: team.kills || 0,
          deaths: team.deaths || 0,
          kdr: team.kdr || 0,
          placement: team.placement || 0,
          damage: team.damage || 0,
          roundsWon: team.roundsWon || 0,
          perfectWins: team.perfectWins || 0,
          updatedAt: new Date()
        };

        await Team.findByIdAndUpdate(team._id, updateData);
        
        console.log(`✅ Updated ${team.teamName} (${team.game} → ${gameConfig.category})`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error updating team ${team.teamName}:`, error.message);
        errorCount++;
      }
    }

    // Migration summary
    console.log("\n🎉 Migration completed!");
    console.log(`✅ Successfully updated: ${successCount} teams`);
    console.log(`⏭️  Already migrated: ${skipCount} teams`);
    console.log(`❌ Errors: ${errorCount} teams`);
    console.log(`📊 Total teams: ${teams.length}`);

    // Show game distribution
    console.log("\n📈 Game distribution after migration:");
    const gameStats = await Team.aggregate([
      {
        $group: {
          _id: "$gameCategory",
          count: { $sum: 1 },
          game: { $first: "$game" }
        }
      },
      { $sort: { count: -1 } }
    ]);

    gameStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} teams (${stat.game})`);
    });

  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

// Run the migration
console.log("🚀 Starting KRYPTON 2025 team migration...");
console.log("⚠️  This will update existing team records with new game categorization");
console.log("📝 Backup your database before running this script!\n");

migrateExistingTeams();

// Export for potential reuse
module.exports = { migrateExistingTeams, gameMapping };