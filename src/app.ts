import express from "express";
import dotenv from "dotenv";
import dbConnect from "./libs/dbConnect";
import cors from "cors";

import { Request, Response, NextFunction } from "express";
import router from "./routes/mainRouter";
// import { errorHandler } from "./middlewares/ApiAndException";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://rowx.in", "http://localhost:5173"],
    credentials: true, // if you're using cookies or sessions
  })
);

app.use("/api", router);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(`[ERROR] ${req.method} ${req.url} -`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
    data: null,
  });
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
