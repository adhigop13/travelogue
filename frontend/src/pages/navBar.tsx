// Navbar with logout button
export default function NavBar() {
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };
    
    return (
        <div className="flex justify-between w-full bg-black z-50">
            <div className = 'font-sans text-2xl font-bold px-4 py-3'>
                travelogue
            </div>
            <div className="px-4 py-3">
                <a className = "cursor-pointer p-2 mt-0.5 text-white!" onClick = {handleLogout}>
                    Logout
                </a>
            </div>
        </div>
    )
}