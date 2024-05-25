import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='bg-body-tertiary'>
            <Container>
                <Row>
                    <Col>
                        <p>© 2024 Mixue Rats</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;