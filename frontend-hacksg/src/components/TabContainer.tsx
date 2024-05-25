import { Container, Tabs, Tab, Row, Col, Stack } from 'react-bootstrap';
import { Event, EventsListProps } from '../types/Event';
import LargeCard from './LargeCard';

const TabContainer = ({events}: EventsListProps) => {
    return (
        <Container className="p-3 mt-3">
            <Tabs defaultActiveKey="recommendations" id="event-tab-container" className="mb-3" fill>
                <Tab eventKey="recommendations" title="Robopango's Recommendations">
                    <div className="horizontal-scroll">
                        {events && events.map((event: Event) => (
                            <Col className='mx-2 px-1' key={event._id}>
                                <LargeCard {...event}/>
                            </Col>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="proximity" title="Close to me">
                    <Row className="overflow-scroll" direction='horizontal' gap={3}>
                        <Col className=''>
                            {events && events.map((event: Event) => (
                                <LargeCard key={event._id} {...event}/>
                            ))}
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default TabContainer;