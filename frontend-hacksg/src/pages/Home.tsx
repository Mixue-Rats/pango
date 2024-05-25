import React from 'react';
import { Container, Row, Col, Image, ProgressBar } from 'react-bootstrap';
import '../App.css'; 

// Importing the image from local assets directory
import image from '../assets/images/test.png';  // Adjust the path as necessary


const Home = () => {
    return (
        <div className='page' style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}> 
            <h1 className='text-center mt-3' style={{color: 'var(--text-color)'}}> Welcome back!</h1>
        
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Row>
                    <Col>
                        {/* Inline styles to set image size */}
                        <Image src={image} alt="Banner" style={{ width: '600px', height: 'auto' }} className="mx-auto d-block" />
                        <h1 className='text-center mt-3' style={{color: 'var(--text-color)'}}>Ready to grow?</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Home;
