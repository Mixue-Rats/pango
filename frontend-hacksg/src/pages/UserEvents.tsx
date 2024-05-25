import axios from 'axios';
import { useState, useEffect } from 'react';
import EventMap from '../components/EventMap';
import TabContainer from '../components/TabContainer';
import { Event } from '../types/Event';

import { Container, Row } from 'react-bootstrap';

import Address from '../types/Address';

const UserEvents = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState("");

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

    let userAddress: Address = {
        lat: 0,
        lng: 0,
        address: ""
    }

    const [userLocation, setUserLocation] = useState({latitude: userAddress.lat, longitude: userAddress.lng});
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
                    setLoading(false);
                    console.error("Error fetching user location: ", error);
                }
                );
            } else {
                console.log("Geolocation is not supported by this browser");
            } 
        })()
    }, []);

    return (
        <div className="page">
            <Container>
                <Row>
                    { loading ? (
                            <div className="alert alert-primary">Loading</div>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : (
                            <EventMap events={events} lat={userLocation.latitude} lng={userLocation.longitude}/>
                        )
                    }   
                </Row>
            </Container>
            
            <TabContainer events={events} lat={userLocation.latitude} lng={userLocation.longitude}/>
        </div>
    );
};

export default UserEvents;
