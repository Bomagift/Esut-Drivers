import { auth, firestore } from "../firebase";
import "../Styles/AdminPage.css"
import Navbar from "./Navbar";


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
        <div>
            <Navbar/>
            <h1>Admin Dashboard</h1>

            <div>
    <h2>Drivers Added</h2>
    <div>
        <nav>
            <ul>
                <li>Driver Applications</li>
                <li>Manage Users</li>
                <li>View Reports</li>
            </ul>
        </nav>
        <h1>Driver Applications</h1>
        {loading ? (
            <p>Loading drivers...</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                      
                        <th>License</th>
                        {/* <th>Phone Number</th> */}
                        {/* <th>Status</th> */}
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.length > 0 ? (
                        drivers.map(driver => (
                            <tr key={driver.id}>
                                <td>{driver.firstName}</td>
                                <td>{driver.email}</td>
                                
                                <td>{driver.licenseNumber}</td>
                                <td>{driver.driversLicense}</td>
                                {/* <td>{driver.phoneNumber}</td> */}
                                <td>{driver.status}</td>
                                <td>
                                    <button 
                                        disabled={driver.status === 'accepted'} // Disable if already accepted
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        disabled={driver.status === 'rejected'} // Disable if already rejected
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No drivers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )}
    </div>
</div>

        </div>




    

    );
};

export default AdminPage;
