export const addRepositories = (repositories, owner) => {
  try {
    let repos = [];
    for (let repo of repositories) {
      repos.push({
        githubId: repo.id,
        githubNodeId: repo.node_id,
        name: repo.name,
        private: repo.private,
        senderId: owner.senderId,
        owner: owner.id,
      });
    }

    console.log(repos);
    return [];
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
