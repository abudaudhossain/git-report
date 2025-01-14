import { getGithubAppAccessToken } from "../../../utils/helpers.js";

export const githubUserAccessToken =async (installationId) => {
  try {
    const appToken =  getGithubAppAccessToken();

    return {
      isSuccess: true,
      message: "GitHub user access token retrieved successfully",
      data: "token",
    };
  } catch (error) {
    console.error(`${error.message}\n${error.stack}`);
    return{
        isSuccess: false,
        message: "Unable to retrieve GitHub user access token."
    }
  }
};
