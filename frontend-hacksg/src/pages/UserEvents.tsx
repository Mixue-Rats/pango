import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import EventMap from '../components/EventMap';
import TabContainer from '../components/TabContainer';
import { Event } from '../types/Event';

const UserEvents = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [err, setError] = useState("");

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

    return (
        <div className="page">
            <EventMap events={events}/>
            <TabContainer events={events}/>
        </div>
    );
};

export default UserEvents;
