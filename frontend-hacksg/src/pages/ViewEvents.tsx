import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from 'mdb-react-ui-kit';

// Define the type for an event
interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  participants: number;
}

// Mock data
const mockEvents: Event[] = [
    { id: 1, name: "Beach Cleanup", location: "East Coast Park", date: "2024-06-25", participants: 150 },
    { id: 2, name: "Tree Planting Day", location: "Bishan Park", date: "2024-07-01", participants: 80 },
    { id: 3, name: "Charity Run", location: "Marina Bay", date: "2024-07-15", participants: 200 },
    { id: 4, name: "Community Painting", location: "Jurong West", date: "2024-07-20", participants: 90 },
    { id: 5, name: "Recycling Drive", location: "Tampines Hub", date: "2024-08-05", participants: 120 },
    { id: 6, name: "Historical Tour Guiding", location: "Fort Canning Park", date: "2024-08-12", participants: 75 },
    { id: 7, name: "Local Library Organization", location: "Queenstown Library", date: "2024-08-18", participants: 50 },
    { id: 8, name: "River Cleanup", location: "Singapore River", date: "2024-09-01", participants: 200 },
    { id: 9, name: "Food Bank Assistance", location: "Woodlands", date: "2024-09-10", participants: 65 },
    { id: 10, name: "Elderly Home Visit", location: "Yishun", date: "2024-09-20", participants: 40 },
    { id: 11, name: "Beach Yoga Event", location: "Sentosa Beach", date: "2024-10-05", participants: 100 },
    { id: 12, name: "Heritage Tree Planting", location: "Botanic Gardens", date: "2024-10-12", participants: 150 },
    { id: 13, name: "Coastal Watch", location: "Changi Beach", date: "2024-10-22", participants: 110 },
    { id: 14, name: "Fitness for a Cause", location: "Bukit Timah Nature Reserve", date: "2024-11-02", participants: 130 },
    { id: 15, name: "Charity Concert", location: "Esplanade", date: "2024-11-15", participants: 300 },
    { id: 16, name: "Neighborhood Clean-up", location: "Hougang", date: "2024-12-05", participants: 85 },
    { id: 17, name: "Festival Volunteering", location: "Clarke Quay", date: "2024-12-20", participants: 250 },
    { id: 18, name: "New Year Event Preparation", location: "Marina Bay Sands", date: "2024-12-30", participants: 500 }
  ];
  
const ViewEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setEvents(mockEvents);
  }, []);

  return (
    <MDBContainer className="my-5">
      <h2 className="mb-4">Upcoming Events</h2>
      {events.map((event) => (
        <MDBCard key={event.id} className="mb-3">
          <MDBCardBody>
            <MDBCardTitle>{event.name}</MDBCardTitle>
            <MDBCardText>
              Location: {event.location}
              <br />
              Date: {event.date}
              <br />
              Participants: {event.participants}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBContainer>
  );
}

export default ViewEvents;
