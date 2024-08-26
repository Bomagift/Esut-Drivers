
import "../Styles/Header.css";
import image2 from "../Images/Frame 1000002895.png";
import { auth, firestore } from "../firebase";
import { useState,useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
const Header = () => {

  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser; 
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'drivers', user.uid)); 
          if (userDoc.exists()) {
            setUsername(userDoc.data().username); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUsername(); 
  }, []);
  return (
    <div className="Header">
      <div className="header1">
        <img src={image2} alt="Logo" className="logo" />
      </div>
      <div className="Head-title">
        <h1>
          <span className="welcome"> Welcome</span>, {username || "User"}!
        </h1>
        <p>Here's what you need to do to set up your driver account.</p>
      </div>

    </div>
  );
};

export default Header;
