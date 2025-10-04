import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Use your deployed backend
  const API_BASE = "https://time-bot-backend-2.onrender.com/api";

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setFormData(data.user);
        } else {
          alert(data.message || "❌ Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        alert("⚠️ Error fetching profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsEditing(false);
        alert("✅ Profile updated successfully!");
      } else {
        alert(data.message || "❌ Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("⚠️ Error updating profile. Please try again later.");
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="profile-page">
          <p className="loading-text">⏳ Loading profile...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Nav />
        <div className="profile-page">
          <p className="error-text">⚠️ Unable to load user profile. Please log in again.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="profile-page">
        <div className="profile-header-section">
          <div className="profile-avatar">
            {formData.avatar ? (
              <img src={formData.avatar} alt="avatar" className="avatar-img" />
            ) : (
              <div className="avatar-initials">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            {isEditing && (
              <>
                <label htmlFor="avatar-upload" className="avatar-upload-btn">
                  📷
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file)
                      setFormData({
                        ...formData,
                        avatar: URL.createObjectURL(file),
                      });
                  }}
                />
              </>
            )}
          </div>

          <div className="profile-header-info">
            <h1>{formData.name}</h1>
            <p className="profile-role">{user.role}</p>
            <p className="profile-email">{user.email}</p>
            <p className="profile-id">Client ID: {user.clientId}</p>
          </div>

          <div className="profile-header-actions">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>
                  💾 Save
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  ❌ Cancel
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={handleEditToggle}>
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-card">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>

              <div className="info-item">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label>Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p>{user.address || "-"}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2>Account Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <label>Client ID</label>
                <p>{user.clientId}</p>
              </div>
              <div className="info-item">
                <label>Role</label>
                <p>{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
