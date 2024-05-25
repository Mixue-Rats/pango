import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import holiday_pango from '../assets/images/holiday_pango.png';
import corporate_pango from '../assets/images/corporate_pango.png';

const SelectUserType = () => {

    const navigate = useNavigate();

    return (
        <div className='page'>
            <Container>
                <Row className="">
                    <Col>
                        <h1 className='my-3 text-center'>Select User Type</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Card className="userTypeCard" onClick={() => navigate(`/login/volunteer`)} style={{ width: '18rem', height: "26rem" }}>
                            <Card.Img variant="top" src={holiday_pango} style={{padding: "1rem", width: "18rem", height: "20rem", transform: "rotate(3deg)"}} />
                            <Card.Body>
                                <Card.Title>Volunteer</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col> 
                    <Col className="text-center">
                        <Card className="userTypeCard" onClick={() => navigate(`/login/org`)} style={{ width: '18rem', height: "26rem" }}>
                            <Card.Img variant="top" src={corporate_pango} style={{marginBottom: "1rem", marginTop: "1rem", width: "18rem", height: "18rem", transform: "rotate(4deg)"}} />
                            <Card.Body>
                                <Card.Title>Organisation</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SelectUserType;