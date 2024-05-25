import React from 'react';
import { Container, Row, Col, Image, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

// Importing the image from local assets directory
import pango from '../assets/images/pango_lvl1.png';  
import pango2 from '../assets/images/pango_lvl2.png';
import pango3 from '../assets/images/pango_lvl3.png';
import pango4 from '../assets/images/pango_lvl4.png';
import AchievementsGrid from '../components/Achievements';
import { useAuthContext } from '../hooks/useAuthContext';

import '../App.css';

const Home = () => {
    const { user } = useAuthContext();
    // const user = { exp: 320, achievements: ["Red Cross!", "Animal Lover", "Saving the Beach!", "Helping Ah Ma!"]  };
    const navigate = useNavigate();  // Hook for navigation
    const handleNavigate = (path: string) => {
        navigate(path);  // Function to redirect to specified path
    };
    
    
    if (!user) {
        navigate('/login/volunteer');
        return null; // Stop execution if no user
    }

    const pangoLevels = [
        { expThreshold: 0, image: pango, title: 'Level 1: Baby Pango' },
        { expThreshold: 100, image: pango2, title: 'Level 2: Growing Pango' },
        { expThreshold: 200, image: pango3, title: 'Level 3: Mature Pango' },
        { expThreshold: 300, image: pango4, title: 'Level 4: Super Pango' },
    ];

    
    const getCurrentLevel = (exp: number) => {
        // Find the current level based on experience
        return pangoLevels.slice().reverse().find(level => exp >= level.expThreshold);
    };
    
    const currentLevel = getCurrentLevel(user.exp || 0);

    return (
        <div className='page' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}> 
            <h3 className='textcentermt3'>{currentLevel && currentLevel.title}</h3>
        <div className="progress">
        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${(user.exp % 100)}%` }} aria-valuenow={user.exp} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '40vh' }}>
                {/* <Row style={{backgroundColor: "var()"}}> */}
                    <Col>
                        {currentLevel && <Image src={currentLevel.image} alt="Pango" style={{ width: '300px', height: 'auto' }} className="mx-auto d-block" />}
                    </Col>
                {/* </Row> */}
            </Container >
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '0vh' }}>
            <Col xs={12} md={4} className="d-flex justify-content-center">
                    <Button variant="success" className="custom-btn" onClick={() => handleNavigate('/events/volunteer')}>Search</Button>
                    <Button variant="success" className="custom-btn"onClick={() => handleNavigate('/upcoming')}>Upcoming</Button>
                    <Button variant="success" className="custom-btn" onClick={() => handleNavigate('/history')}>History</Button>
                </Col>
            </Container>
            <Row>
                <Col>
                <h4 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Achievements: {user.achievements ? user.achievements.length : 0}</h4>
                <AchievementsGrid user={user}/>    
                </Col>
            </Row>
        </div>
    );
}


export default Home;
