import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

export const useAuthContext: Function = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error("useAuthContext must be used inside a AuthContext provider")
    }
    return context
}