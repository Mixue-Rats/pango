import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import EventMap from '../components/EventMap';
import Address from '../types/Address';


// Temp
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from 'mdb-react-ui-kit';

interface Event {
    _id: string,
    title: string,
    desc: string,
    location: string,
    startDate: string,
    endDate: string,
    orgEmail: string,
    createdDate: string,
    participants: string[]
}


const UserEvents = () => {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            await axios.get('/events')
            .then((res) => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch((err) => {
                console.warn(err);
                setError(err);
            });
        }
        fetchEvents();
    }, []);

    const [err, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="page">
            <Container style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}>
                <Row>
                    { loading ? (
                        <p style={{color: "var(--text-color)"}}>Loading...</p>
                    ) : err ? (
                        <p>{err}</p>
                    ) : (
                        <>
                            <h1 className='text-center mt-3' style={{color: 'var(--text-color)'}}> Around you</h1>
                            <EventMap {...events}/>
                            <MDBContainer className="my-5" >
                                <h2 className="mb-4" style={{color: "var(--text-color)"}}>Upcoming Events</h2>
                                {events.map((event) => (
                                    <MDBCard key={event._id} className="mb-3">
                                        <MDBCardBody>
                                            <MDBCardTitle>{event.title}</MDBCardTitle>
                                            <MDBCardText>
                                                Location: {event.location}
                                                <br />
                                                Date: {event.startDate}
                                                <br />
                                                Participants: {event.participants}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                ))}
                            </MDBContainer>

                            <MDBContainer className="my-5">
                                <h2 className="mb-4" style={{color: "var(--text-color)"}}>Completed Events</h2>
                                {events.map((event) => (
                                    <MDBCard key={event._id} className="mb-3">
                                        <MDBCardBody>
                                            <MDBCardTitle>{event.title}</MDBCardTitle>
                                            <MDBCardText>
                                                Location: {event.location}
                                                <br />
                                                Date: {event.startDate}
                                                <br />
                                                Participants: {event.participants}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                ))}
                            </MDBContainer>
                        </>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default UserEvents;
