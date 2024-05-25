import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Event } from '../types/Event'
import EventModal from './EventModal'

import { convertDateTime, getTime } from '../constants/convertDateTime'

import kids from '../assets/images/thumbnails/kids.jpg'

const LargeCard = ({...event}: Event) => {

    console.log("event at large card: ", event)

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Card onClick={() => setModalShow(true)} style={{ width: '18rem', height: '20rem', maxHeight: '18rem'}}>
                <Card.Body>
                    <Card.Img className='mb-2 rounded' variant="top" src={kids} width='100' height='140'/>
                    <Card.Title className="h4 mb-3">{event.title}</Card.Title>
                    <Card.Subtitle className='mb-2'>Date: {convertDateTime(event.startDateTime)}</Card.Subtitle>
                    <Card.Subtitle className='mb-2'>From {getTime(event.startDateTime)} to {getTime(event.endDateTime)}</Card.Subtitle>
                    <Card.Text className='mb-2 overflow-hidden text-truncate'>{event.desc}</Card.Text>
                </Card.Body>
            </Card>
            <EventModal show={modalShow} onHide={() => setModalShow(false)} volunteer_event={event} />
        </>
    )
}

export default LargeCard;