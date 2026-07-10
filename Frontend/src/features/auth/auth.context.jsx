import { createContext, useState,useEffect } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (err) {
                // 401 means no active session - treat as logged out, not a crash
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, Loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );

};