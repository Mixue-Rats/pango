import axios from 'axios';
import { useState } from 'react';
import { Row, Col, Container, Button, Modal } from 'react-bootstrap';

import { useAuthContext } from '../hooks/useAuthContext';
import { getDate, getTime } from '../constants/convertDateTime'

import beach_cleanup from '../assets/images/thumbnails/beach-cleanup.png'
import default_img from '../assets/images/thumbnails/default.png'
import food_drive from '../assets/images/thumbnails/food-drive.png'
import kids from '../assets/images/thumbnails/kids.png'
import elderly_help from '../assets/images/thumbnails/elderly-help.png'
import volunteer from '../assets/images/thumbnails/volunteer-1.png'

const imageMap = {
    'beach_cleanup': beach_cleanup,
    'default': default_img,
    'food_drive': food_drive,
    'kids': kids,
    'elderly_help': elderly_help,
    'volunteer': volunteer
}



const EventModal = (props: any) => {

    const { user } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState("");

    const handleJoinEvent = async (user: any, event: any) => {
        console.log('Joining event: ', event);
        setLoading(true);
        await axios.post('/events/join', {
            userEmail: user.user.email,
            eventId: event._id
        })
        .then((res) => {
            console.log(res.data);
            setLoading(false);
            setSuccess("Successfully joined event!");
        })
        .catch((err) => {
            console.warn(err);
            setError(err);
            setLoading(false);
        });
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Row>
                <img src={imageMap[props.volunteer_event.image as keyof typeof imageMap]} alt={props.volunteer_event.title} style={{ width: '100%' }} />
            </Row>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.volunteer_event.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <p>{props.volunteer_event.desc}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='alert alert-success'>Date: {getDate(props.volunteer_event.startDateTime)} <br/> 
                        From {getTime(props.volunteer_event.startDateTime)} to {getTime(props.volunteer_event.endDateTime)}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <em>📧: {props.volunteer_event.organiser_email}</em>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <em>📍 {props.volunteer_event.location || "Address not available."}</em>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    { success ? (
                        <div className="text-success">{success}</div>
                    ) : error ? (
                        <div className="text-danger">{error}</div>
                    ) : (
                        <div></div>
                    )}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            { loading ? (
                                <Button size="lg" className="m-0 px-4" disabled>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </Button>
                            ) : (
                                <Button size="lg" className="m-0 px-4" onClick={() => handleJoinEvent(user, props.volunteer_event)}>Join Event</Button>
                            )}
                        </Col>
                        <Col className='w-auto d-flex justify-content-center align-items-center'>
                            <Button variant="danger" size="lg" className="m-0 px-4" onClick={props.onHide}>Close</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default EventModal;

