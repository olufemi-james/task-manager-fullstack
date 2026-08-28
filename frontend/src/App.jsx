import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route path="/register" element={<Register />} />

  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route
    path="/reset-password/:token"
    element={<ResetPassword />}
  />
</Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;