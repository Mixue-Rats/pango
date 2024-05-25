import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import SetPreferences from './forms/SetPreferences';

// import volunteer from '../assets/images/volunteer-1.png';
import banner from '../assets/images/banner.png';

let volunteer = "https://via.placeholder.com/500"

const Home = () => {
    return (
        <div className='page'>
            {/* <Container className='min-vw-100' style={{backgroundImage: `url(${volunteer})`, backgroundRepeat: 'no-repeat', border: '2px solid red'}}>
                <Row>
                    <h1 className='text-center'>Home</h1>
                </Row>
            </Container> */}
            <SetPreferences/>
        </div>
    );
}

export default Home;