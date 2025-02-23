

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user"); // Import user routes

const app = express();

// Middleware
app.use(express.json()); // Ensure the server can parse JSON
app.use(cors());

// Routes
app.use("/api", userRoutes); // Mount user routes under "/api"
mongoose.connect("mongodb://127.0.0.1:27017/facebook-clone")


.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/api/login", (req, res) => {
  console.log("Login request received:", req.body);
  res.json({ message: "Checking request..." });
});


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


const morgan = require('morgan');

// Use Morgan to log HTTP requests
app.use(morgan('combined')); // 'combined' format logs IP, method, URL, status, and more


app.post("/api/login", (req, res) => {
    console.log("Incoming Login Request:", req.body); // Log request body
    res.json({ message: "Login route hit", data: req.body });
});
