// withAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const withAuth = (WrappedComponent: any) => {

    return (props: any) => {
        
        const navigate = useNavigate();
        const { user } = useAuthContext();
        
        useEffect(() => {
            (async () => {
                if (user && !user.user) {
                    navigate('/selectUserType');
                }
            })();
        }, [user, navigate]);

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
