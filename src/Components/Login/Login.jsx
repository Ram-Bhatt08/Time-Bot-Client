import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api/auth";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      setIsLoading(false);
      return;
    }

    const url = isSignup ? `${API_BASE}/signup` : `${API_BASE}/login`;
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
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "❌ Something went wrong");
        setIsLoading(false);
        return;
      }

      // Save user info including clientId
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("clientId", data.user.clientId);
      localStorage.setItem("token", data.token);

      alert(isSignup ? "🎉 Signup successful!" : "✅ Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login/Signup error:", error);
      alert("❌ An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Logging in with ${provider}...`);
    navigate("/home");
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
            placeholder="Email"
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
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
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

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
