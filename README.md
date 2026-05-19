# Team Task Manager

A full-stack web application built to manage projects, assign tasks, and track team progress with role-based access control.

## Live Application

Frontend:
https://artistic-clarity-production-4e8a.up.railway.app

Backend:
https://team-task-manager-production-f268.up.railway.app

## GitHub Repository

https://github.com/JahnaviLakshmi31/team-task-manager

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Role-Based Access

* Admin and Member roles
* Admin can manage projects and tasks
* Members can view and update assigned tasks

### Project Management

* Create Projects
* Add Team Members
* Manage Project Details

### Task Management

* Create Tasks
* Assign Tasks to Members
* Update Task Status
* Track Task Progress

### Dashboard

* Task Overview
* Status Tracking
* Overdue Task Monitoring

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Deployment

* Railway

---

## Test Credentials

### Admin Login

Email: [admin@gmail.com]
Password: 456789

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/JahnaviLakshmi31/team-task-manager.git
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

### Backend Environment Variables

Create a `.env` file inside the server folder:

```env
MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=
JWT_SECRET=
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Frontend Environment Variables

Create a `.env` file inside the client folder:

```env
VITE_API_URL=
```

---

## Project Structure

```text
team_task_manager/
│
├── client/
├── server/
├── README.md
├── README.txt
```

---

## Notes

* The application is fully deployed on Railway.
* Authentication and protected routes are implemented using JWT.
* Role-based access control is implemented for Admin and Member users.
* MySQL database is connected using Railway MySQL service.
