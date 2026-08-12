import {Outlet} from "react-router-dom";

const StudentLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}>
      <div
        style={{
          padding: "20px",
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
