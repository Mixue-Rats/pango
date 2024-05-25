import { useState, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import EventMap from '../components/Map';
import Address from '../types/Address';

const UserEvents = () => {

    let userAddress: Address = {
        lat: 0,
        lng: 0,
        address: ""
    }

    const [userLocation, setUserLocation] = useState({latitude: userAddress.lat, longitude: userAddress.lng});
    const [error, setError] = useState(null);
    const [locationConfirmed, setLocationConfirmed] = useState(false);
    
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                console.log("User location: ", latitude, longitude);
            },
            (error) => {
                console.error("Error fetching user location: ", error);
            }
            );
        } else {
            console.log("Geolocation is not supported by this browser");
        } 
    };

    const confirmLocation = () => {
        console.log("userloca: ", userLocation.latitude, userLocation.longitude)
        userAddress = {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
            address: ""
        }
        setLocationConfirmed(true);
    }

    useMemo(() => {
        getUserLocation();
        confirmLocation();
        
    }, []);

    console.log("User address: ", userAddress);

    return (
        <div className="page">
            <Container>
                <Row>
                    { locationConfirmed ? (
                        <EventMap {...userAddress} />
                    ) : (
                        <p>Fetching location...</p>
                    ) }
                    
                </Row>
            </Container>
        </div>
    );
};

export default UserEvents;