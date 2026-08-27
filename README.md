# Task Manager

A full-stack task management application built with React, Node.js, Express, and MongoDB.

This project demonstrates full-stack development through a RESTful API, JWT authentication, protected resources, password reset functionality, session management, and a responsive React interface.

##  Live Demo

Coming soon.

##  About the Project

Task Manager is a full-stack CRUD application that allows authenticated users to manage their personal tasks.

Users can create, view, update, complete, and delete tasks through a React frontend connected to a Node.js and Express backend.

The project was developed as a portfolio application to demonstrate practical full-stack development, including authentication, authorization, API communication, database interaction, error handling, and frontend state management.

##  Features

###  Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Persistent authentication state
- Logout functionality
- Automatic logout after inactivity
- Session expiration handling
- Password reset functionality
- Password reset via email
- Secure password reset tokens

###  Task Management

- Create tasks
- View personal tasks
- Update task titles
- Mark tasks as complete/incomplete
- Delete tasks
- Delete confirmation modal
- User-specific tasks

###  User Experience

- Responsive interface
- Loading states
- Empty states
- Error handling
- Retry functionality
- Toast notifications
- Form feedback
- Clean component-based React architecture

##  Tech Stack

### Frontend

- React
- React Router
- Vite
- Tailwind CSS
- Axios
- React Toastify

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Nodemailer

### Development & Tools

- Git
- GitHub
- REST API
- Environment variables

##  Application Architecture

The application follows a client-server architecture.

```text
React Frontend
      │
      │ HTTP / REST API
      ▼
Express / Node.js Backend
      │
      ├── Routes
      ├── Controllers
      ├── Middleware
      └── Authentication
      │
      ▼
MongoDB Database
```

##  Project Structure

```text
task-manager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

##  Authentication Flow

The application uses JWT-based authentication to protect user resources.

1. User registers an account.
2. User logs in with their credentials.
3. The backend validates the credentials.
4. A JWT is generated.
5. The frontend stores the authentication state.
6. Protected API requests include the JWT.
7. The backend verifies the token before allowing access to protected resources.
8. Expired or invalid authentication results in the user being redirected to the login page.

##  Password Reset Flow

The application includes a password recovery workflow.

1. The user selects Forgot Password.
2. They enter their email address.
3. The backend generates a secure password reset token.
4. A password reset email is sent.
5. The user follows the reset link.
6. The token is validated.
7. The user creates a new password.
8. The password is securely updated.

##  Session Management

The frontend includes inactivity detection.

If an authenticated user remains inactive for the configured period, the application:

- Clears the authentication token
- Clears stored user information
- Marks the session as expired
- Redirects the user to the login page

The application also handles `401 Unauthorized` responses through an Axios response interceptor.

##  API Communication

The frontend communicates with the backend through Axios.

An Axios request interceptor automatically attaches the JWT to authenticated requests:

```text
Authorization: Bearer <token>
```

The backend authentication middleware verifies the token before allowing access to protected resources.

##  Environment Variables

Sensitive environment variables are excluded from Git.

Create the required environment files locally using the provided `.env.example` files.

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

Do not commit real credentials, API keys, database connection strings, email passwords, or other secrets to GitHub.

##  Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd task-manager
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the backend

Create a `.env` file inside the `backend` directory using:

```text
backend/.env.example
```

Add your MongoDB connection string, JWT secret, and email configuration.

### 4. Start the backend

```bash
npm run dev
```

The backend normally runs on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Configure the frontend

Create:

```text
frontend/.env
```

using:

```text
frontend/.env.example
```

### 7. Start the frontend

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

##  Error & Loading Handling

The application includes several user-facing states to improve reliability and usability.

- Loading indicators
- Empty task states
- API error handling
- Retry functionality
- Authentication error handling
- Session expiration messages
- Success notifications
- Delete confirmation

##  Future Improvements

Planned improvements include:

- Task filtering and search
- Task categories
- Task priorities
- Due dates
- Task reminders
- User profile management
- Dashboard analytics
- Automated testing
- CI/CD pipeline
- Production deployment
- Improved accessibility
- More advanced task organisation

##  What This Project Demonstrates

This project demonstrates practical experience with:

- Full-stack JavaScript development
- React application architecture
- Component-based development
- React Context
- Custom React hooks
- React Router
- RESTful API development
- CRUD operations
- JWT authentication
- Authorization
- Protected routes
- Password reset workflows
- MongoDB and Mongoose
- Axios interceptors
- Express middleware
- Error handling
- Loading and empty states
- Environment configuration
- Git and GitHub workflow

## 👨‍💻 Author

**Olufemi**

Full-stack development portfolio project.

---

⭐ More projects coming soon, including an AI-powered Bible Study Manager.
