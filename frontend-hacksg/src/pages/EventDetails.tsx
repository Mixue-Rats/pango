import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';


interface EventDetail {
    id: number;
    name: string;
    location: string;
    date: string;
    description: string;
    participantsCount: number;
  }
  
  interface Participant {
    id: number;
    name: string;
  }

const EventDetails: React.FC = () => {
  // Dummy event details
  const event: EventDetail = {
    id: 1,
    name: "Beach Cleanup",
    location: "East Coast Park",
    date: "2024-06-25",
    description: "Join us to clean up East Coast Park and help preserve marine life!",
    participantsCount: 150
  };

  // Dummy participants list
  const participants: Participant[] = [
    { id: 1, name: "Shawn Tan" },
    
    { id: 2, name: "Wei Jie Lim" },
    { id: 3, name: "Hui Min Lee" },
    { id: 4, name: "Xiao Ming" },
  ];

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{event.name}</MDBCardTitle>
          <MDBCardText>
            <strong>Location:</strong> {event.location}
            <br />
            <strong>Date:</strong> {event.date}
            <br />
            <strong>Description:</strong> {event.description}
            <br />
            <strong>Participants:</strong> {event.participantsCount}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <h3 className="mt-4">Participants: {participants.length}</h3>
      <MDBListGroup style={{ maxWidth: '400px' }}>
        {participants.map((participant) => (
          <MDBListGroupItem key={participant.id}>{participant.name}</MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBContainer>
  );
}

export default EventDetails;
