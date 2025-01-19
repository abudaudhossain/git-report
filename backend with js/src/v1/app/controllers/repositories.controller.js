import axios from "axios";
import { getData } from "../helpers/api/repo.api.js";
import { repositoryDB } from "../services/db/repoDB.js";
import { getAPI, postAPI } from "../services/api/axios.js";
import { getGithubAppAccessToken } from "../../../utils/helpers.js";
import { getDate } from "../helpers/utility.js";

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
      let commitsResponse = await getAPI(
        `/repos/${user.username}/${name}/commits`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
      console.log(response.data.token);
      let commits = commitsResponse.data;
      let totalCommits = commits.length;
      let dateWiseCommitsCount = {};
      let contributorsWiseCommitsCount = {};

      for (let commit of commits) {
        let committer = commit.commit.committer;

        if (contributorsWiseCommitsCount[committer.name]) {
          contributorsWiseCommitsCount[committer.name].count++;
        } else {
          contributorsWiseCommitsCount[committer.name] = {
            name: committer.name,
            count: 1,
          };
        }
        let date = getDate(committer.date);

        if (dateWiseCommitsCount[date]) {
          dateWiseCommitsCount[date].count++;
        } else {
          dateWiseCommitsCount[date] = {
            date: date,
            count: 1,
          };
        }

        console.log(
          "commit: ",
          dateWiseCommitsCount,
          contributorsWiseCommitsCount
        );
      }
      let todayDate = getDate(new Date());

      let todayCommitCount = dateWiseCommitsCount[todayDate] || 0;
      let yesterDay = new Date();
      yesterDay.setDate(yesterDay.getDate() - 1);
      let yesterdayDate = getDate(yesterDay);
      let yesterdayCommitCount = dateWiseCommitsCount[yesterdayDate] || 0;

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
        todayCommitCount,
        yesterdayCommitCount,
        totalCommits,
        contributorsWiseCommitsCount: Object.values(
          contributorsWiseCommitsCount
        ),
        dateWiseCommitsCount: Object.values(dateWiseCommitsCount),
        totalContributors,
        totalIssues,
        openIssuesCount,
        closeIssuesCount,
        watchCount,
        forkCount,
        pullRequestCount: pulls?.data?.length || 0,
      });
    } catch (error) {
      res.send(error);
    }
  }
}

export default new repositoriesController();
