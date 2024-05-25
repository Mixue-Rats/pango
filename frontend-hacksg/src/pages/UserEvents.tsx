import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import EventMap from '../components/EventMap';
import Address from '../types/Address';

const UserEvents = () => {

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
            <Container>
                <Row>
                    { loading ? (
                        <p>Loading...</p>
                    ) : err ? (
                        <p>{err}</p>
                    ) : (
                        <EventMap lat={userLocation.latitude} lng={userLocation.longitude} address=""/>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default UserEvents;