import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";
import { repositoryDB } from "../services/db/repoDB.js";
import { getAPI, postAPI } from "../services/api/axios.js";
import { getGithubAppAccessToken } from "../../../utils/helpers.js";

class repositoriesController {
  async selectedRepositoriesHandler(req, res, next) {
    const { generatedReport } = req.query;
    try {
      let { user } = req.nativeRequest;
      console.log(user);
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
    const { name } = req.params;
    try {
      let { user } = req.nativeRequest;
      const appAccessToken = getGithubAppAccessToken();
      const response = await postAPI(
        `/app/installations/${user.installationId}/access_tokens`,
        {},
        {
          headers: {
            Authorization: `Bearer ${appAccessToken}`,
          },
        }
      );
      let repository = await getAPI(`/repos/${user.username}/${name}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      let commits = await getAPI(`/repos/${user.username}/${name}/commits`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      let contributors = await getAPI(
        `/repos/${user.username}/${name}/contributors`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
      let merges = await getAPI(`/repos/${user.username}/${name}/merges`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      let issues = await getAPI(`/repos/${user.username}/${name}/issues`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      let pulls = await getAPI(`/repos/${user.username}/${name}/pulls`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      res.json({
        name: repository.data.name,
        fullName: repository.data.full_name,
        description: repository.data.description,
        commits,
        issues,
        pulls,
        merges,
        contributors,
      });
    } catch (error) {
      res.send(error);
      next(error);
    }
  }
}

export default new repositoriesController();
