import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

/**
 * Making filter
 *
 * @param {String []} fields - The fields contains filter item keys
 *
 * @returns {Object} - The filter object
 */

export const getFilter = (fields) => {
  let filter = {};
  if (typeof fields == "string") {
    fields = [fields];
  }
  if (fields?.length > 0) {
    fields?.forEach((item) => {
      filter[item] = 1;
    });
  }

  return filter;
};

export const getGithubAccessToken = () => {
  try {
    var privateKey = fs.readFileSync(
      "./git-repo-report.2024-12-21.private-key.pem"
    );
    const currentTimestamp = Math.floor(Date.now() / 1000);
    var token = jwt.sign(
      {
        iss: "Iv23licc2XzMwed367Xv",
        exp: currentTimestamp + 10 * 60,
        iat: currentTimestamp,
      },
      privateKey,
      { algorithm: "RS256" }
    );

    console.log(token);

    return token;
  } catch (error) {
    console.log(error);
  }
};
