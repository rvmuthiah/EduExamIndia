import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import questionPaperRoutes from "./modules/questionPaper/routes/questionPaper.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to EduExam India (RankOne) Backend 🚀");
});

app.get("/", (req, res) => {
    res.send("Welcome to RankOne Backend 🚀");
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/question-papers", questionPaperRoutes);

export default app;