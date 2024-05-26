import { useState } from 'react';
import { Container, Tabs, Tab, Col, Row } from 'react-bootstrap';
import { Event } from '../types/Event';
import LargeCard from './LargeCard';

import getDistance from '../constants/getDistance'

import robopango from '../assets/images/robo_pango.png'
import red_pin from '../assets/images/red-pin.png'

const TabContainer = (props: any) => {

    const [key, setKey] = useState('recommendations');

    return (
        <Container className="p-3 mt-1" style={{backgroundColor:'smokewhite'}}>
            <Container className='my-2' style={{backgroundColor:'smokewhite'}}>
                { key === "recommendations" ? (
                    <Row style={{backgroundColor:'smokewhite'}}>
                        <Col xs={2} md={1} className='d-flex flex-row justify-content-start'>
                            <img src={robopango} alt="RoboPango" width="70" height="70"/>
                        </Col>
                        <Col className='d-flex flex-row justify-content-center align-items-center'>
                            <p className='alert alert-dark' style={{backgroundColor:'whitesmoke', color:'black', fontSize:'10px'}}>Powered by AI, here are RoboPango's recommendations for you!</p>
                        </Col>
                    </Row>
                ) : (
                    <Row style={{backgroundColor:'smokewhite'}}> 
                        <Col xs={2} md={1} className='d-flex flex-row justify-content-center align-items-center'>
                            <img src={red_pin} alt="red pin" width="60" height="50" style={{padding:"1"}}/>
                        </Col>
                        <Col className='d-flex flex-row justify-content-center align-items-center'>
                            <p className='alert alert-dark' style={{backgroundColor:'whitesmoke', color:'black', fontSize:'10px'}}>Want something near? Check out opportunities near you!</p>
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
                <Tab eventKey="recommendations" title="RoboPango's Recommendations" style={{color:'#064420'}}>
                    <div className="horizontal-scroll">
                        { props.events && props.events.length != 0 ? (props.events
                            .filter((event: Event) => new Date(event.endDateTime).getTime() >= Date.now())
                            .map((event: Event) => (
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
                        { props.events && props.events.length != 0 ? (
                            [...props.events]
                            .filter((event: Event) => new Date(event.endDateTime)
                            .getTime() >= Date.now()).sort((a: Event, b: Event) => {
                                return getDistance(a.lat, a.lng, props.lat, props.lng)
                                    - getDistance(b.lat, b.lng, props.lat, props.lng)
                            }).map((event: Event) => (
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