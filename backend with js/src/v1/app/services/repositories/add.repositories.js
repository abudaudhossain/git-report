import { repositoryDB } from "../db/repoDB.js";

export const addRepositories = async (repositories, owner) => {
  try {
    let repos = [];
    for (let repo of repositories) {
      let result = await repositoryDB.create({
        githubId: repo.id,
        githubNodeId: repo.node_id,
        name: repo.name,
        fullName: repo.full_name,
        private: repo.private,
        senderId: owner.senderId,
        owner: owner.id,
      });

      repos.push(result);
    }

    return {
      isSuccess: true,
      message: "Inserted Success",
      data: repos,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
export const removedRepositories = async (repositories) => {
  try {
    for (let repo of repositories) {
      let result = await repositoryDB.update(
        {
          githubId: repo.id,
        },
        { selected: false }
      );
      // console.log(result);
    }
    return { isSuccess: true, message: "removed successfully" };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
