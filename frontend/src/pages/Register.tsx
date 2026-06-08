import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from "../src/config/api";

export default function Register() {
    const navigate = useNavigate();
    const [onSubmit, setSubmitState] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    const notifySuccess = () => toast("Registration successful");
    const notifyFailure = () => toast("Registration failed");

    const handleLoginClick = () => {
        navigate('/login');
    }
    async function handleSubmit() {
        try {
            if (!username.trim()) {
            toast("Username cannot be empty!");
            return;
            }

            if (!email.trim()) {
                toast("Email cannot be empty!");
                return;
            }

            if (!password.trim()) {
                toast("Password cannot be empty!");
                return;
            }
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {username: username, email: email, password: password});
            notifySuccess();
            console.log(response.data);
        } catch (error: any) {
            console.error(error);

            if (error?.response?.data?.message) {
                toast(error.response.data.message);
            } else {
                notifyFailure();
            }
        }
    }

    return (

        <div className="min-h-screen w-full flex flex-col">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                >
                <source src={`${assetUrl}/airplane-flying.mp4`} type="video/mp4" />
            </video>
            
        
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* navBar with login & register buttons and Travelogue site name */}
            <div className="flex justify-between w-full bg-black z-20">
                <div className = 'font-sans text-2xl font-bold px-4 py-3'>
                    travelogue
                </div>
                <div className= "flex px-9">
                    <button onClick = {handleLoginClick}>
                        Login
                    </button>
                </div>
            </div>

            {/* Registration card */}
            <div className="flex flex-col self-center my-auto backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full sm:w-96 border z-20">
                <h1 className="text-white text-3xl font-bold text-center mb-6">
                    Let's get started!
                </h1>

                <div className="flex flex-col p-3">
                    <label className="block">
                        <span className="text-xl text-white-500">
                            Username
                        </span>
                    </label>
                    <input value = {username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-1 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>
                
                <div className="flex flex-col p-3">
                    <label className="block">
                        <span className="text-xl text-white-500">
                            Email
                        </span>
                    </label>
                    <input value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-1 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>

                <div className="flex flex-col p-3">
                    <label className="block">
                        <span className="text-xl text-white-500">
                            Password
                        </span>
                            </label>
                    <input value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            type= "password" className="w-full px-3 py-1 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>

                <div className="p-2 flex justify-center">
                    <a className="inline-block px-8 py-3 rounded-3xl font-bold text-center cursor-pointer bg-[navy] text-white!"
                    onClick={handleSubmit}>
                        Submit
                    </a>
                </div>


            </div>
            <ToastContainer />
        </div>                  
    )
}