import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";
import { repositoryDB } from "../services/db/repoDB.js";
import { getAPI, postAPI } from "../services/api/axios.js";
import { getGithubAppAccessToken } from "../../../utils/helpers.js";
import { commitsAnalysis, getDate } from "../helpers/utility.js";
import { getAllCommits } from "../helpers/api/commits.js";

console.log(getGithubAppAccessToken());
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

      let commits = await getAllCommits(
        user.username,
        name,
        response.data.token
      );
      let commitsAnalysisData =await commitsAnalysis(commits);

      let contributors = await getAPI(
        `/repos/${user.username}/${name}/contributors`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
     
      let totalContributors = contributors.data.length;

      let issues = await getAPI(
        `/search/issues?q=repo:${user.username}/${name}+type:issue`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );

      let pulls = await getAPI(`/repos/${user.username}/${name}/pulls`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      let forkCount = repository.data.forks || 0,
        watchCount = repository.data.watchers || 0,
        openIssuesCount =
          (repository.data.open_issues_count || 0) - (pulls?.data?.length || 0),
        closeIssuesCount = issues?.data?.total_count - (openIssuesCount || 0);
      let totalIssues = issues.data.total_count;
      res.json({
        name: repository.data.name,
        fullName: repository.data.full_name,
        description: repository.data.description,
        totalContributors,
        totalIssues,
        openIssuesCount,
        closeIssuesCount,
        watchCount,
        forkCount,
        pullRequestCount: pulls?.data?.length || 0,
        ...commitsAnalysisData
      });
    } catch (error) {
      res.send(error);
    }
  }
}

export default new repositoriesController();
