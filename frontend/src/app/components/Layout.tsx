import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { FloatingHelp } from "./FloatingHelp";

export function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <FloatingHelp />
    </div>
  );
}