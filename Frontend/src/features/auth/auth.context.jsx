import { createContext, useState, useEffect } from "react";
import { getMe, login as loginApi, register as registerApi, logout as logoutApi } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);

    // 1. Check for an existing authenticated profile session on load
    useEffect(() => {
        const getAndSetUser = async () => {
            const localToken = localStorage.getItem("token");
            
            // If there's no token locally, don't hit the server; save network overhead
            if (!localToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const data = await getMe();
                if (data && data.user) {
                    setUser(data.user);
                } else {
                    // Fallback if data format returns weirdly
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (err) {
                // If token is invalid/expired, wipe local tracking clean
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

    // 2. Centralized Safe Login Handler
    const login = async (credentials) => {
        try {
            const data = await loginApi(credentials);
            if (data && data.user) {
                setUser(data.user);
                return data;
            }
        } catch (error) {
            // Extracts server error messages cleanly (e.g., "Invalid credentials" from File 1)
            const message = error.response?.data?.message || "Login failed. Please try again.";
            alert(message);
            throw error; 
        }
    };

    // 3. Centralized Safe Registration Handler
    const register = async (userData) => {
        try {
            const data = await registerApi(userData);
            if (data && data.user) {
                setUser(data.user);
                return data;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed.";
            alert(message);
            throw error;
        }
    };

    // 4. Centralized Safe Logout Handler
    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error("Logout error cleanly bypassed on UI:", error);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, Loading, setLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};