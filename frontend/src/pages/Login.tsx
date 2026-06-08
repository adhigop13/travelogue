import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from "../src/config/api";


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    const notifySuccess = () => toast("Login succeeded!");
    const notifyFailure = () => toast("Login failed");
    async function handleLogin() {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {username,password});
            localStorage.setItem('token', response.data.token);
            console.log('Login successful: ');
            navigate('/dashboard');
            notifySuccess();
        } catch (error) {
            notifyFailure();
            console.error('Login failed:', error);
        }
    }

    return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background video */}
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            >
            <source src={`${assetUrl}/bg2.mp4`} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Travelogue logo */}
        <div className="p-8 w-full flex justify-center z-20">
            <Link to = "/" >
                <h1 className="font-sans text-2xl font-bold text-center mb-6 bg-transparent border-none">
                    travelogue
                </h1>
            </Link>
        </div>
        {/* Login card */}
        <div className="relative backdrop-blur-sm p-8 rounded-2xl shadow-lg w-96 border z-20">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                Welcome Back!
            </h1>
            <div className="space-y-4">
                <label className="block">
                    <span className="text-blue-500">
                        Username
                    </span>
                    <input value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </label>

                <label className="block">
                    <span className = "text-blue-500">
                        Password
                    </span>
                    <input name = "Username"
                        type = "password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </label>
                <div className = 'text-center'>
                    <button onClick={handleLogin} className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">   
                        Log in
                    </button>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
    )
}