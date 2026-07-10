import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../auth.form.scss";
import { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';


const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { Loading, handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/dashboard");

    }

    if (Loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="Username">Usename</label>
                        <input onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="Username" name="Username" placeholder='Enter your Username' />
                    </div>
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
                    <button className="button  primary-button" type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>

            </div>
        </main>
    )
}

export default Register