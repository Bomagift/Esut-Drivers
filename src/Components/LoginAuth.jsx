import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import image1 from '../Images/Google.png';

function LoginAuth() {
    const [formData, setFormData] = useState({
        username: "",
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

    
        if (!formData.username || !formData.password) {
            alert("Please fill out all required fields before continuing.");
            return;
        }

        console.log("User Data Submitted:", formData);
        handleLoginPage(); 
    };

    return (
        <div className="step-1">
            <Navbar />
            <div className="account-form">
                <div className="step-two">
                    <h2>Log into your Account</h2>
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Continue</button>
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
                </div>
            </div>
        </div>
    )
}

export default LoginAuth;
