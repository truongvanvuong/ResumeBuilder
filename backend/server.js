import dotnetv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
const app = express();
dotnetv.config();

// Cấu hình danh sách các domain được phép truy cập (CORS)
const allowedOrigins = [
  "http://localhost:4200",
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : [])
].map(url => url.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// connect to database
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.get("/", (req, res) => {
  res.send("Api is working task api");
});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  }),
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
