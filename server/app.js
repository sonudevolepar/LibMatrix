import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { dbConnection } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";

import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

export const app = express();

config({ path: "./config/config.env" });

// DATABASE
dbConnection();

// CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MIDDLEWARES
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

// SERVICES
notifyUsers();
removeUnverifiedAccounts();

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// ERROR MIDDLEWARE
app.use(errorMiddleware);