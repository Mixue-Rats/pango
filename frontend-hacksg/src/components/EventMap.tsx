import { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Container, Row } from 'react-bootstrap';

import Address from '../types/Address';
import { EventsListProps } from '../types/Event';

const API_KEY = "AIzaSyD4Bz14fWxxz5e8u6qsTy5seHotgy8ExDA"

const EventMap = ({events}: EventsListProps) => {

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

    return (
        <Container>
            <Row>
                { loading ? (
                    <p className='my-5 text-center'>Loading...</p>
                ) : err ? (
                    <p className='my-5 text-center text-danger'>{err}</p>
                ) : (
                    <APIProvider apiKey={API_KEY}>
                        <Map
                            style={{width: '100vw', height: '50vh'}}
                            defaultCenter={{lat: userLocation.latitude, lng: userLocation.longitude}}
                            defaultZoom={12}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                            <Marker position={{lat: userLocation.latitude, lng: userLocation.longitude}} />
                        </Map>
                </APIProvider>
                )}
            </Row>
        </Container>
    );
};

export default EventMap;