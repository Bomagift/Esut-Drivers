import "../Styles/AdminPage.css"
import Navbar from "./Navbar";
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
    
    );
};

export default AdminPage;
