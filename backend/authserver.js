const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const PORT = 5001;
const app = express();
const MONGODB_URI = "mongodb://localhost:27017/ytLogin";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});
db.once('open', () => {
    console.log('MongoDB is connected');
});

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
    console.log('Received a request to /signup');
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route
app.post('/login', async (req, res) => {
    console.log('Received a request to /login');
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
    res.send('GET request successful');
    console.log('GET /test request received');
});

// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Start server
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
