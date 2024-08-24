import { useLocation, useNavigate } from 'react-router-dom';
import "../Styles/LoginPage.css";
import Navbar from './Navbar';
import { doc, setDoc } from 'firebase/firestore';
import {  firestore } from '../firebase';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRef = location.state?.userRef;
    const username = location.state?.username;
    console.log('this is', userRef);
    
   

    const handleDriverClick = async () => {
        if (!userRef) {
            console.error("User reference is undefined");
            return;
        }

        try {

            await setDoc(doc(firestore, 'drivers', userRef), {
                role: 'driver',
                username,
                createdAt: new Date(),
            });
            console.log('Driver created');
            navigate('/Home');
        } catch (err) {
            console.log('Error registering driver', err);
        }
    };

    const handleAdminClick =  async () => {
        if (!userRef) {
            console.error("User reference is undefined");
            return;
        }

        try {

            await setDoc(doc(firestore, 'admin', userRef), {
                role: 'admin',
                createdAt: new Date(),
            });
            console.log('Admin created');
            navigate('/AdminPage');
        } catch (err) {
            console.log('Error registering driver', err);
        }
       
    };

    return (
        <div className="login-container1">
            <Navbar />
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
