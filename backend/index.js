require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// Allowed origins (add production URL when deploying)
const allowedOrigins = [
    "http://localhost:3000", // Your React frontend (dev)
    // "https://your-production-frontend.com" // Uncomment/add for production
];

app.use(express.json({ limit: '10mb' }));

// Fix CORS for credentials
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman) or those in the list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
