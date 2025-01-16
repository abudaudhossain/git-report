import express from "express";
import repositoriesController from "../controllers/repositories.controller.js";

const repositoriesRoutes = express.Router();

repositoriesRoutes.get(
  "/selected",
  repositoriesController.selectedRepositoriesHandler
);
repositoriesRoutes.get("/report-generated/:name", repositoriesController.generatedReportHandler);

export default repositoriesRoutes;
