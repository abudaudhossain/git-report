import passport from "passport";
import passportGithub2 from "passport-github2";

const GithubStrategy = passportGithub2.Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken,profile )
    
      return done(null, {...profile,accessToken});
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize user: ", user)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
