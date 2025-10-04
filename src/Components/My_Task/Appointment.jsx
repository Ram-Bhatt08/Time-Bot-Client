import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import "./Appointment.css";

function Appointment() {
  const [appointments, setAppointments] = useState({ current: [], previous: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const clientId = localStorage.getItem("clientId");
        if (!clientId) {
          console.error("Client ID not found");
          setLoading(false);
          return;
        }

        const searchParams = new URLSearchParams(location.search);
        const adminId = searchParams.get("adminId");

        let url = `http://localhost:5000/api/appointments/byClient?clientId=${clientId}`;
        if (adminId) url += `&adminId=${adminId}`;

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          const allAppointments = data.appointments || data;
          const current = allAppointments.filter(
            (a) => a.status === "Upcoming" || a.status === "Pending"
          );
          const previous = allAppointments.filter(
            (a) => a.status === "Completed" || a.status === "Cancelled"
          );
          setAppointments({ current, previous });
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [location.search]);

  const formatDateTime = (startTime, endTime) => {
    if (!startTime) return { date: "-", time: "-" };
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;
    const date = start.toLocaleDateString();
    const time = end
      ? `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  };

  const handleViewDetails = (app) => {
    const { date, time } = formatDateTime(app.startTime, app.endTime);
    alert(
      `📋 Appointment Details:\n` +
        `Client: ${app.user?.name || "-"}\n` +
        `Admin: ${app.admin?.name || "N/A"}\n` +
        `Specialty: ${app.admin?.specialty || "N/A"}\n` +
        `Date: ${date}\n` +
        `Time: ${time}\n` +
        `Status: ${app.status}\n` +
        `Purpose: ${app.purpose || "-"}\n` +
        `Payment ID: ${app.paymentId || "-"}\n` +
        `Appointment ID: ${app.appointmentId || app._id}` // show generated appointmentId
    );
  };

  const handleBookAgain = (app) => {
    navigate(`/bot?adminId=${app.admin?.adminId}`);
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="appointments-page">
          <h2>My Appointments</h2>
          <p>⏳ Loading appointments...</p>
        </div>
      </>
    );
  }

  const renderAppointments = (list, type) =>
    list.length ? (
      <div className="appointments-grid">
        {list.map((app) => {
          const { date, time } = formatDateTime(app.startTime, app.endTime);
          return (
            <div className={`appointment-card ${type}`} key={app._id}>
              <div className="card-header">
                <h4>{app.admin?.name || "N/A"}</h4>
                <p>{app.admin?.specialty || "N/A"}</p>
                <span className={`status-badge status-${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
              <div className="appointment-details">
                <p>📅 {date}</p>
                <p>⏰ {time}</p>
                <p>🆔 {app.appointmentId || app._id}</p> {/* show appointmentId */}
              </div>
              <div className="appointment-actions">
                <button onClick={() => handleViewDetails(app)}>View Details</button>
                {type === "previous" && <button onClick={() => handleBookAgain(app)}>Book Again</button>}
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p>{type === "current" ? "No current appointments. Schedule one now!" : "No previous appointments yet."}</p>
    );

  return (
    <>
      <Nav />
      <div className="appointments-page">
        <h2>My Appointments</h2>

        <section className="appointments-section">
          <h3>
            Current Appointments <span>({appointments.current.length})</span>
          </h3>
          {renderAppointments(appointments.current, "current")}
        </section>

        <section className="appointments-section">
          <h3>
            Previous Appointments <span>({appointments.previous.length})</span>
          </h3>
          {renderAppointments(appointments.previous, "previous")}
        </section>
      </div>
    </>
  );
}

export default Appointment;
