import axios from 'axios';
import { useState, useEffect } from 'react';
import EventMap from '../components/EventMap';
import TabContainer from '../components/TabContainer';
import { Event } from '../types/Event';
import withAuth from '../components/Auth';


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

    return (
        <div className="page">
            <EventMap events={events}/>
            <TabContainer events={events}/>
        </div>
    );
};

export default withAuth(UserEvents);
