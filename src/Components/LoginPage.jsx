
import { useNavigate } from 'react-router-dom';
import "../Styles/LoginPage.css"

const LoginPage = () => {
    const navigate = useNavigate();

    const handleDriverClick = () => {
        navigate('/Home');
    };

    const handleAdminClick = () => {
        navigate('/AdminPage');
    };

    return (
        <div className="login-container">
        <img src="src/Images/Frame 1000002895.png" alt="Logo" className="logo" />
        <h1>Welcome to the ESUT Drivers Platform</h1>
        <p>Please select your role to continue:</p>
        <div className="role-buttons">
       
            <button onClick={handleDriverClick} className="role-btn">Driver</button>
            <button onClick={handleAdminClick} className="role-btn">Admin</button>
        </div>
        </div>
    );
};

export default LoginPage;