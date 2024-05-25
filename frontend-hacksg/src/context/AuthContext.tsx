import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user : action.payload}
        case 'LOGOUT':
            return {user : null}
        default:
            return state
    }
};

export const AuthContextProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, {user : null});

    useEffect(() => {
        const userObj: string | null = localStorage.getItem('user');
        if (!userObj) {
            return;
        }
        const user = JSON.parse(userObj);
        if (user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, []);

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};