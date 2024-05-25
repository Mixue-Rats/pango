import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUserSignup } from '../hooks/useUserSignup';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const {signup, isLoading, error} = useUserSignup();

    const [secondError, setError] = useState(null);

    const [waiting, setWaiting] = useState(false);

    const handleSubmit = async () => {
        await axios.post('/api/v1/user/prefs', {
            email: email,
            preferredVolunteerType: preferredVolunteerType,
            skills: skills,
            personalityTraits: personalityTraits,
            availableDays: availableDays,
            preferredLocation: preferredLocation,
            additionalPreferences: paragraph
        })
        .then((res) => {
            setWaiting(false);
            console.log(res.data);
            navigate('/home');
        })
        .catch((err) => {
            console.warn(err);
            setError(err);
        });
    }

    const handleSignup = async (e: any) => {
        e.preventDefault();
        await signup(name.trim(), email.trim(), password);
        setWaiting(true);
        await new Promise(r => setTimeout(r, 5000));
        if (!isLoading && !error) {
            await handleSubmit();
        }
    };

    const _preferredVolunteerType = ['Environmental', 'Animal', 'Social', 'Healthcare'];
    const _skills = ['Leadership', 'Communication', 'Technical', 'Organizational', 'Creativity', 'Problem Solving', 'Teamwork'];
    const _personalityTraits = ['Introverted', 'Extroverted', 'Ambivert', 'Analytical', 'Creative', 'Practical'];
    const _preferredDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [preferredVolunteerType, setPreferredVolunteerType]: [string[], Function] = useState([]);
    const [skills, setSkills]: [string[], Function] = useState([]);
    const [personalityTraits, setPersonalityTraits]: [string[], Function] = useState([]);
    const [availableDays, setAvailableDays]: [string[], Function] = useState([]);
    const [preferredLocation, setPreferredLocation] = useState("");
    const [additionalPreferences, setAdditionalPreferences] = useState("");

    const paragraph = preferredVolunteerType + " " + skills + " " + personalityTraits + " " + availableDays + " " + preferredLocation + " " + additionalPreferences;

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
                    <Form.Group className='mb-3' controlId='FormPreferredVolunteerType'>
                        <Form.Label>Preferred Volunteer Type</Form.Label>
                        <Form.Control as='select' value={preferredVolunteerType} multiple aria-label="Preferred Volunteer Type" onChange={(e) => setPreferredVolunteerType([...preferredVolunteerType, e.target.value])}>
                            {_preferredVolunteerType.map((opt: string) => {
                                return (<option value={opt} key={_preferredVolunteerType.indexOf(opt)}>{opt}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormSkills'>
                        <Form.Label>Skills</Form.Label>
                        <Form.Control as='select' value={skills} multiple aria-label="Skills" onChange={(e) => setSkills([...skills, e.target.value])}>
                            {_skills.map((opt: string) => {
                                return (<option value={opt} key={_skills.indexOf(opt)}>{opt}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormPersonality'>
                        <Form.Label>Personality Traits</Form.Label>
                        <Form.Control as='select' value={personalityTraits} multiple aria-label="Personality Traits" onChange={(e) => setPersonalityTraits([...personalityTraits, e.target.value])}>
                            {_personalityTraits.map((opt: string) => {
                                return (<option value={opt} key={_personalityTraits.indexOf(opt)}>{opt}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3' controlId='FormPreferredDays'>
                        <Form.Label>Preferred Days</Form.Label>
                        <Form.Control as="select" value={availableDays} multiple aria-label="Preferred Days" onChange={(e) => setAvailableDays([...availableDays, e.target.value])}>
                            {_preferredDays.map((opt: string) => {
                                return (<option value={opt} key={_preferredDays.indexOf(opt)}>{opt}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormPreferredLocation'>
                        <Form.Label>Preferred Location</Form.Label>
                        <Form.Control type='text' placeholder='Enter your preferred location here' onChange={(e) => setPreferredLocation(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormAdditionalInfo'>
                        <Form.Label>Additional Information</Form.Label>
                        <Form.Control as='textarea' placeholder='Write any additional information here' onChange={(e) => setAdditionalPreferences(e.target.value)}/>
                    </Form.Group>
                    {error && <label className="text-danger">{error}</label>}
                    {secondError && <label className="text-danger">Something went wrong.</label>}
                    <div className='text-center text-md-start mt-4 pt-2'>
                        { isLoading || waiting ? (
                            <Button className="mb-0 px-5" size='lg'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </Button>
                        ) : name && email && password ? (
                            <Button className="mb-0 px-5" size='lg' onClick={handleSignup}>Register</Button>
                        ) : (
                            <Button className="mb-0 px-5" size='lg' disabled>Register</Button>
                        )}
                        <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="/selectUserType" className="link-danger">Login</a></p>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default UserSignup;