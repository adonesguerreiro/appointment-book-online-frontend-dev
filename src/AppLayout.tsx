import { Outlet } from "react-router-dom";
import  Sidebar from "./shared/components/Sidebar";

export function AppLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
