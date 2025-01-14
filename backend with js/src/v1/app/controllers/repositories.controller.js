import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";
import { repositoryDB } from "../services/db/repoDB.js";

class repositoriesController {
  async selectedRepositoriesHandler(req, res, next) {
    const { generatedReport } = req.query;
    try {
      let { user } = req.nativeRequest;
      console.log(user)
      let query = { owner: user.githubId };
      if (
        generatedReport === false ||
        generatedReport === "false" ||
        generatedReport === true ||
        generatedReport === "true"
      ) {
        query.generatedReport = generatedReport;
      }
      let repos = await repositoryDB.finds(query);

      res.json(repos);
    } catch (error) {
      next(error);
    }
  }

  async generatedReportHandler(req, res, next) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

export default new repositoriesController();
