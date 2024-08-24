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
    );
};

export default AdminPage;
