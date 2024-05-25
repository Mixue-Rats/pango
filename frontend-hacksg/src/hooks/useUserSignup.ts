import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const signupPath = '/api/v1/user/signup';

// Once a user signs up, user is also logged in.
export const useUserSignup = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (fullname: string, email: string, password: string) => {
        setLoading(true)
        setError(null)
        // Send signup request.
        const resp = await fetch(signupPath, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                fullname, email, password
            })
        })
        const json = await resp.json()
        if (!resp.ok) {
            setLoading(false)
            setError(json.message)
            console.warn(json.message)
        }
        if (resp.ok) {
            // Save user info to local storage
            // {email, username, user, token} is returned upon successful signup
            localStorage.setItem('user', JSON.stringify(json))
            // Update auth context
            dispatch({type : 'LOGIN', payload : json})
            setLoading(false)
            navigate('/profile/volunteer')
        }
    }
    return {signup, isLoading, error}
}