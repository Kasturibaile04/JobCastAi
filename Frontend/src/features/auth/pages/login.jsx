import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from '../Hooks/useAuth'
import { useState } from 'react'


const login = () => {

    const { Loading, handleLogin } = useAuth()

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password })
        navigate("/dashboard");
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
                        <input onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder='Enter your email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder='Enter your password' />
                    </div>
                    <button className="button  primary-button" type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default login

