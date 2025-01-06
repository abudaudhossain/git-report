import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import mongoDB from "./config/mongoDB";


// import apiV1 from "./v1/api.js"; // Import API version 1 routes

// Middleware setup
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "500mb" }));
app.use(cors());
app.use(cookieParser())


//  Custom middleware to add properties to the request object
app.use((req: Request, res: Response, next) => {

    req.rootDir = path.join(__dirname, "..");
    // req.requestAt = new Date();
    next();
});

// Database connection with mongoose
mongoDB();


console.log("Custom middleware to add properties to the request object")

// // API version 1 routes
// app.use("/api/v1", apiV1); // Use API v1 routes for /api/v1 path

export default app; // Export the app instance
