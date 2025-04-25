import { auth, googleProvider } from "../../config/firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "../../styles/login.module.css";
import { FiUser } from "react-icons/fi";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import errorstyle from "../../styles/error-message.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const isLoggedIn = useGetUserInfo();

  // Check authentication state and log user email
  useEffect(() => {
    const onListen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        console.log(`User logged in: ${user.email}`);
      } else {
        console.log("No user logged in");
      }
    });

    // Clean up listener on component unmount
    return () => onListen();
  }, []);

  // Handle user login with email
  const logInWithEmail = async (e) => {
    e.preventDefault();
    try {
      const emailResults = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(emailResults);

      const emailAuthInfo = {
        userID: emailResults.user.uid,
        name: emailResults.user.displayName,
        email: emailResults.user.email,
        profilePhoto: emailResults.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(emailAuthInfo));
      navigate("/expense-tracker");
      setTimeout(() => {
        alert("Successfully logged in");
      }, 500);
    } catch (err) {
      console.error("Login error", err);
      setError(
        "The email or password you entered doesn't match our records. Please double-check and try again."
      ); // Set error message
    }
  };

  // Handle user login with Google
  const signInWithGoogle = async () => {
    try {
      const googleResults = await signInWithPopup(auth, googleProvider);
      console.log(googleResults);

      // Log the user's email directly from googleResults
      const userEmail = googleResults.user.email;
      console.log(`Google sign-in user: ${userEmail}`);

      // Optionally set the user's email in your state
      setCurrentUserEmail(userEmail);

      const authInfo = {
        userID: googleResults.user.uid,
        name: googleResults.user.displayName,
        email: googleResults.user.email,
        profilePhoto: googleResults.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");

      setTimeout(() => {
        alert("Successfully logged in");
      }, 500);
    } catch (err) {
      console.error("Error during sign in", err);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["container"]}>
        <GrMoney className={styles["logo"]} />
        <h1 className={styles["main-text-left"]}>
          Track Your Expenses{" "}
          <span className={styles["highlighted-text"]}>Smoothly...</span>
        </h1>

        <div className={styles["login-card"]}>
          <div className={styles["login-text"]}>Login</div>
          {error && <p className={errorstyle["error-message"]}>{error}</p>}
          {/* Email login*/}
          <form className={styles["email-sign-in"]} onSubmit={logInWithEmail}>
            {/* Form to handle submission */}
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input-field"]}
                type="email"
                placeholder="Email..."
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FiUser className={styles["input-icon"]} />
            </div>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input-field"]}
                type="password"
                placeholder="Password..."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaUnlockKeyhole className={styles["input-icon"]} />
            </div>
            <button className={styles["login-btn"]} type="submit">
              Log In
            </button>
          </form>
           {/* Link to Sign up page */}
           <div className={styles["sign-up-link"]}>
            <h5>
              Don't have an account?{" "}
              <Link to="/signup" className={styles["signup-link"]}> 
                Sign up
              </Link>
            </h5>
          </div>
          {/* Google sign in */}
          <div className={styles["google-sign-in"]}>
            <button className={styles["google-btn"]} onClick={signInWithGoogle}>
              <FcGoogle className={styles["google-icon"]} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
