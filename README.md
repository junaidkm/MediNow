# MediNow — Professional 21-Day MERN Telehealth Roadmap

MediNow is a full-stack, enterprise-grade Telehealth and Patient Care Platform architected on the MERN stack (MongoDB, Express, React, Node.js).

---

## 📅 DAY 1 — Project Foundation (Completed)

### Deliverables & Architecture Overview
- **`client/`**: Modern React 18 application scaffolded with Vite, React Router, Axios, and high-performance glassmorphic UI.
- **`server/`**: Robust Node.js + Express 5 server structured following clean MVC principles:
  - `config/`: MongoDB connection management with graceful status reporting.
  - `controllers/`: Health monitoring and authentication logic.
  - `models/`: Mongoose schemas (User model with bcrypt password hashing).
  - `routes/`: Modular endpoints (`/api/health`, `/api/auth`).
  - `middleware/`: Centralized error handling (`notFound`, `errorHandler`) and JWT protection (`protect`).
- **Full-Stack Connectivity**: `/api/health` diagnostic endpoint reporting uptime, server environment, and MongoDB connection state.
- **Client Pages**:
  - `Home`: Overview, live 3-tier architecture diagnostics widget, roadmap tracker.
  - `Login`: Clinic and patient sign-in portal with 1-click demo credential autofill.
  - `Register`: Patient and Practitioner onboarding with role toggle.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **MongoDB Atlas** connection string or local MongoDB instance

### 2. Configure Environment Variables
Inside `server/.env`:
```env
PORT=5000
NODE_ENV=development
# Replace with your MongoDB Atlas connection string:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medinow?retryWrites=true&w=majority
JWT_SECRET=medinow_super_secret_jwt_key_2026_dev_environment
CLIENT_URL=http://localhost:5173
```

### 3. Run the Full Stack Application
From the project root:
```bash
# Run both Backend & Frontend simultaneously:
npm run dev

# Or run separately:
npm run server   # Starts Express backend on http://localhost:5000
npm run client   # Starts Vite frontend on http://localhost:5173
```

---

## 🔍 Verification Endpoints
- **Frontend App**: `http://localhost:5173`
- **Backend Health Check**: `http://localhost:5000/api/health`
- **Auth Routes**:
  - `POST http://localhost:5000/api/auth/register`
  - `POST http://localhost:5000/api/auth/login`
  - `GET http://localhost:5000/api/auth/me`