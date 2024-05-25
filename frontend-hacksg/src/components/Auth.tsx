// withAuth.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const { user } = useAuthContext();
        const navigate = useNavigate();

        React.useEffect(() => {
            if (!user || !user.user) {
                navigate('/selectUserType');
            }
        }, [user, navigate]);

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
