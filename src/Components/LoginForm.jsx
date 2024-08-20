import  { useState } from "react";
import "../Styles/LoginForm.css"
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import image1 from '../Images/Google.png';


function LoginForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/LoginPage');
  };
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);
    
  };

  return (
    <div className="account-form1">
      <Navbar/>
      <div className="account-form">
      {step === 1 && (
        <div className="step-one">
          <h2>Create an account</h2>
          <button onClick={() => setStep(2)}>
            Continue with Email
          </button>
          <button className="Google"> <img src={image1} alt="" />
             Continue with Google
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="step-two">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit"  onClick={handleLoginPage}>Continue</button>
          </form>
          <div className="or-container">
            <div className="line"></div>
            <div className="or-text">or</div>
            <div className="line"></div>
        </div>
          <button className="Google"> <img src={image1} alt="" />
             Continue with Google
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginForm;
