import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Deployed backend base URL
  const API_BASE = "https://time-bot-backend-2.onrender.com/api/auth";

  // 🚀 If user already logged in, redirect to home
  useEffect(() => {
    const existingUser = localStorage.getItem("currentUser");
    if (existingUser) navigate("/home");
  }, [navigate]);

  // ✍️ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧠 Handle login/signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const endpoint = isSignup ? "/signup" : "/login";
    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "❌ Invalid credentials or server error.");
        return;
      }

      // ✅ Save user info in localStorage
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("clientId", data.user.clientId);
      localStorage.setItem("token", data.token);

      alert(isSignup ? "🎉 Signup successful!" : "✅ Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Auth Error:", error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🧩 Mock social login
  const handleSocialLogin = (provider) => {
    alert(`🔗 Social login with ${provider} coming soon!`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {isSignup && (
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "⏳ Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-buttons">
            <button type="button" onClick={() => handleSocialLogin("Google")}>
              🔍 Google
            </button>
            <button type="button" onClick={() => handleSocialLogin("Facebook")}>
              📘 Facebook
            </button>
          </div>
        </div>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
