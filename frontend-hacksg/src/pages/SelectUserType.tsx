import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SelectUserType = () => {

    const navigate = useNavigate();

    return (
        <div className='page'>
            <Container>
                <Row className="">
                    <Col>
                        <h3 className='text-center'>Select User Type</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="vw-50 text-center">
                        <Button className="mb-0 px-5" size='lg' onClick={() => navigate(`/login/volunteer`)}>Volunteer</Button>
                    </Col>
                    <Col className="vw-50 text-center">
                        <Button className="mb-0 px-5" size='lg' onClick={() => navigate(`/login/org`)}>Organisation</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SelectUserType;