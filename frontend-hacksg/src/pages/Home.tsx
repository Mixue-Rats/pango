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


const Home = () => {

    const navigate = useNavigate();  // Hook for navigation
    const handleNavigate = (path: string) => {
        navigate(path);  // Function to redirect to specified path
    };

    return (
        <div className='page' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}> 
        <h3 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Level 3: Baby Pango</h3>
        <div className="progress">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: '60%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '65vh' }}>
                <Row style={{backgroundColor: "var()"}}>
                    <Col>
                        {/* Inline styles to set image size */}
                        <Image src={pango4} alt="Pango" style={{ width: '300px', height: 'auto' }} className="mx-auto d-block" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex justify-content-center">
                    <Button variant="success" className="custom-btn" onClick={() => handleNavigate('/events/volunteer')}>Search</Button>
                    <Button variant="primary" className="custom-btn"onClick={() => handleNavigate('/upcoming')}>Upcoming</Button>
                    <Button variant="secondary" className="custom-btn" onClick={() => handleNavigate('/history')}>History</Button>
                </Col>
                </Row>
            </Container >
            <Row>
                <Col>
                <h4 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Achievements: 1/5</h4>
                <AchievementsGrid user={{ achievements: ["Red Cross!", "Animal Lover", "Saving the Beach!", "Helping Ah Ma!"] }} />    
                </Col>
            </Row>
        </div>
    );
}


export default Home;
