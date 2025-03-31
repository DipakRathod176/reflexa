import React from "react";
import { useNavigate } from "react-router-dom";


export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <div className="overlay"></div> {/* Dark overlay for better contrast */}
      <div className="content">
        <h1>Welcome to the Learning Portal</h1>
        <p className="subtitle">Choose your role to continue</p>
        <div className="role-buttons">
          <button onClick={() => navigate("/teacher-login")} className="teacher-btn">
            👨‍🏫 Login as Teacher
          </button>
          <button onClick={() => navigate("/student-login")} className="student-btn">
            🎓 Login as Student
          </button>
        </div>
      </div>
    </div>
  );
}
