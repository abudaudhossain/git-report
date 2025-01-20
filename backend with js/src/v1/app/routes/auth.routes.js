import express from "express";
import authController from "../controllers/auth.controller.js";
import passport from "passport";
import axios from "axios";

const authRoutes = express.Router();

authRoutes.get("/login", authController.login);
authRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email", "repo"] })
);
authRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/v1/auth/github/fail",
    successRedirect: "http://localhost:3000",
  })
);
authRoutes.get('/success', authController.authCallback)

// auth
authRoutes.post("/signup", authController.signupHandler);
authRoutes.post("/login", authController.loginWithPassword);

export default authRoutes;
