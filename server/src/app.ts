import express from "express";
import path from "path";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import questionPaperRoutes from "./modules/questionPaper/routes/questionPaper.routes";
import uploadRoutes from "./modules/upload/routes/upload.routes";
import studentRoutes from "./modules/student/routes/student.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to EduExam India (RankOne) Backend 🚀");
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/question-papers", questionPaperRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
app.use("/api/students", studentRoutes);

export default app;