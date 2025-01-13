import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";

class repositoriesController {
  async selectedRepositoriesHandler(req, res, next) {
    try {
     
      res.json(response);
    } catch (error) {
      console.log(error.status);
      next(error);
    }
  }
}

export default new repositoriesController();
