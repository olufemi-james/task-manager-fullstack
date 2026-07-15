import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Link } from "react-router-dom";

function  Login() {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = {
        email,
        password
      };
  
      const response = await authService.login(userData);

      localStorage.setItem("token", response.token);
      navigate("/dashboard");
      
      console.log("saved token:", localStorage.getItem("token"))
  
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="Password" 
            value= {password}
            onChange= {(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

          <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
         </p>

        </div>
      
    );
}

export default Login;