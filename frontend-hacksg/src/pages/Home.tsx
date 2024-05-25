import React from 'react';
import { Container, Row, Col, Image, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

// Importing the image from local assets directory
import image from '../assets/images/pango_lvl1.png';  // Adjust the path as necessary


const Home = () => {

    const navigate = useNavigate();  // Hook for navigation
    const handleNavigate = (path: string) => {
        navigate(path);  // Function to redirect to specified path
    };

    return (
        <div className='page' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}> 
        <h3 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Level 3</h3>
        <div className="progress">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: '60%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '10vh' }}>
                <Row>
                    <Col>
                        {/* Inline styles to set image size */}
                        <Image src={image} alt="Banner" style={{ width: '600px', height: 'auto' }} className="mx-auto d-block" />
                        {/* <h1 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Ready to grow?</h1> */}
                    </Col>
                    <Col xs={12} md={4} className="d-flex justify-content-center">
                    <Button variant="success" className="custom-btn" onClick={() => handleNavigate('/events/volunteer')}>Join</Button>
                    <Button variant="primary" className="custom-btn"onClick={() => handleNavigate('/upcoming')}>Upcoming</Button>
                    <Button variant="secondary" className="custom-btn" onClick={() => handleNavigate('/history')}>History</Button>
                </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Home;
