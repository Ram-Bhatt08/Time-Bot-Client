Time-Bot - Frontend

This repository contains the frontend code for Time-Bot, an AI-powered appointment scheduling platform that allows clients to book, cancel, and reschedule appointments with admins (VIPs), interact with an AI assistant, and manage their profile. Built using React and Vite, Time-Bot offers a seamless and intuitive user experience.

🚀 Features

Client Features:

Book appointments with admins (VIPs)

View and manage current and previous appointments

Interact with AI Chat Assistant for booking, cancellation, or rescheduling

Pay fees and receive admin IDs after payment

Search for VIPs by name or specialty

AI Chat Assistant:

Conversational interface to guide clients

Book, cancel, or reschedule appointments

Check VIP availability

Supports multiple AI providers (Claude & OpenAI)

Profile Management:

View personal and account information

Edit profile including avatar, phone number, and address

Navigation:

Responsive navigation bar for quick access

Logout with confirmation modal

🛠️ Technologies Used

Frontend: React

Build Tool: Vite

Styling: CSS

State Management: React Hooks (useState, useEffect)

Routing: React Router v6

HTTP Requests: Axios / Fetch API

Storage: localStorage for persisting chat and user data

⚙️ Getting Started
Prerequisites

Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

npm or yarn

Installation

git clone https://github.com/Ram-Bhatt08/Time-Bot-Client.git
cd Time-Bot-Client
npm install

Run the Project

npm run dev

The application will run at http://localhost:5173.

Make sure the backend server is running at http://localhost:5000

🔗 Backend

This is the frontend repository. The full functionality requires the corresponding backend.

Make sure to set up the backend and configure the API endpoint in the frontend for proper functionality.

📂 Project Structure

Time-Bot-Frontend/ <br>
├── public/ <br>
│   └── vite.svg <br>
├── src/ <br>
│   ├── assets/ <br>
│   │   └── react.svg <br>
│   ├── components/ <br>
│   │   ├── Bot/ <br>
│   │   │   └── Bot.jsx, Bot.css <br>
│   │   ├── Client/ <br>
│   │   │   └── Client.jsx, Client.css <br>
│   │   ├── Home/ <br>
│   │   │   └── Home.jsx <br>
│   │   ├── Loading/<br>
│   │   │   └── Loading.jsx <br>
│   │   ├── Login/ <br>
│   │   │   └── Login.jsx, Login.css <br>
│   │   ├── My_Task/ <br>
│   │   │   └── My_Task.jsx <br>
│   │   ├── Nav/ <br>
│   │   │   └── Nav.jsx, Nav.css <br>
│   │   ├── Profile/ <br>
│   │   │   └── Profile.jsx <br>
│   │   └── ... (other components) <br>
│   ├── App.jsx <br>
│   └── main.jsx <br>
├── .eslintrc.cjs <br>
├── index.html <br>
├── package.json <br>
└── vite.config.js <br>

🎮 How It Works

Client Login: Users log in or register to access the platform.

Book Appointment: Users select VIPs and book appointments.

Interact with AI Assistant: Users can chat with the AI to book, cancel, or reschedule appointments.

Payment & ID: Users pay fees and receive admin IDs after successful payment.

Profile Management: Users can view and edit their profile and manage appointments.

📝 Future Enhancements

Dark mode support

Notification system for upcoming appointments

AI assistant memory across sessions

Enhanced mobile responsiveness

Integration with real payment gateways

Contributing

We welcome contributions! Please follow these steps:

Fork the repository

Create your feature branch: git checkout -b feature/AmazingFeature

Commit your changes: git commit -m 'Add some AmazingFeature'

Push to the branch: git push origin feature/AmazingFeature

Open a Pull Request

👨‍💻 Author

Ram Bhatt
📧 Email:the.ram.bhatt@gmail.com

🔗 Portfolio:https://the-ram-bhatt.vercel.app/

💼 LinkedIn:https://www.linkedin.com/in/ram-bhatt08/

🐙 Project Link:https://time-bot-client.vercel.app/
