import { Button, Card } from 'react-bootstrap'
import { Event } from '../types/Event'

import { getDate, getTime } from '../constants/convertDateTime'

import kids from '../assets/images/thumbnails/kids.png'

const LongCard = (event: Event) => {
    return (
        <Card style={{ width: '25rem', height: '20rem', maxHeight: '18rem'}}>
            <Card.Body>
                <Card.Img className='mb-2 rounded' variant="top" src={kids} width='170' height='140'/>
                <Card.Title className="h4 mb-3">{event.title}</Card.Title>
                <Card.Subtitle className='mb-2'>Date: {getDate(event.startDateTime)}</Card.Subtitle>
                <Card.Subtitle className='mb-2'>From {getTime(event.startDateTime)} to {getTime(event.endDateTime)}</Card.Subtitle>
                <Card.Text className='mb-2 overflow-hidden text-truncate'>{event.desc}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LongCard;