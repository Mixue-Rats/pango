import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Container, Row } from 'react-bootstrap';

import Address from '../types/Address';

const API_KEY = "AIzaSyD4Bz14fWxxz5e8u6qsTy5seHotgy8ExDA"

const EventMap = ({lat, lng}: Address) => {

    return (
        <Container>
            <Row>
                <APIProvider apiKey={API_KEY}>
                    <Map
                        style={{width: '100vw', height: '50vh'}}
                        defaultCenter={{lat, lng}}
                        defaultZoom={12}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    />
                </APIProvider>
            </Row>
        </Container>
    );
};

export default EventMap;