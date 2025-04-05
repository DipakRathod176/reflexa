import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Sidebar from "./components/Sidebar";
import Assignment from "./Assignments";

/* Teacher Components */
import Dashboard from "./Dashboard";
import AssignmentSubmission from "./SubmissionAssignment";
import AllSubmissions from "./Submissions";
import { useAppContext } from "./context/AppContext";

function AppContent() {
  const { loggedin } = useAppContext();
  const location = useLocation();

  // Define routes where Sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/registration"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar && <Sidebar />}

      <Routes>
        {/* 🌟 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* 🔐 Protected Routes */}
        {loggedin ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignment />} />
            <Route path="/assignments/submission/:assignmentId" element={<AssignmentSubmission />} />
            <Route path="/assignments/get-all-submissions/:assignmentId" element={<AllSubmissions />} />
          </>
        ) : (
          // 🔁 Redirect any protected route to /login if not logged in
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
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
