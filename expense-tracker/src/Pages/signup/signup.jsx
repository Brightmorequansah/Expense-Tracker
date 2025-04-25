import { auth, googleProvider } from "../../config/firebase-config";
import { createUserWithEmailAndPassword,  signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/signup.module.css";
import errorstyle from "../../styles/error-message.module.css";
import { GrMoney } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handling user signup
  const signUpWithEmail = async (e) => {
    e.preventDefault();

    // Checking if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return; // Exit the function to prevent submission
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to login page after successful signup
    } catch (err) {
      console.error("Error during sign up", err);
      setError("Failed to create account. Please try again.");
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
        profilePhoto: googleResults.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
      alert("Successfully logged in");
    } catch (err) {
      console.error("Error during sign in", err);
    }
  };

  return (
    <div className={styles["signup-page"]}>
      <div className={styles["container"]}>
      <GrMoney className={styles["logo"]} />
        <h1 className={styles["main-text-left"]}>Let's Get  <span className={styles["highlighted-text"]}>Started!</span></h1>

        <div className={styles["signup-card"]}>
        <div className={styles["create-account-text"]}>Create Your Account</div>
        {error && <p className={errorstyle["error-message"]}>{error}</p>}
          <form className={styles["email-sign-up"]} onSubmit={signUpWithEmail}>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input-field"]}
                type="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input-field"]}
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input-field"]}
                type="password"
                placeholder="Confirm Password..."
                onChange={(e) => setConfirmPassword(e.target.value)} // Updating confirm password
                required
              />
            </div>
            <button className={styles["signup-btn"]} type="submit">
              Sign Up
            </button>
          </form>
          {/* Link to login page */}
          <div className={styles["log-in-link"]}>
            <h5>
              Already have an account?{" "}
              <Link to="/" className={styles["login-link"]}> 
                Login
              </Link>
            </h5>
          </div>
          <div className={styles["google-sign-in"]}>
              <button
                className={styles["google-btn"]}
                onClick={signInWithGoogle}
              >
                <FcGoogle className={styles["google-icon"]} />
                Continue with Google
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
};
