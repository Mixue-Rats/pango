import React from 'react';
import './Landing.css'; // Import the CSS

const Landing: React.FC = () => {
    return (
        <div className="landing-container">
            <h1>Welcome to Pango!</h1>
            <h2>You can begin by creating your own account and start volunteering!</h2>
            <h3>Alternatively, you can use this pre-existing account to see what the app looks like from a seasoned user!</h3>
            
            <div className="credentials">
                <h4>Username: BeachLover <br/>
                    Password: BeachLover123
                </h4>
            </div>
            <button onClick={() => {/* logic to handle login */}}>
                Login with Demo Account
            </button>
        </div>
    );
};

export default Landing;
