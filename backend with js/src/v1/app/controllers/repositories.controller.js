import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";

class repositoriesController {
  async selectedRepositoriesHandler(req, res, next) {
    try {
      console.log("user: ", req.user);
      const response = await getData("/user/installations", {
        headers: {
          Authorization: `Bearer ghu_WDrxWWWNhQxTi1Wk0OVqgBmAh3q7Gc16I5zg`,
        },
      });
      console.log("response data: ", response);
      let res1 = await getData("repos/abudaudhossain/git-repo-report", {
        headers: {
          Authorization: `Bearer ghu_WDrxWWWNhQxTi1Wk0OVqgBmAh3q7Gc16I5zg`,
        },
      });
      console.log("res1: ", res1)
      res.json(response);
    } catch (error) {
      console.log(error.status);
      next(error);
    }
  }
}

export default new repositoriesController();
