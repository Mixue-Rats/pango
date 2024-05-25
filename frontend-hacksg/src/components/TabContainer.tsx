import { Container, Tabs, Tab, Row, Col, Stack } from 'react-bootstrap';
import { Event, EventsListProps } from '../types/Event';
import LargeCard from './LargeCard';

const TabContainer = ({events}: EventsListProps) => {
    console.log("events at tab container: ", events)
    return (
        <Container className="p-3 mt-3">
            <Tabs defaultActiveKey="recommendations" id="event-tab-container" className="mb-3" fill>
                <Tab eventKey="recommendations" title="Robopango's Recommendations">
                    <div className="horizontal-scroll">
                    { events && events.length != 0 ? (events.map((event: Event) => (
                            <Col className='mx-2 px-1' key={event._id}>
                                <LargeCard {...event}/>
                            </Col>
                        ))) : (
                            <div className="alert alert-danger">No events found. Try refreshing the page?</div>
                        )}
                    </div>
                </Tab>
                <Tab eventKey="proximity" title="Close to me">
                    <div className="horizontal-scroll">
                        { events && events.length != 0 ? (events.map((event: Event) => (
                            <Col className='mx-2 px-1' key={event._id}>
                                <LargeCard {...event}/>
                            </Col>
                        ))) : (
                            <div className="alert alert-danger">No events found. Try refreshing the page?</div>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default TabContainer;