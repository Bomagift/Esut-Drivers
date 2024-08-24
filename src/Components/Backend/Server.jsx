
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Example data store (replace this with your database setup)
let drivers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    licenseNumber: 'AB123456',
    address: '123 Main St',
    state: 'State1',
    city: 'City1',
    tin: '123456789',
    plateNumber: 'XYZ123',
    documents: {
      driverLicense: 'url_to_driver_license',
      profilePicture: 'url_to_profile_picture',
      vehicleLicense: 'url_to_vehicle_license'
    },
    status: 'Pending'
  },
  
];

app.get('/drivers', (req, res) => {
  res.json(drivers);
});

app.post('/approve-driver', (req, res) => {
  const { email } = req.body;
  const driver = drivers.find(driver => driver.email === email);
  if (driver) {
    driver.status = 'Approved';
    res.json({ message: 'Driver approved successfully' });
  } else {
    res.status(404).json({ message: 'Driver not found' });
  }
});

app.post('/reject-driver', (req, res) => {
  const { email } = req.body;
  const driver = drivers.find(driver => driver.email === email);
  if (driver) {
    driver.status = 'Rejected';
    res.json({ message: 'Driver rejected successfully' });
  } else {
    res.status(404).json({ message: 'Driver not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
