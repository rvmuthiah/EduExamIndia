import {Outlet} from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
const AdminLayout = () => {
  return (
    <div style={{display: "flex", height: "100vh"}}>
      <AdminSidebar />

      <div style={{flex: 1}}>
        <AdminHeader />

        <div style={{padding: "20px"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
