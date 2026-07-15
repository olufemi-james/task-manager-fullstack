import { useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
      navigate("/dashboard");

      console.log("Saved token:", localStorage.getItem("token"));
      console.log(response);

     } catch(error) {
        console.log(error);
    };

  }
return(
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input 
              type= "text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input 
              type= "email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Register</button>
                
           
        </form>
        <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
        </p>
    </div>

    );
}

export default Register;