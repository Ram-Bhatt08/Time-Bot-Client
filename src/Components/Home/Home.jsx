import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Book Appointment",
      desc: "Schedule your appointments quickly and easily with our AI assistant.",
      icon: "📅",
      color: "#4CAF50",
    },
    {
      title: "Track Schedule",
      desc: "Keep track of your upcoming and previous appointments in one place.",
      icon: "📊",
      color: "#2196F3",
    },
    {
      title: "AI Assistant Help",
      desc: "Get instant help, reminders, and suggestions from the AI assistant.",
      icon: "🤖",
      color: "#9C27B0",
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Mock upcoming appointments and reminders
  const upcomingAppointments = [
    { date: "Today", time: "2:30 PM", doctor: "Dr. Smith", specialty: "Cardiology Consultation" },
    { date: "Tomorrow", time: "11:00 AM", doctor: "Dr. Johnson", specialty: "Dermatology Consultation" },
  ];

  const reminders = [
    { icon: "⏰", title: "Reminder", message: "Annual check-up tomorrow" },
  ];

  return (
    <>
      <Nav />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand">Appointment Scheduler</span>
            </h1>
            <p className="hero-desc">
              Book, track, and manage your appointments easily with the help of our AI Assistant.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => navigate("/client")}>
                Book VIP Appointment
              </button>
              <button className="secondary-btn" onClick={() => navigate("/appointment")}>
                View My Appointments
              </button>
              <button className="secondary-btn" onClick={() => navigate("/bot")}>
                Chat with AI Assistant
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="ai-bot" onClick={() => navigate("/bot")}>
              <div className="bot-icon">🤖</div>
              <div className="bot-message">
                <p>Hi! Click here to schedule or check your appointments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose Our Platform</h2>
          <div className="features-container">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === currentFeature ? 'active' : ''}`}
                style={{ '--accent-color': feature.color }}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <button className="btn-try" onClick={() => navigate("/bot")}>
                  Try Now →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Appointments Scheduled</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>User Satisfaction</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>AI Assistant Available</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who are managing their appointments efficiently</p>
          <button className="primary-btn large" onClick={() => navigate("/bot")}>
            Get Started with AI Assistant
          </button>
        </section>
      </div>
    </>
  );
}

export default Home;
