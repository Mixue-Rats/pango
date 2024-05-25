import { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';

import { Event } from '../types/Event';

import map_icon from '../assets/images/map_icon.png';
import sprout from '../assets/images/sprout.png';

const API_KEY = "AIzaSyD4Bz14fWxxz5e8u6qsTy5seHotgy8ExDA"

const MAP_ID = "theMap";

const EventMap = (props: any) => {


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
        <APIProvider apiKey={API_KEY}>
            <Map
                style={{width: '100vw', height: '50vh'}}
                defaultCenter={{lat: props.lat, lng: props.lng}}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={MAP_ID}

            >
                <AdvancedMarker position={{lat: props.lat, lng: props.lng}}>
                    <img src={map_icon} width={57} height={48} /> 
                </AdvancedMarker>
                { props.events && props.events.map((event: Event) => (
                    <MarkerWithInfoWindow key={event._id} {...event} />
                ))}
            </Map>
        </APIProvider>
    );
};

export default EventMap;