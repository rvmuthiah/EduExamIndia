import {Navigate, Outlet, useLocation} from "react-router-dom";

const StudentProtectedRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("studentId");
  const role = localStorage.getItem("role");

  // =====================================================
  // CHECK STUDENT LOGIN
  // =====================================================

  const isStudentLoggedIn =
    Boolean(token) && Boolean(studentId) && role === "Student";

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isStudentLoggedIn) {
    return (
      <Navigate
        to="/student/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // =====================================================
  // STUDENT AUTHENTICATED
  // =====================================================

  return <Outlet />;
};

export default StudentProtectedRoute;
