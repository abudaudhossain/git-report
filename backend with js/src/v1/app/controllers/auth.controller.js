import axios from "axios";
import { userDB } from "../services/db/userDB.js";
import { getAccessToken } from "../helpers/utility.js";

const fetchAccessToken = async (code) => {
  console.log(code);
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );
  console.log(response.data);
  return response.data.access_token; // Store this securely
};
class AuthController {
  // Render login page with GitHub login link
  login(req, res) {
    res.send('<a href="/api/v1/auth/github">Login with GitHub</a>');
  }

  // Handle logout and redirect to home
  logout(req, res) {
    req.logout(() => {
      res.redirect("/");
    });
  }

  // Handle GitHub OAuth callback and redirect to profile page
  async authCallback(req, res, next) {
    try {
      const code = req.query.code;

      let { id, nodeId, displayName, username, provider, _json } = req.user;
      const accessToken = getAccessToken({ name: displayName, username });
      console.log("access token: ", accessToken);
      let { avatar_url, bio } = _json;
      let existUser = await userDB.findOne({ username: username });
      if (!existUser) {
        existUser = await userDB.create({
          githubId: id,
          githubNodeId: nodeId,
          name: displayName,
          username,
          provider,
          avatar: avatar_url,
          bio,
          accessToken,
        });
      } else {
        let updateUserResult = await userDB.update(
          { username: username },
          {
            accessToken: accessToken,
          }
        );
        console.log(updateUserResult);
      }

      res.json({
        ...existUser._doc,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  repositoryHandler(req, res) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`
    );
  }

  // Handle Login
  loginWithPassword(req, res, next) {
    try {
      res.send("Login with password");
    } catch (error) {
      next(error);
    }
  }

  // Handle Signup
  signupHandler(req, res, next) {
    try {
      res.send("Sign up");
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
