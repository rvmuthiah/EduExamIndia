import {Routes, Route} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import AdminLayout from "../layouts/AdminLayout";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import QuestionPapers from "../pages/QuestionPapers";
import AddQuestionPaper from "../pages/AddQuestionPaper";
import EditQuestionPaper from "../pages/EditQuestionPaper";
import ViewQuestionPaper from "../pages/ViewQuestionPaper";





const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

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

        <Route
          path="/questionpapers"
          element={<QuestionPapers />}
        />

        <Route
          path="/questionpapers/add"
          element={<AddQuestionPaper />}
        />

        <Route
          path="/questionpapers/edit/:id"
          element={<EditQuestionPaper />}
        />

        <Route
          path="/questionpapers/view/:id"
          element={<ViewQuestionPaper />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
