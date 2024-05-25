import Card from 'react-bootstrap/Card'
import { Event } from '../types/Event'

const LargeCard = (event: Event) => {
    return (
        <Card className='border border-warning '>
            <Card.Body className="overflow-hidden">
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle>{event.startDate}</Card.Subtitle>
                <Card.Text className='border border-danger overflow-hidden'>{event.desc}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LargeCard;