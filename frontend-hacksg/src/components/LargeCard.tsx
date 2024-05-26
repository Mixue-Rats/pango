import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Event } from '../types/Event'
import EventModal from './EventModal'

import { getDate, getTime } from '../constants/convertDateTime'

import beach_cleanup from '../assets/images/thumbnails/beach-cleanup.png'
import default_img from '../assets/images/thumbnails/default.png'
import food_drive from '../assets/images/thumbnails/food-drive.png'
import kids from '../assets/images/thumbnails/kids.png'
import elderly_help from '../assets/images/thumbnails/elderly-help.png'
import volunteer from '../assets/images/thumbnails/volunteer-1.png'

import '../App.css'

const imageMap = {
    'beach_cleanup': beach_cleanup,
    'default': default_img,
    'food_drive': food_drive,
    'kids': kids,
    'elderly_help': elderly_help,
    'volunteer': volunteer
}

const LargeCard = ({...event}: Event) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Card onClick={() => setModalShow(true)} className='largeCard' style={{color:'smokewhite', width: '18rem', height: '20rem', maxHeight: '18rem'}}>
                <Card.Body style={{fontSize:'10px'}}>
                    <Card.Img className='mb-2 rounded' variant="top" src={imageMap[event.image as keyof typeof imageMap]} width='100' height='140'/>
                    <Card.Title style={{fontSize:'15px', fontWeight:'bold'}} className="h4 mb-3">{event.title}</Card.Title>
                    <Card.Subtitle className='mb-2' >Date: {getDate(event.startDateTime)}</Card.Subtitle>
                    <Card.Subtitle className='mb-2' >From {getTime(event.startDateTime)} to {getTime(event.endDateTime)}</Card.Subtitle>
                    <Card.Text className='mb-2 overflow-hidden text-truncate'>{event.desc}</Card.Text>
                </Card.Body>
            </Card>
            <EventModal show={modalShow} onHide={() => setModalShow(false)} volunteer_event={event} />
        </>
    )
}

export default LargeCard;