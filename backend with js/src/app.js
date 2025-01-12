import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

// Convert filename and dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import apiV1 from "./v1/api.js"; // Import API version 1 routes

// DB connection
import mongoDB from "./config/mongoDB.js"; // Import MongoDB connection configuration
import sessionConfig from "./config/session.js";
import passport from "./config/passport.js";
import { getGithubAccessToken } from "./utils/helpers.js";

// Middleware setup
app.use(sessionConfig);
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json({ limit: "500mb" })); // Parse JSON bodies with a size limit
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to add properties to the request object
app.use((req, res, next) => {
  req.rootDir = __dirname; // Add root directory to request object
  req.nativeRequest = {}; // Initialize an empty nativeRequest object
  next(); // Proceed to the next middleware
});

// Database connection with mongoose
mongoDB(); // Connect to MongoDB

// API version 1 routes
app.use("/api/v1", apiV1); // Use API v1 routes for /api/v1 path

app.post("/webhooks",(req, res, next)=>{
  try {
    console.log(req.body, req.params)
    
    res.send("ok")
  } catch (error) {
    next(error)
  }
})


export default app; // Export the app instance
