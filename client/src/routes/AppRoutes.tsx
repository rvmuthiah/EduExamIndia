import {Routes, Route} from "react-router-dom";

import Login from "../pages/Login";
import StudentLogin from "../pages/StudentLogin";

import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import AdminLayout from "../layouts/AdminLayout";

import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";

import QuestionPapers from "../pages/QuestionPapers";
import AddQuestionPaper from "../pages/AddQuestionPaper";
import EditQuestionPaper from "../pages/EditQuestionPaper";
import ViewQuestionPaper from "../pages/ViewQuestionPaper";
import QuestionPaperReview from "../pages/QuestionPaperReview";

import Questions from "../pages/Questions";
import AddQuestion from "../pages/AddQuestion";
import EditQuestion from "../pages/EditQuestion";
import ViewQuestion from "../pages/ViewQuestion";

import Exams from "../pages/Exams";
import AddExam from "../pages/AddExam";
import ViewExam from "../pages/ViewExam";
import EditExam from "../pages/EditExam";

import StudentLayout from "../layouts/StudentLayout";
import StudentExams from "../pages/StudentExams";
import TakeExam from "../pages/TakeExam";
import StudentResult from "../pages/StudentResult";
import StudentResultHistory from "../pages/StudentResultHistory";

import Home from "../pages/public/Home";
import Boards from "../pages/public/Boards";
import Standards from "../pages/public/Standards";
import ExamTimetable from "../pages/public/ExamTimetable";
import ExamSchedule from "../pages/public/ExamSchedule";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/boards"
        element={<Boards />}
      />

      <Route
        path="/standards"
        element={<Standards />}
      />

      <Route
        path="/exam-timetable"
        element={<ExamTimetable />}
      />

      <Route
        path="/exam-schedule"
        element={<ExamSchedule />}
      />

      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ================= ADMIN ================= */}

      <Route element={<AdminLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/students/add"
          element={<AddStudent />}
        />

        <Route
          path="/students/edit/:id"
          element={<EditStudent />}
        />

        {/* Question Papers */}

        <Route
          path="/questionpapers"
          element={<QuestionPapers />}
        />

        <Route
          path="/questionpapers/add"
          element={<AddQuestionPaper />}
        />

        <Route
          path="/questionpapers/view/:id"
          element={<ViewQuestionPaper />}
        />

        <Route
          path="/questionpapers/edit/:id"
          element={<EditQuestionPaper />}
        />

        <Route
          path="/questionpapers/review/:id"
          element={<QuestionPaperReview />}
        />

        {/* Questions */}

        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/questions/add"
          element={<AddQuestion />}
        />

        <Route
          path="/questions/view/:id"
          element={<ViewQuestion />}
        />

        <Route
          path="/questions/edit/:id"
          element={<EditQuestion />}
        />

        {/* Exams */}

        <Route
          path="/exams"
          element={<Exams />}
        />

        <Route
          path="/exams/add"
          element={<AddExam />}
        />

        <Route
          path="/exams/view/:id"
          element={<ViewExam />}
        />

        <Route
          path="/exams/edit/:id"
          element={<EditExam />}
        />
      </Route>

      {/* ================= STUDENT LOGIN ================= */}

      <Route
        path="/student/login"
        element={<StudentLogin />}
      />

      {/* ================= STUDENT ================= */}

      <Route element={<StudentLayout />}>
        <Route
          path="/student/exams"
          element={<StudentExams />}
        />

        <Route
          path="/student/exams/:id"
          element={<TakeExam />}
        />

        <Route
          path="/student/results"
          element={<StudentResultHistory />}
        />

        <Route
          path="/student/result/:attemptId"
          element={<StudentResult />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
