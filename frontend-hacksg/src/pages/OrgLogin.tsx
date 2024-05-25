import { useEffect, useState } from 'react';   
import { useLogin } from '../hooks/useLogin';
import { Container, Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

const OrgLogin = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <div className="page">
            <Container>
                <h2 className='py-3'>Organisation Login</h2>
                <Form>
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
                            <Button className="mb-0 px-5" size='lg' onClick={handleSubmit}>Login</Button>
                        )}
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/signup/org" className="link-danger">Register</a></p>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default OrgLogin;