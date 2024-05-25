import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';

const SetPreferences = (props: any) => {

    const _preferredVolunteerType = ['Environmental', 'Animal', 'Social', 'Healthcare'];
    const _skills = ['Leadership', 'Communication', 'Technical', 'Organizational', 'Creativity', 'Problem Solving', 'Teamwork'];
    const _personalityTraits = ['Introverted', 'Extroverted', 'Ambivert', 'Analytical', 'Creative', 'Practical'];
    const _preferredDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [preferredVolunteerType, setPreferredVolunteerType]: [string[], Function] = useState([]);
    const [skills, setSkills]: [string[], Function] = useState([]);
    const [personalityTraits, setPersonalityTraits]: [string[], Function] = useState([]);
    const [preferredDays, setPreferredDays]: [string[], Function] = useState([]);
    const [preferredLocation, setPreferredLocation] = useState("");
    const [additionalPreferences, setAdditionalPreferences] = useState("");

    const paragraph = preferredVolunteerType + " " + skills + " " + personalityTraits + " " + preferredDays + " " + preferredLocation + " " + additionalPreferences;

    const handleSubmit = async () => {
        await axios.post('/api/v1/user/prefs', {
            email: props.email,
            preferredVolunteerType: preferredVolunteerType,
            skills: skills,
            personalityTraits: personalityTraits,
            preferredDays: preferredDays,
            preferredLocation: preferredLocation,
            additionalPreferences: paragraph
        })
        .then((res) => {
            console.log(res.data);

        })
        .catch((err) => {
            console.warn(err);
        });
    }

    return (
        <div className='page'>
        <Container>
            <h2 className='py-3'>Set Volunteer Preferences</h2>
            <Form> 
                <Form.Group className='mb-3' controlId='FormPreferredVolunteerType'>
                    <Form.Label>Preferred Volunteer Type</Form.Label>
                    <Form.Control as='select' value={preferredVolunteerType} multiple aria-label="Preferred Volunteer Type" onChange={(e) => setPreferredVolunteerType([...preferredVolunteerType, e.target.value])}>
                        {_preferredVolunteerType.map((opt: string, index) => {
                            return (<option value={opt} key={index}>{opt}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormSkills'>
                    <Form.Label>Skills</Form.Label>
                    <Form.Control as='select' value={skills} multiple aria-label="Skills" onChange={(e) => setSkills([...skills, e.target.value])}>
                        {_skills.map((opt: string, index) => {
                            return (<option value={opt} key={index}>{opt}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormPersonality'>
                    <Form.Label>Personality Traits</Form.Label>
                    <Form.Control as='select' value={personalityTraits} multiple aria-label="Personality Traits" onChange={(e) => setPersonalityTraits([...personalityTraits, e.target.value])}>
                        {_personalityTraits.map((opt: string, index) => {
                            return (<option value={opt} key={index}>{opt}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} className='mb-3' controlId='FormPreferredDays'>
                    <Form.Label>Preferred Days</Form.Label>
                    <Form.Control as="select" value={preferredDays} multiple aria-label="Preferred Days" onChange={(e) => setPreferredDays([...preferredDays, e.target.value])}>
                        {_preferredDays.map((opt: string, index) => {
                            return (<option value={opt} key={index}>{opt}</option>)
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
                <Button onClick={handleSubmit}>Save Preferences</Button>
            </Form>
            <div className='my-5'></div>
        </Container>
        </div>
    );
};

export default SetPreferences;