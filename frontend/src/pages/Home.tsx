import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>

            <p>This is homepage</p>
            <button onClick = {() => navigate('/login')}>Go to Login page</button>
        </>
    )
}