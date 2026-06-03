import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleRegisterClick = () => {
        navigate('/register');
    }
    return (

        <div className="relative min-h-screen w-full flex flex-col">
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
                <div className= "flex gap-4 px-9">
                    <button onClick = {handleLoginClick}>
                        Login
                    </button>
                </div>
            </div>

            {/* Now we want to add the self-typing "Let's plan a wonderful trip!" */}
            <div className="flex-1 flex flex-col justify-center items-center text-center z-20">
                <h1 className="text-4xl font-cursive tracking-normal leading-relaxed antialiased animate-sweep p-5"
                    onAnimationEnd={() => setShowContent(true)}>
                        Let's plan a wonderful trip together!
                </h1>
                {/* Add the register button */}
                <div
                    className={`mt-6 h-10 transition-all duration-500 ease-out
                        ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                        `}
                >
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg" onClick={handleRegisterClick}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}