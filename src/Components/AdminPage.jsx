import { auth, firestore } from "../firebase";
import "../Styles/AdminPage.css"
import Navbar from "./Navbar";
<<<<<<< HEAD
import { collection, query, where ,onSnapshot} from 'firebase/firestore';
import { useState, useEffect } from "react";
const AdminPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser?.email; 

    const fetchDrivers = () => {
        if (user) {
            try {
            
                const driversQuery = query(
                    collection(firestore, 'drivers'),
                    where('driversLicense', '!=', '') 
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


 

    return (
        <div>
            <Navbar/>
            <h1>Admin Dashboard</h1>

            <div>
            <h2>Drivers Added</h2>
            {loading ? (
                <p>Loading drivers...</p>
            ) : (
                <ul>
                    {drivers.length > 0 ? (
                        drivers.map(driver => (
                            <li key={driver.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>name:{driver.firstName} {driver.lastName}</strong>
                                    <br/>
                                    <span style={{ marginLeft: '10px' }}>phoneNumber:{driver.phoneNumber}</span>
                                    <br/>
                                    <span style={{ marginLeft: '10px' }}>address:{driver. address}</span>
                                    <br/>
                                    <span style={{ marginLeft: '10px' }}>licensePlate:{driver. licensePlate}</span>
                                    <br/>
                                    <span style={{ marginLeft: '10px' }}>driversLicense:{driver.driversLicense}</span>

                                </div>
                                <div>
                                    <button 
                                        
                                        style={{ marginRight: '5px' }}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No drivers found.</li>
                    )}
                </ul>
            )}
        </div>
        </div>
=======
import  { useEffect, useState } from 'react';
import "../Styles/AdminPage.css";

const AdminPage = () => {
    
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/drivers')
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.error('Error fetching drivers:', error));
  }, []);

  const handleApprove = (id) => {
    const driver = drivers.find(driver => driver.id === id);
    fetch('http://localhost:3001/approve-driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: driver.email })
    }).then(response => response.json())
      .then(() => {
        const updatedDrivers = drivers.map(driver =>
          driver.id === id ? { ...driver, status: 'Approved' } : driver
        );
        setDrivers(updatedDrivers);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleReject = (id) => {
    const driver = drivers.find(driver => driver.id === id);
    fetch('http://localhost:3001/reject-driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: driver.email })
    }).then(response => response.json())
      .then(() => {
        const updatedDrivers = drivers.map(driver =>
          driver.id === id ? { ...driver, status: 'Rejected' } : driver
        );
        setDrivers(updatedDrivers);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="step4">
        <Navbar/>
    <div>
      <nav>
        <ul>
          <li>Driver Applications</li>
          <li>Manage Users</li>
          <li>View Reports</li>
        </ul>
      </nav>
      <h1>Driver Applications</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>License Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.email}</td>
              <td>{driver.phoneNumber}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.status}</td>
              <td>
                <button onClick={() => handleApprove(driver.id)}>Approve</button>
                <button onClick={() => handleReject(driver.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
>>>>>>> 9d859d36f521fff8bcc531755fc3d03832be8d92
    );
};

export default AdminPage;
