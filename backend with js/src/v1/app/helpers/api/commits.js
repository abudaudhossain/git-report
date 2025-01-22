import { getAPI } from "../../services/api/axios.js";

export const getAllCommits = async (owner, repo, token) => {
    try {
        let page = 1;
    let allCommits = [];
    let hasMoreCommits = true;
    // console.log("commit....")
    while (hasMoreCommits) {
        const response = await getAPI(`/repos/${owner}/${repo}/commits`, {
            headers: { Authorization: `token ${token}` },
            params: {
                per_page: 100,
                page,
            },
        });
        // console.log("commit....",response.data.length)
  
      if (response.data.length > 0) {
        allCommits = allCommits.concat(response.data);
        page++;
      } else {
        hasMoreCommits = false;
      }
    }
  
    return allCommits;
    } catch (error) {
        console.log(error)
        return []
    }
  };