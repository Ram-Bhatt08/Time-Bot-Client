import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Nav.css";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Clear user session data (if any)
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Navigate to login page
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="nav">
        <h2>Appointment Scheduler</h2>

        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <button 
            onClick={() => handleNavigation("/home")}
            className={isActive("/home") ? "active" : ""}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation("/bot")}
            className={isActive("/bot") ? "active" : ""}
          >
            AI Bot
          </button>
          <button 
            onClick={() => handleNavigation("/appointment")}
            className={isActive("/appointment") ? "active" : ""}
          >
            Appointment
          </button>
          <button 
            onClick={() => handleNavigation("/client")}
            className={isActive("/client") ? "active" : ""}
          >
            Client
          </button>
          <button 
            onClick={() => handleNavigation("/profile")}
            className={isActive("/profile") ? "active" : ""}
          >
            Profile
          </button>
          <button 
            onClick={handleLogoutClick}
            className="logout-btn"
          >
            Logout
          </button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={handleLogoutCancel}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleLogoutConfirm}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
