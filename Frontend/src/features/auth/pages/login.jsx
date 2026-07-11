import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from '../Hooks/useAuth'

const Login = () => {

    const { Loading, handleLogin } = useAuth()
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await handleLogin({ email, password });
            navigate("/dashboard");
        } catch (err) {
            // Better error handling - show backend message or fallback
            const message = err?.response?.data?.message 
                || err?.message 
                || "Login failed. Please check your credentials.";
            setError(message);
        }
    }

    if (Loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Enter your email' 
                            value={email} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder='Enter your password' 
                            value={password} 
                            required
                            minLength={6}
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button className="button primary-button" type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login