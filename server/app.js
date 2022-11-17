import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import postRoutes from "./routes/posts.routes.js";
// Instance of Express
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json",
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use("/posts", postRoutes);

export default app;
