import { useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const inputStyle = "w-full p-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"

 const navigate = useNavigate();

 const handleSubmit = async (e) => {
     e.preventDefault();

     try {
        const userData =  {
            name,
            email,
            password
        };

      const response = await authService.register(userData);

      localStorage.setItem("token", response.token);

      toast.success("Account created successfully!");

      navigate("/dashboard");

      console.log("Saved token:", localStorage.getItem("token"));
      console.log(response);

     } catch(error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
       );
    };

  }
return(
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Olufemi Task Manager
        </h1>
        <p className="text-center text-slate-500 mb-8">
              Welcome! Register to continue.
          </p>
        <form onSubmit={handleSubmit}>
            <input className={`${inputStyle}`}
              type= "text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input className={`${inputStyle}`}
              type= "email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input className={`${inputStyle}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

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
               type="submit">Register
              </button>


        </form>
        <p className="text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
            >
              Login
          </Link>
        </p>
        </div>
    </div>

    );
}

export default Register;