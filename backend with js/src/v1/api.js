import express from "express";
import welcomeControllers from "./app/controllers/welcomeControllers.js";
import authRoutes from "./app/routes/auth.routes.js";
import repositoriesRoutes from "./app/routes/repositories.routes.js";
const router = express.Router();

// import userRoutes from './modules/user/routes/userRoutes.js'; // Import user routes
// import authRoutes from "./modules/user/routes/authRoutes.js"; // Import authentication routes
// import adminRoutes from "./modules/user/routes/adminRoutes.js"; // Import admin routes

// // Middleware
// import userAuthMiddleware from './middleware/userAuth.js'; // Import user authentication middleware
// import adminAuthMiddleware from './middleware/adminAuth.js'; // Import admin authentication middleware

// // Authentication routes (e.g., login, register)
router.get("/", welcomeControllers.welcomeHandler);
router.use("/auth", authRoutes);
router.use("/repositories", repositoriesRoutes)

// // User routes (e.g., user profile, settings)
// router.use('/user', userRoutes);

// // Admin routes, protected by user and admin authentication middleware
// router.use("/admin", userAuthMiddleware, adminAuthMiddleware, adminRoutes);

export default router;
