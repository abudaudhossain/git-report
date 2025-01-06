import axios from "axios";
import UnauthorizedError from "../../../../exceptions/UnauthorizedError.js";

const githubAxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  timeout: 5000,
});

export const getData = async (endpoint, conf) => {
  try {
    let response = await githubAxiosInstance.get(endpoint, conf);

    return response.data;
  } catch (error) {
    console.log();
    if (error.status) {
      throw new UnauthorizedError(error.response.data.message);
    }
    return null;
  }
};
