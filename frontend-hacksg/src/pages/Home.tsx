import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

// Importing the image from local assets directory
import image from '../assets/images/test.png';  // Adjust the path as necessary

const Home = () => {
    return (
        <div className='page' style={{ backgroundColor: '#88AED0' }}> 
            <h1 className='text-center mt-3'>Welcome back!</h1>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            
                <Row>
                    <Col>
                        {/* Inline styles to set image size */}
                        <Image src={image} alt="Banner" style={{ width: '600px', height: 'auto' }} className="mx-auto d-block" />
                        <h1 className='text-center mt-3'>Ready to help?</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
