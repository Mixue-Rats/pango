import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const loginPath = '/api/v1/user/signin'

// Once a user signs up, user is also logged in.
export const useOrgLogin = () => {

    const navigate = useNavigate();
    
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        // Send login request.
        const resp = await fetch(loginPath, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email, password
            })
        })
        const json = await resp.json()
        if (!resp.ok) {
            setLoading(false)
            setError(json.error)
            console.log(json.error)
        }
        if (resp.ok) {
            // Save user info to local storage
            // {email, username, user, token} is returned upon successful login
            localStorage.setItem('user', JSON.stringify(json))
            // Update auth context
            dispatch({type : 'LOGIN', payload : json})
            setLoading(false)
            navigate('/profile/org')
        }
    }
    return {login, isLoading, error}
}