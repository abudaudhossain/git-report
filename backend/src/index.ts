

// src/index.ts


import express, { NextFunction, Request, Response } from "express";
import path from "path";



const app = express();

// Middleware to add custom properties
app.use((req: Request, res: Response, next) => {
    req.rootDir = path.join(__dirname, "..");

    next();
});

app.get("/", (req, res) => {
    res.send(`Request at:  Root Dir: ${req.rootDir}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
