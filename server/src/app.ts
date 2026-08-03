import express from "express";
import path from "path";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import questionPaperRoutes from "./modules/questionPaper/routes/questionPaper.routes";
import uploadRoutes from "./modules/upload/routes/upload.routes";
import studentRoutes from "./modules/student/routes/student.routes";
import examRoutes from "./modules/exam/routes/exam.routes";
import questionRoutes from "./modules/question/routes/question.routes";
import examAttemptRoutes from "./modules/examAttempt/routes/examAttempt.routes";
import studentAnswerRoutes from "./modules/studentAnswer/routes/studentAnswer.routes";
import resultRoutes from "./modules/result/routes/result.routes";
import leaderboardRoutes from "./modules/leaderboard/routes/leaderboard.routes";
import dashboardRoutes from "./modules/dashboard/routes/dashboard.routes";

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
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exam-attempts", examAttemptRoutes);
app.use("/api/student-answers", studentAnswerRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/dashboard", dashboardRoutes);


export default app;