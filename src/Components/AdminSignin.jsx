import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import image1 from '../Images/Google.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function AdminSignin() {
  const [error, setError] = useState('');
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
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill out all required fields before continuing.");
      return;
    }

    try {
      const userData = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userData.user.uid;
      const userdoc = await getDoc(doc(firestore, 'admin', user));

      if (userdoc.exists()) {
        console.log('Admin exists');
        navigate('/Adminpage');
      } else {
        setError('Admin not found');
        console.error('Admin not found');
      }
    } catch (err) {
      setError(err.message);  // Display the error message
      console.error('Error signing in:', err);
    }

    localStorage.setItem('LoggedInUser', formData.username);
    console.log("User Data Submitted:", formData);
  };

  return (
    <div className="step2">
      <Navbar />
      <div className="account-form">
        <h2>Creating an account as Admin</h2>
        {error && <p className='error-message'>{error}</p>}
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

export default AdminSignin;
