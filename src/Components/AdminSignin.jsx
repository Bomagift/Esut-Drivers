import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import image1 from '../Images/Google.png';

function AdminSignin() {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const navigate = useNavigate();
  
    const handleAdmin = () => {
      navigate('/Adminpage');
    };
  
    const handleLoginAuth = () => {
      navigate('/LoginAuth');
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!formData.username || !formData.email || !formData.password) {
        alert("Please fill out all required fields before continuing.");
        return;
      }
  
      
      localStorage.setItem('LoggedInUser', formData.username);
  
      console.log("User Data Submitted:", formData);
      handleAdmin();
    };
  
return (  
    <div className="step2">
        <Navbar/>

    <div className="account-form">
    <h2>Creating an account as Admin</h2>
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
      <button type="submit">
        Continue
      </button>
    </form>
    <div className="or-container">
      <div className="line"></div>
      <div className="or-text">or</div>
      <div className="line"></div>
    </div>
    <button className="Google">
      <img src={image1} alt="" />
      Continue with Google
    </button>
    <p>
      Already have an account? <a href="#" onClick={handleLoginAuth}>Login</a>
    </p>
    </div>
    </div>
  
)

}

export default AdminSignin