import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import "../Styles/AdminPage.css";
import image3 from "../Images/3 User.png";
import image6 from "../Images/home (1).png";
import image8 from "../Images/Settings_Future.png";
import image9 from "../Images/Logout.png";
import image2 from "../Images/Frame 1000002895.png";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import axios from "axios"; 
import Modal from "../Components/Modal"; 

const AdminPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [message, setMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const user = auth.currentUser?.email;

  const fetchDrivers = () => {
    if (user) {
      try {
        const driversQuery = query(
          collection(firestore, "drivers"),
          where("driversLicense", "!=", "")
        );

        const unsubscribe = onSnapshot(driversQuery, (querySnapshot) => {
          const driversList = [];

          querySnapshot.forEach((doc) => {
            driversList.push({ id: doc.id, ...doc.data() });
          });

          setDrivers(driversList);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = fetchDrivers();
    return () => unsubscribe && unsubscribe();
  }, []);

  // Function to handle approving a driver
  const handleApprove = async (id) => {
    const driverRef = doc(firestore, "drivers", id);

    try {
      await updateDoc(driverRef, { status: "Approved" });
      const updatedDrivers = drivers.map((driver) =>
        driver.id === id ? { ...driver, status: "Approved" } : driver
      );
      setDrivers(updatedDrivers);
      setMessage("The application has been approved.");

      // Call backend to send approval email
      const selectedDriver = drivers.find((driver) => driver.id === id);
      await sendEmail(selectedDriver.email, "Approved");

    } catch (error) {
      console.error("Error approving driver:", error);
    }
  };

  // Function to handle rejecting a driver
  const handleReject = async (id) => {
    const driverRef = doc(firestore, "drivers", id);

    try {
      await updateDoc(driverRef, { status: "Rejected" });
      const updatedDrivers = drivers.map((driver) =>
        driver.id === id ? { ...driver, status: "Rejected" } : driver
      );
      setDrivers(updatedDrivers);
      setMessage("The application has been rejected.");

      // Call backend to send rejection email
      const selectedDriver = drivers.find((driver) => driver.id === id);
      await sendEmail(selectedDriver.email, "Rejected");

    } catch (error) {
      console.error("Error rejecting driver:", error);
    }
  };

  // Function to send email via backend API
  const sendEmail = async (email, status) => {
    try {
      await axios.post("https://<YOUR_FIREBASE_FUNCTION_URL>/sendApprovalEmail", {
        email,
        status,
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleViewDetails = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedDriver(null); // Reset selected driver
  };

  return (
    <div className="admin-page">
      <div className="sidebar">
        <div className="logo"><img src={image2} alt="" /></div>
        <ul>
          <li><img src={image6} alt="Dashboard Icon" />Dashboard</li>
          <li><img src={image6} alt="Application Icon" />Application</li>
          <li className="active"><img src={image3} alt="All Drivers Icon" />All drivers</li>
          <li><img src={image8} alt="Settings Icon" />Settings</li>
        </ul>
        <div className="logout"><img src={image9} alt="" />Log out</div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Drivers</h1>
          <div className="header-actions">
            <select className="filter">
              <option>Filter by</option>
              <option>A - Z</option>
              <option>Z - A</option>
            </select>
            <input type="text" placeholder="Search by name and Phone Number" className="search" />
          </div>
        </div>

        <div className="drivers-list">
          {loading ? (
            <p>Loading drivers...</p>
          ) : (
            <>
              {message && <p>{message}</p>}
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.length > 0 ? (
                    drivers.map((driver) => (
                      <tr key={driver.id}>
                        <td>
                          <div className="driver-info">
                            <div className="avatar"></div>
                            <div>
                              <p>{driver.firstName} {driver.lastName}</p>
                              <p>{driver.email}</p>
                            </div>
                          </div>
                        </td>
                        <td>{driver.phoneNumber}</td>
                        <td>
                          <button className="view-details" onClick={() => handleViewDetails(driver)}>
                            View Details
                          </button>
                          <button className="approve-btn"
                            onClick={() => handleApprove(driver.id)}
                            disabled={driver.status === "Approved"}
                          >
                            Approve
                          </button>
                          <button className="reject-btn"
                            onClick={() => handleReject(driver.id)}
                            disabled={driver.status === "Rejected"}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No drivers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedDriver && (
          <div className="driver-details">
            <h2>Driver Details</h2>
            <p><strong>Name:</strong> {selectedDriver.firstName} {selectedDriver.lastName}</p>
            <p><strong>Email:</strong> {selectedDriver.email}</p>
            <p><strong>Phone Number:</strong> {selectedDriver.phoneNumber}</p>
            <p><strong>License Plate:</strong> {selectedDriver.licensePlate}</p>
            <p><strong>Address:</strong> {selectedDriver.address}</p>
            <p><strong>State:</strong> {selectedDriver.state}</p>
            <p><strong>City:</strong> {selectedDriver.city}</p>
            <p><strong>Driver's License:</strong> {selectedDriver.driversLicense}</p>
            <p><strong>Car Make:</strong> {selectedDriver.carMake}</p>
            <p><strong>Car Model:</strong> {selectedDriver.carModel}</p>
            <p><strong>Year of Manufacture:</strong> {selectedDriver.yearOfManufacture}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;
