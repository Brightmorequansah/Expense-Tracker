import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Login } from "./Pages/login/login";
import { ExpenseTracker } from "./Pages/expense/expense-tracker";
import { SignUp } from "./Pages/signup/signup";
import { Dashboard } from "./Pages/Dashboard/dashboard";
import { Sidebar } from "./components/sidebar";

import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { useNavigate } from "react-router-dom";
import headerStyles from "./styles/header.module.css";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Check if the current path is login or signup
  const showSidebar =
    location.pathname !== "/" && location.pathname !== "/signup";
  const showHeader =
    location.pathname !== "/" && location.pathname !== "/signup";

  const navigate = useNavigate();
  const { email, profilePhoto } = useGetUserInfo();

  // Handle logout
  const userLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setTimeout(() => {
        alert("Successfully logged out");
      }, 500);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="app-layout">
        {/* Show Sidebar only when it's needed */}
        {showSidebar && <Sidebar />}

        <div
          className={
            showSidebar ? "main-content-with-sidebar" : "main-content-full"
          }
        >
          {/* Show Header only when it's needed */}
          {showHeader && (
            <div className={headerStyles["header-container"]}>
              <div className={headerStyles["header-content"]}>
                <h5 className={headerStyles["header-email"]}>{email}</h5>
                <div className={headerStyles["profile-and-logout-container"]}>
                  {profilePhoto && (
                    <div className={headerStyles["profile"]}>
                      <img
                        className={headerStyles["profile-photo"]}
                        src={profilePhoto}
                        alt="Profile"
                      />
                    </div>
                  )}
                  <button
                    onClick={userLogOut}
                    className={headerStyles["logout-btn"]}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
