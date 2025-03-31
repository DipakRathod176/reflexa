import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import Login from "./Login";
import Registration from "./Registration";
import Sidebar from "./components/Sidebar";
import Assignment from "./Assignments"
/* Teacher Components */
import Dashboard from "./Dashboard";
import AssignmentSubmission from "./SubmissionAssignment";

function AppContent() {
  const location = useLocation(); // Get the current route
  
  // Define routes where Sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/registration"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar && <Sidebar />} {/* Conditionally show Sidebar */}
      <Routes>
        {/* 🌟 Public Routes */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* 🎓 Teacher Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/assignments/submission/:assignmentId" element={<AssignmentSubmission />} />
        
        {/* 📚 Student Routes (Add later if needed) */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
