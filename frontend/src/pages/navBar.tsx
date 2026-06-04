// Navbar with logout button
export default function NavBar() {
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };
    
    return (
        <div className="flex justify-between w-full bg-black">
            <div className = 'font-sans text-2xl font-bold px-4 py-3'>
                travelogue
            </div>
            <div className= "flex gap-4 px-9">
                <button onClick = {handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}