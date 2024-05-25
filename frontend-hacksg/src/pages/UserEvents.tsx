import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import EventMap from '../components/EventMap';
import Address from '../types/Address';


// Temp
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from 'mdb-react-ui-kit';

// Define the type for an event
interface Event {
    id: number;
    name: string;
    location: string;
    date: string;
    participants: number;
  }
  
  // Mock data
  const mockPastEvents: Event[] = [
      { id: 1, name: "Beach Cleanup", location: "East Coast Park", date: "2024-06-25", participants: 150 },
      { id: 2, name: "Tree Planting Day", location: "Bishan Park", date: "2024-07-01", participants: 80 },
      { id: 3, name: "Charity Run", location: "Marina Bay", date: "2024-07-15", participants: 200 },
      { id: 4, name: "Community Painting", location: "Jurong West", date: "2024-07-20", participants: 90 },
      { id: 5, name: "Recycling Drive", location: "Tampines Hub", date: "2024-08-05", participants: 120 },
      { id: 6, name: "Historical Tour Guiding", location: "Fort Canning Park", date: "2024-08-12", participants: 75 },
      { id: 7, name: "Local Library Organization", location: "Queenstown Library", date: "2024-08-18", participants: 50 },
      { id: 8, name: "River Cleanup", location: "Singapore River", date: "2024-09-01", participants: 200 },
  
    ];
  
  const mockUpcomingEvents: Event[] = [
    { id: 1, name: "Food Bank Assistance", location: "Woodlands", date: "2024-09-10", participants: 65 },
    { id: 2, name: "Elderly Home Visit", location: "Yishun", date: "2024-09-20", participants: 40 },
    { id: 3, name: "Beach Yoga Event", location: "Sentosa Beach", date: "2024-10-05", participants: 100 },
    { id: 4, name: "Heritage Tree Planting", location: "Botanic Gardens", date: "2024-10-12", participants: 150 },
    { id: 5, name: "Coastal Watch", location: "Changi Beach", date: "2024-10-22", participants: 110 },
    { id: 6, name: "Fitness for a Cause", location: "Bukit Timah Nature Reserve", date: "2024-11-02", participants: 130 },
    { id: 7, name: "Charity Concert", location: "Esplanade", date: "2024-11-15", participants: 300 },
    { id: 8, name: "Neighborhood Clean-up", location: "Hougang", date: "2024-12-05", participants: 85 },
    { id: 9, name: "Festival Volunteering", location: "Clarke Quay", date: "2024-12-20", participants: 250 },
    { id: 10, name: "New Year Event Preparation", location: "Marina Bay Sands", date: "2024-12-30", participants: 500 }
  
  ];

  


const UserEvents = () => {

    const [pastevents, setPastEvents] = useState<Event[]>([]);
    const [futureevents, setFutureEvents] = useState<Event[]>([]);

    useEffect(() => {
        // Simulate fetching data from an API
        setPastEvents(mockPastEvents);
        setFutureEvents(mockUpcomingEvents);
    }, []);

    let userAddress: Address = {
        lat: 0,
        lng: 0,
        address: ""
    }

    const [userLocation, setUserLocation] = useState({latitude: userAddress.lat, longitude: userAddress.lng});
    const [err, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        (() => {
            setLoading(true);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setLoading(false);
                    console.log("User location: ", latitude, longitude);
                },
                (error) => {
                    setError(error.message);
                    console.error("Error fetching user location: ", error);
                }
                );
            } else {
                console.log("Geolocation is not supported by this browser");
            } 
        })()
    }, []);

    console.log("User address: ", userLocation);

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
                            <EventMap lat={userLocation.latitude} lng={userLocation.longitude} address=""/>
                            <MDBContainer className="my-5" >
                                <h2 className="mb-4" style={{color: "var(--text-color)"}}>Upcoming Events</h2>
                                {futureevents.map((event) => (
                                    <MDBCard key={event.id} className="mb-3">
                                        <MDBCardBody>
                                            <MDBCardTitle>{event.name}</MDBCardTitle>
                                            <MDBCardText>
                                                Location: {event.location}
                                                <br />
                                                Date: {event.date}
                                                <br />
                                                Participants: {event.participants}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                ))}
                            </MDBContainer>

                            <MDBContainer className="my-5">
                                <h2 className="mb-4" style={{color: "var(--text-color)"}}>Completed Events</h2>
                                {pastevents.map((event) => (
                                    <MDBCard key={event.id} className="mb-3">
                                        <MDBCardBody>
                                            <MDBCardTitle>{event.name}</MDBCardTitle>
                                            <MDBCardText>
                                                Location: {event.location}
                                                <br />
                                                Date: {event.date}
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