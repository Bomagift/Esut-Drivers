import ProgressBar from '../Components/ProgressBar';
import "../Styles/Header.css"


const Header = ({ currentStep }) => {
    return (
        <div className="Header">
        <div className="header1">
            <img src="src/Images/Frame 1000002895.png" alt="Logo" className="logo" />
        </div>
        
          <ProgressBar currentStep={currentStep} />
          </div>
    );
};

export default Header;
