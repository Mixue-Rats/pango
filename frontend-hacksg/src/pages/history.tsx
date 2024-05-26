import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '../types/Event';
import PaginatedCards from '../components/PaginatedCards';
import { useAuthContext } from '../hooks/useAuthContext';
import withAuth from '../components/Auth';
import { Container } from 'react-bootstrap';



const HistoryPage: React.FC = () => {
    const { user } = useAuthContext();
    const [events, setEvents] = useState<Event[]>([]);
    const [err, setError] = useState("");

    
    
    useEffect(() => {
        const fetchEvents = async () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set today date to start of the day

            try {
                console.log(user.user.email)
                const res = await axios.get(`/events/joinedByUser/${user.user.email}`);
                const filteredEvents = res.data.filter((event: Event) => {
                    const eventDate = new Date(event.startDateTime);
                    return eventDate <= today; // Keep only events that have passed
                });
                setEvents(filteredEvents);
                console.log(filteredEvents);
            } catch (error) {
                console.warn(error);
                setError("Failed to fetch events");
                
            }
        };

        fetchEvents();
    }, []);

    
    return (
        <div className='page'>
            <Container className='mt-3'>
                <h1 className='m-3'>History</h1>
                <PaginatedCards events={events}/>
            </Container>
        </div>
    );
};

export default withAuth(HistoryPage);
