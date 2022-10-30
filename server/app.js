import express from "express";
import fileUpload from "express-fileupload";
import postRoutes from "./routes/posts.routes.js";
import morgan from "morgan";

// Instance of Express
const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(postRoutes);

export default app;
