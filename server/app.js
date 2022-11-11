import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/posts.routes.js";
// Instance of Express
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use(postRoutes);

export default app;
