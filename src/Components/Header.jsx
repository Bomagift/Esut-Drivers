import ProgressBar from '../Components/ProgressBar';
import "../Styles/Header.css"
import DriverRegistration from './DriverRegistration';


const Header = ({ currentStep }) => {
    return (
        <div className="Header">
        <div className="header1">
            <img src="src/Images/Frame 1000002895.png" alt="Logo" className="logo" />
        </div>
        <div className="Head-title">
            <h1><span className='welcome'> Welcome</span>, Savi!</h1>
            <p>Here's what you need to do to set up your driver account.</p>
            </div>
            <div className="bar">
          <ProgressBar currentStep={currentStep} />
          <DriverRegistration/>
          </div>
          </div>
    );
};

export default Header;
