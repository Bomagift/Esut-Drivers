import '../Styles/ProgressBar.css';


const ProgressBar = ({ currentStep }) => {
    const steps = [
        { number: 1, label: 'Personal Information' },
        { number: 2, label: 'Licensing Details' },
        { number: 3, label: 'Documents' }
    ];

    return (
    
        <div className="progress-bar">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${currentStep >= step.number ? 'completed' : ''}`}
                >
                    <div className="circle">{step.number}</div>
                    <span>{step.label}</span>
                </div>
            ))}
        </div>
        
        
    );
};

export default ProgressBar;


