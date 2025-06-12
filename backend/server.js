const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer"); // For handling file uploads
const cloudinary = require("cloudinary").v2; // For uploading to Cloudinary
require("dotenv").config();

const Team = require("./models/Team");

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- CLOUDINARY CONFIG ---
// This connects the backend to your Cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER CONFIG ---
// This configures how files are received and stored temporarily
// We use memoryStorage to handle the file as a buffer in memory before sending to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API ROUTES ---

// THIS IS THE UPDATED REGISTRATION ROUTE
// 1. It uses 'upload.single('logo')' as middleware to intercept a file named 'logo'.
// 2. It's an 'async' function because we need to 'await' the upload to Cloudinary.
app.post("/api/register", upload.single("logo"), async (req, res) => {
  try {
    // Check if a file was even uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Team logo is required." });
    }

    // Upload the file from memory (req.file.buffer) to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "krypton_logos" }, // Optional: saves to a specific folder in Cloudinary
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Create a new team instance with the form's text data (req.body)
    // and the secure URL of the uploaded image from Cloudinary
    const newTeam = new Team({
      ...req.body,
      logoUrl: uploadResponse.secure_url,
    });

    // Save the complete record to MongoDB
    await newTeam.save();

    console.log("Team Saved with Logo:", newTeam);
    res
      .status(201)
      .json({ message: `Team '${newTeam.teamName}' registered successfully!` });
  } catch (error) {
    console.error("Error saving team:", error);
    res
      .status(500)
      .json({ message: "Error: Registration failed.", error: error.message });
  }
});

// Your other routes like /api/news can remain here...
app.get("/api/news", (req, res) => {
  const newsData = [
    {
      id: 1,
      category: "TOURNAMENT UPDATE",
      title: "Registration Is Now Open!",
      date: "2025-06-12",
      content:
        "The moment you have been waiting for has arrived. Team registrations for KRYPTON are officially open. Assemble your squad and sign up now!",
    },
    {
      id: 2,
      category: "GAME ANNOUNCEMENT",
      title: "VALORANT Added to the Roster",
      date: "2025-06-10",
      content:
        "Due to popular demand, we are excited to announce that VALORANT will be an official title in the tournament. Get ready for some tactical shooter action.",
    },
  ];
  res.json(newsData);
});

app.get("/api/teams", async (req, res) => {
  try {
    // Find all documents in the Team collection
    // .sort({ registrationDate: -1 }) will show the newest teams first
    const teams = await Team.find({}).sort({ registrationDate: -1 });
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams." });
  }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        // Find teams, sort by score descending (-1), and limit to top 20
        const teams = await Team.find({}).sort({ score: -1 }).limit(20);
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaderboard data." });
    }
});


// This is a secure endpoint that requires a secret key.
app.patch('/api/teams/:id/score', async (req, res) => {
    // Simple security check
    if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { score } = req.body;
        const { id } = req.params;

        if (typeof score !== 'number') {
            return res.status(400).json({ message: 'Score must be a number.' });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            { score: score },
            { new: true } // This option returns the updated document
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.status(200).json(updatedTeam);

    } catch (error) {
        res.status(500).json({ message: "Error updating score." });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


