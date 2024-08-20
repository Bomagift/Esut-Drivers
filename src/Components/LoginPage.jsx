
import { useNavigate } from 'react-router-dom';
import "../Styles/LoginPage.css"
import Navbar from './Navbar';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleDriverClick = () => {
        navigate('/Home');
    };

    const handleAdminClick = () => {
        navigate('/AdminPage');
    };

    return (
        <div className="login-container1">
        <Navbar/>
        <div className="login-container">
        <h1>Welcome to the ESUT Drivers Platform</h1>
        <p>Please select your role to continue:</p>
        <div className="role-buttons">
       
            <button onClick={handleDriverClick} className="role-btn">Driver</button>
            <button onClick={handleAdminClick} className="role-btn">Admin</button>
        </div>
        </div>
        </div>
    );
};

export default LoginPage;