import Student from "../../student/models/student.model";
import Exam from "../../exam/models/exam.model";
import Question from "../../question/models/question.model";
import QuestionPaper from "../../questionPaper/models/questionPaper.model";
import ExamAttempt from "../../examAttempt/models/examAttempt.model";
import Result from "../../result/models/result.model";

// Admin Dashboard
export const getAdminDashboard = async () => {
  const students = await Student.countDocuments();
  const exams = await Exam.countDocuments();
  const questions = await Question.countDocuments();
  const questionPapers =
    await QuestionPaper.countDocuments();
  const attempts =
    await ExamAttempt.countDocuments();
  const results =
    await Result.countDocuments();

  return {
    students,
    exams,
    questions,
    questionPapers,
    attempts,
    results,
  };
};

// Student Dashboard
export const getStudentDashboard = async (
  studentId: string
) => {

  const completed =
    await Result.find({
      studentId,
    });

  const totalExams =
    completed.length;

  const completedExams =
    completed.length;

  const passCount =
    completed.filter(
      x => x.status === "PASS"
    ).length;

  const failCount =
    completed.filter(
      x => x.status === "FAIL"
    ).length;

  const highestScore =
    completed.length
      ? Math.max(
          ...completed.map(
            x => x.score
          )
        )
      : 0;

  const averageScore =
    completed.length
      ? completed.reduce(
          (sum, r) => sum + r.score,
          0
        ) / completed.length
      : 0;

  return {
    totalExams,
    completedExams,
    passCount,
    failCount,
    highestScore,
    averageScore,
  };
};