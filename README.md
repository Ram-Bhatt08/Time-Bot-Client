# Time-Bot - Frontend

**Time-Bot** is a modern AI-powered appointment scheduling platform that allows clients to book, cancel, and reschedule appointments with admins (VIPs), interact with an AI assistant, and manage their profile. This frontend is built using **React** and **Vite**.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)  
- [Components Overview](#components-overview)  
- [Technologies Used](#technologies-used)  
- [Future Enhancements](#future-enhancements)  

---

## Features

### Client Features:
- Book appointments with admins (VIPs)  
- View and manage current and previous appointments  
- Interact with AI Chat Assistant for booking, cancellation, or rescheduling  
- Pay fees and receive admin IDs after payment  
- Search for VIPs by name or specialty  

### AI Chat Assistant:
- Conversational interface to guide clients  
- Book, cancel, or reschedule appointments  
- Check VIP availability  
- Supports multiple AI providers (Claude & OpenAI)  

### Profile Management:
- View personal and account information  
- Edit profile including avatar, phone number, and address  

### Navigation:
- Responsive navigation bar for quick access  
- Logout with confirmation modal  

---

## Project Structure

Time-Bot-Frontend/
├── public/
│ └── vite.svg
├── src/
│ ├── assets/
│ │ └── react.svg
│ ├── components/
│ │ ├── LBot/
│ │ │ └── Bot.jsx └── Bot.css
│ │ ├── Login/
│ │ │ └── Login.jsx └── Login.css
│ │ ├── Navbar/
│ │ │ └── Navbar.jsx
│ │ └── ... (other components like Home, Client, Appointment, Profile)
│ ├── App.jsx
│ └── main.jsx
├── .eslintrc.cjs
├── index.html
├── package.json
└── vite.config.js



- **components/**: Contains all reusable UI components.  
- **assets/**: Images and static assets.  
- **App.jsx**: Main React component containing routes.  
- **main.jsx**: Entry point of the application.  

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Time-Bot-Frontend

Install dependencies:

npm install

Running the Project
npm run dev


The app will run at http://localhost:5173 (default Vite port).

Make sure the backend server is running at http://localhost:5000.

Components Overview

Home.jsx: Landing page with feature highlights and CTA for AI assistant.

Login.jsx: Login and signup forms with social login buttons.

Bot.jsx: AI Chat Assistant interface for interacting with the system.

Client.jsx: VIP selection and payment interface.

Appointment.jsx: Displays current and previous appointments for the client.

Profile.jsx: Profile management page with editable fields.

Navbar.jsx: Navigation bar with active route highlighting and logout modal.

Technologies Used

Frontend: React, Vite, JavaScript, CSS

State Management: React Hooks (useState, useEffect)

Routing: React Router v6

HTTP Requests: Axios / Fetch API

Storage: localStorage for persisting chat and user data

Future Enhancements

Dark mode support

Notification system for upcoming appointments

AI assistant memory across sessions

Enhanced mobile responsiveness

Integration with payment gateways for real transactions

License

This project is open-source and free to use.

Author: Ram Bhatt
Date: 2025
