import express from "express";
import session from "express-session";
import { registerRoutes } from "../server/routes";
import { pool } from "../server/db";
import pgSession from "connect-pg-simple";

const SESSION_SECRET = process.env.SESSION_SECRET || "vibe_conference_session_secret";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PostgresStore = pgSession(session);
app.use(
  session({
    store: new PostgresStore({
      pool,
      tableName: "session",
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

registerRoutes(app);

export default app;
