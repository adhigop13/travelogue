import { useEffect, useState, type SetStateAction } from 'react';
import type { TripType } from '../../../backend/src/types/trips';
import type { DayType } from "../../../backend/src/types/days";
import { Link } from 'react-router-dom';
import NavBar from './navBar';
import ViewTripDetails from './ViewTripDetails';

export default function Dashboard() {
    const [trips, setTrips] = useState<TripType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showTripInfoButton, setTripInfoButton] = useState<TripType | null>(null);
        
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // If no token, we shouldn't even try to fetch
                if (!token) {   // Not a great way to do validation. Need to check if token is valid, not just presence. Fix later.
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


    // if (loading) return <div style={{ padding: '20px' }}>Syncing with Travelogue...</div>;
    // if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div className="flex flex-col items-center relative z-0">
            {/* navBar with logout button and Travelogue site name */}
            <NavBar></NavBar>


            <div className='flex flex-row justify-between items-center'>
                <h1 className='font-sans text-center text-xl font-bold p-8'>My Itineraries</h1>
                <a className='bg-[white] cursor-pointer rounded-2xl p-3 '>
                    <Link to = "/createtrip">
                    Create new trip!
                    </Link>
                </a>
            </div>

    
            <div className= "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-6 gap-8 justify-items-center z-10">
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <div
                            key={trip._id}
                            onClick={() => setTripInfoButton(trip)}
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
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center mt-10">
                        <h3>No trips found.</h3>
                        <p>When you add a trip via the API, it will appear here.</p>
                    </div>
                )}

            </div>
            {showTripInfoButton && 
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30">
                <ViewTripDetails setTripInfoButton={setTripInfoButton}></ViewTripDetails>
            </div> }
        </div>
    );
}