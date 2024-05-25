import { useState, useEffect } from 'react';
import { useUserSignup } from '../hooks/useUserSignup';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const {signup, isLoading, error} = useUserSignup();

    const handleSignup = async (e: any) => {
        e.preventDefault();
        await signup(name, email, password);
    };

    return (
        <div className="page">
            <Container>
                <h2 className='mt-3'>Volunteer Signup</h2>
                <p className='mb-3'>Sign up as a volunteer today!</p>
                <Form className='my-3'>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <Form.Text className="text-muted">
                            Please choose a strong password.
                        </Form.Text>
                    </Form.Group>
                    {error && <label className="text-danger">{error}</label>}
                    <div className='text-center text-md-start mt-4 pt-2'>
                        { isLoading ? (
                            <Button className="mb-0 px-5" size='lg'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </Button>
                        ) : (
                            <Button className="mb-0 px-5" size='lg' onClick={handleSignup}>Register</Button>
                        )}
                        <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="/selectUserType" className="link-danger">Login</a></p>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default UserSignup;