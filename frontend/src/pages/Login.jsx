import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function  Login() {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  useEffect(() => {
    if (localStorage.getItem("sessionExpired")) {

        toast.info("Your session has expired. Please log in again.");

        localStorage.removeItem("sessionExpired");
    }
}, []);


  const inputStyle = "w-full p-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password
      };
                await login(userData);

          toast.success("Login successful!");

          navigate("/dashboard");

    } catch (error) {
      toast.error(
          error.response?.data?.message || "Login failed"
      );
    }
  }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Olufemi Task Manager
          </h1>
          <p className="text-center text-slate-500 mb-8">
              Welcome back! Sign in to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <input className={`${inputStyle}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input className={`${inputStyle}`}
            type="password"
            placeholder="Password"
            value= {password}
            onChange= {(e) => setPassword(e.target.value)}
            />

        <p className="mb-3 text-center text-sm text-gray-600">
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
            Reset password
          </Link>
          </p>



            <button className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              font-semibold
              hover:bg-blue-700
              transition
              cursor-pointer
              "
            type="submit">
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
             Don't have an account?{" "}
            <Link
              to="/register"
            className="text-blue-600 font-medium hover:underline"
            >
            Register
          </Link>
        </p>
         </div>
        </div>

    );
}

export default Login;