import React from 'react';
import LongCard from '../components/LongCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import test from '../assets/images/banner.png';
import { Event } from '../types/Event';
import TabContainer from '../components/TabContainer';
import PaginatedCards from '../components/PaginatedCards';
import { useAuthContext } from '../hooks/useAuthContext';
import withAuth from '../components/Auth';


const Upcoming: React.FC = () => {
    const { user } = useAuthContext();
    const [events, setEvents] = useState<Event[]>([]);
    const [err, setError] = useState("");
    
    useEffect(() => {
        const fetchEvents = async () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set today date to start of the day

            try {
                const res = await axios.get(`/joinedByUser/${user.user.email}`);
                const filteredEvents = res.data.filter((event: Event) => {
                    const eventDate = new Date(event.startDateTime);
                    return eventDate <= today; // Keep only events up to today
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
        <div>
            <h1>Upcoming</h1>
            <PaginatedCards events={events}/>
                
        </div>
    );
};

export default withAuth(Upcoming);
