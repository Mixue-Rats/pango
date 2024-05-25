import { useState } from 'react';
import { Container, Tabs, Tab, Col, Row } from 'react-bootstrap';
import { Event, EventsListProps } from '../types/Event';
import LargeCard from './LargeCard';

import robopango from '../assets/images/robo_pango.png'
import red_pin from '../assets/images/red-pin.png'

const TabContainer = ({events}: EventsListProps) => {

    const [key, setKey] = useState('recommendations');

    return (
        <Container className="p-3 mt-1">
            <Container className='my-2'>
                { key === "recommendations" ? (
                    <Row>
                        <Col xs={2} md={1} className='d-flex flex-row justify-content-start'>
                            <img src={robopango} alt="RoboPango" width="50" height="60"/>
                        </Col>
                        <Col className='d-flex flex-row justify-content-center align-items-center'>
                            <p className='alert alert-dark'>Powered by AI, here are RoboPango's recommendations for you!</p>
                        </Col>
                    </Row>
                ) : (
                    <Row> 
                        <Col xs={2} md={1} className='d-flex flex-row justify-content-center align-items-center'>
                            <img src={red_pin} alt="red pin" width="50" height="50" style={{padding:"2"}}/>
                        </Col>
                        <Col className='d-flex flex-row justify-content-center align-items-center'>
                            <p className='alert alert-dark'>Want something near? Check out opportunities near you!</p>
                        </Col>
                    </Row>
                )}
            </Container>
            <Tabs 
                defaultActiveKey="recommendations" 
                id="event-tab-container" 
                className="mb-3" 
                justify activeKey={key} 
                onSelect={(k) => setKey(k as string)}
            >
                <Tab eventKey="recommendations" title="RoboPango's Recommendations">
                    <div className="horizontal-scroll">
                        { events && events.length != 0 ? (events.map((event: Event) => (
                            <Col className='mx-2 px-1' key={event._id}>
                                <LargeCard {...event}/>
                            </Col>
                        ))) : (
                            <div className="alert alert-danger">No events found. Try refreshing the page?</div>
                        )}
                    </div>
                </Tab>
                <Tab eventKey="proximity" title="Near Me">
                    <div className="horizontal-scroll">
                        { events && events.length != 0 ? (events.map((event: Event) => (
                            <Col className='mx-2 px-1' key={event._id}>
                                <LargeCard {...event}/>
                            </Col>
                        ))) : (
                            <div className="alert alert-danger">No events found. Try refreshing the page?</div>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default TabContainer;