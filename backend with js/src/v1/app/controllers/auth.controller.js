import axios from "axios";

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
  authCallback(req, res) {
    try {
      const code = req.query.code;
    
      res.send(req.user);
    } catch (error) {
      console.log(error);
      res.send("ik");
    }
  }

  repositoryHandler(req, res) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`
    );
  }
}

export default new AuthController();
