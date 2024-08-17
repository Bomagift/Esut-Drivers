import '../Styles/ProgressBar.css';

const ProgressBar = ({ currentStep }) => {
    const steps = [
        { number: 1, label: 'Personal Information' },
        { number: 2, label: 'Licensing Details' },
        { number: 3, label: 'Documents' }
    ];

    return (
        <div className="progress-bar">
            <div className="Head-title">
            <h1>Welcome, Savi</h1>
            <p>Here's what you need to do to set up your driver account.</p>
            </div>
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${currentStep > step.number ? 'completed' : ''} ${currentStep === step.number ? 'current' : ''}`}
                >
                    <div className="circle">
                        {currentStep > step.number ? '✔' : step.number}
                    </div>
                    <span>{step.label}</span>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
