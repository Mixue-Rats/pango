import React from 'react';
import './Landing.css'; // Import the CSS
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate(); // Correct placement of useNavigate

    // Function to handle navigation on button click
    const handleLoginClick = () => {
        navigate('/selectUserType'); // Use the navigate function to change the route
    };

    return (
        <div className="landing-container">
            <h1>Welcome to Pango!</h1>
            <h2>You can begin by creating your own account and start volunteering!</h2>
            <h3>Alternatively, you can use this pre-existing account to see what the app looks like from a seasoned user!</h3>
            
            <div className="credentials">
                <h4>Username: BeachLover@gmail.com <br/>
                    Password: BeachLover123
                </h4>
            </div>
            <button onClick={handleLoginClick}>
                Login
            </button>
        </div>
    );
};

export default Landing;
