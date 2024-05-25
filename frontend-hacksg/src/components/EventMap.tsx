import { useEffect, useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { Container, Row } from 'react-bootstrap';

import Address from '../types/Address';
import { Event, EventsListProps } from '../types/Event';

import map_icon from '../assets/images/map_icon.png';
import sprout from '../assets/images/sprout.png';

const API_KEY = "AIzaSyD4Bz14fWxxz5e8u6qsTy5seHotgy8ExDA"

const MAP_ID = "theMap";

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
                    setLoading(false);
                    console.error("Error fetching user location: ", error);
                }
                );
            } else {
                console.log("Geolocation is not supported by this browser");
            } 
        })()
    }, []);

    const MarkerWithInfoWindow = ({...event}: Event) => {
        // `markerRef` and `marker` are needed to establish the connection between
        // the marker and infowindow (if you're using the Marker component, you
        // can use the `useMarkerRef` hook instead).
        const [markerRef, marker] = useAdvancedMarkerRef();
        
        const [infoWindowShown, setInfoWindowShown] = useState(false);
        
        // clicking the marker will toggle the infowindow
        const handleMarkerClick = useCallback(() =>
            setInfoWindowShown(isShown => !isShown),
            []
        );
        
        // if the maps api closes the infowindow, we have to synchronize our state
        const handleClose = useCallback(() => setInfoWindowShown(false), []);
        
        return (
            <>
            <AdvancedMarker
                ref={markerRef}
                position={{lat: event.lat, lng: event.lng}}
                onClick={handleMarkerClick}
            >
                <img src={sprout} width={40} height={40} />
            </AdvancedMarker>
        
            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose}>
                    <h4>{event.title}</h4>
                    <p>{event.desc}</p>
                </InfoWindow>
            )}
            </>
        );
    };

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
                            mapId={MAP_ID}

                        >
                            <AdvancedMarker position={{lat: userLocation.latitude, lng: userLocation.longitude}}>
                                <img src={map_icon} width={57} height={48} /> 
                            </AdvancedMarker>
                            { events && events.map((event) => (
                                <MarkerWithInfoWindow key={event._id} {...event} />
                            ))}
                        </Map>
                </APIProvider>
                )}
            </Row>
        </Container>
    );
};

export default EventMap;