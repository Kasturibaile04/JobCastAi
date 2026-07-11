import axios from "axios";

const api = axios.create({
    baseURL: "https://jobcastai-1.onrender.com",
    withCredentials: true // Keeps session fallback active if needed
});

// Interceptor: Automatically injects the token into headers if it exists in localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });
        
        // Save the token if received in the JSON body payload
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error; // <-- CRUCIAL: Throw the error so the UI/Context catches it!
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        });
        
        // Save the token if received in the JSON body payload
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error; // <-- CRUCIAL: Throw the error so the UI/Context catches it!
    }
}

export async function logout() {
    try {
        const response = await api.post("/api/auth/logout");
        localStorage.removeItem("token"); // Clear local token storage
        return response.data;
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.error("GetMe profile error:", error.response?.data || error.message);
        throw error;
    }
}