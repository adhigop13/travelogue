import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const notifySuccess = () => toast("Login succeeded!");
    const notifyFailure = () => toast("Login failed");
    async function handleLogin() {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {username,password});
            localStorage.setItem('token', response.data.token);
            console.log('Login successful: ');
            notifySuccess();
        } catch (error) {
            notifyFailure();
            console.error('Login failed:', error);
        }
    }

    return <div>
        <p> Login Page</p>
        <label>
        Username: <input value = {username}
        onChange={(e) => setUsername(e.target.value)}/>
        </label><br />
        <label>
        Password: <input name = "Username"
        type = "password"
        onChange={(e) => setPassword(e.target.value)}/>
        </label><br /><br />
        <button onClick={handleLogin}>
            Submit
        </button>
        <ToastContainer />
    </div>
}