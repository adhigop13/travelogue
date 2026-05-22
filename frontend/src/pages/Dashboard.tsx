import { useEffect, useState } from 'react';
import type { TripType } from '../../../backend/src/types/trips';
import type { DayType } from "../../../backend/src/types/days";

export default function Dashboard() {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // If no token, we shouldn't even try to fetch
                if (!token) {
                    setError("No authentication token found.");
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/trips', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response)
                if (response.status === 404) {
                    // If no trips found, just set trips to empty and stop loading
                    setTrips([]);
                    setLoading(false);
                    return; 
                }

                if (!response.ok) throw new Error("Failed to fetch trips.");

                const data: TripType[] = await response.json();
                setTrips(data);
            } catch (err: any) {
                console.log(err)
                setError(err.message || "Failed to load trips.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };

    if (loading) return <div style={{ padding: '20px' }}>Syncing with Travelogue...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div className="min-h-screen p-8">

            <div className="flex items-center p-4">
                <div className="flex-1"></div>
                <div className='flex-1 text-center text-xl font-bold p-8 italic'>
                    <h1>My Itineraries</h1>
                </div>
                <div className='flex-1 flex justify-end'>
                    <button className= 'rounded-lg' onClick={handleLogout} >Logout</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6">

                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <div
                            key={trip._id}
                            onClick={() => ""}
                            className="
                            p-6
                            bg-white
                            rounded-2xl
                            cursor-pointer
                            shadow-md
                            hover:shadow-xl
                            hover:scale-105
                            transition
                            "
                        >
                            <h2 className="text-black text-2xl italic">
                                {trip.tripName}
                            </h2>

                            <p className="text-gray-500">
                                <strong>Plan:</strong> {trip.daysArray.length} days scheduled
                            </p>

                            <small className="text-gray-400">
                                Trip ID: {trip._id}
                            </small>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center mt-10">
                        <h3>No trips found.</h3>
                        <p>When you add a trip via the API, it will appear here.</p>
                    </div>
                )}

            </div>

            
        </div>
    );
}