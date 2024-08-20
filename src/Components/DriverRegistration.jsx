import { useState } from 'react';
import '../Styles/DriverRegistration.css';

const DriverRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        licensePlate: '',
        address: '',
        state: '',
        city: '',
        driversLicense: '',
        tin: '',
        licensePlateNumber: '',
        driversLicenseFile: null,
        profilePictureFile: null,
        vehicleLicenseFile: null
    });

    const [step, setStep] = useState(1);

    const statesAndCities = {
        "Lagos": ["Ikeja", "Lekki", "Yaba"],
        "Abuja": ["Garki", "Maitama", "Wuse"],
        "Enugu": ["Enugu", "Agbani", "Nsukka"]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'state') {
            
            setFormData({
                ...formData,
                state: value,
                city: ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (step === 3) {
                setStep(4); 
            } else {
                setStep(step + 1);
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const validateForm = () => {
        if (step === 1) {
            return Object.values(formData).slice(0, 8).every(field => field !== '');
        } else if (step === 2) {
            return Object.values(formData).slice(8, 11).every(field => field !== '');
        } else if (step === 3) {
            return formData.driversLicenseFile && formData.profilePictureFile && formData.vehicleLicenseFile;
        }
        return false;
    };

    return (
        <div className="registration-container">
            {step === 1 && (
                <div className="form-wrapper">
                    <h1 className="welcome-title">Personal Information</h1>
                    <p className="welcome-subtitle"> Your personal details will be kept private.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group1">
                            <div className="form-group">
                                <label>First name <span className="required">*</span></label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Last name <span className="required">*</span></label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email <span className="required">*</span></label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number <span className="required">*</span></label>
                            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>License plate <span className="required">*</span></label>
                            <input name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Address <span className="required">*</span></label>
                            <input name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>State <span className="required">*</span></label>
                            <select name="state" value={formData.state} onChange={handleChange} required>
                                <option value="" disabled>Select your state</option>
                                {Object.keys(statesAndCities).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>City <span className="required">*</span></label>
                            <select name="city" value={formData.city} onChange={handleChange} required>
                                <option value="" disabled>Select your city</option>
                                {formData.state && statesAndCities[formData.state].map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="next-step-btn">Next step</button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className="form-wrapper">
                    <h1 className="form-title">Licensing details</h1>
                    <p className="form-subtitle">Your license details will be kept private.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Driver's license number <span className="required">*</span></label>
                            <input name="driversLicense" value={formData.driversLicense} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>TIN <span className="required">*</span></label>
                            <input name="tin" value={formData.tin} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>License plate number <span className="required">*</span></label>
                            <input name="licensePlateNumber" value={formData.licensePlateNumber} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="next-step-btn">Next step</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="form-wrapper">
                    <h1 className="form-title">Documents</h1>
                    <p className="form-subtitle">Document scans and quality photos are accepted.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Driver's License <span className="required">*</span></label>
                            <input type="file" name="driversLicenseFile" onChange={handleFileChange} required />
                        </div>
                        <div className="form-group">
                            <label>Driver's profile picture <span className="required">*</span></label>
                            <input type="file" name="profilePictureFile" onChange={handleFileChange} required />
                        </div>
                        <div className="form-group">
                            <label>Vehicle License <span className="required">*</span></label>
                            <input type="file" name="vehicleLicenseFile" onChange={handleFileChange} required />
                        </div>
                        <button type="submit" className="register-btn">Register</button>
                    </form>
                </div>
            )}

            {step === 4 && (
                <div className="form-wrapper">
                    <h1 className="success-title">Registration Successful!</h1>
                    <p className="success-subtitle">Thank you for registering. Your details have been successfully submitted.</p>
                </div>
            )}
        </div>
    );
};

export default DriverRegistration;
