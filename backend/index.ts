import { configDotenv } from "dotenv";
import express, { Express } from "express";
import { connectDB } from "./utils/database";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

configDotenv();

const app: Express = express();
const PORT: number = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
