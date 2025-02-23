const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = []; // Temporary in-memory storage (use DB in production)

const SECRET_KEY = "your_secret_key"; // Change this in production!

// Signup Route
router.post("/signup", (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Save user (without hashing password)
    users.push({ email, password });

    res.json({ message: "Signup successful" });
});

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
});

// Protected Route Example
router.get("/protected", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: "Protected data", user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;

