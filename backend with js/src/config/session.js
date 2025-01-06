import session from "express-session";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: true,
  saveUninitialized: true,
});

export default sessionConfig;
