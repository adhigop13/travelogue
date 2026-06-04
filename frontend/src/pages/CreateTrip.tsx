import {useState, useEffect} from 'react';
import type { TripType } from '../../../backend/src/types/trips';
import NavBar from './navBar';
import axios from 'axios';

export default function CreateTrip() {

    const [trips, setTrips] = useState<TripType[]>([]);
    const [tripName, setTripName] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const assetUrl = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        if (!loading) return;
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
    }, [loading]);


    
    const createNewTrip = async() => {
        try {
            const token = localStorage.getItem('token');
            // If no token, we shouldn't even try to create trip
            if (!token) {
                setError("No authentication token found.");
                setLoading(false);
                return;
            }

            const tripCreatePayload = {
                tripName: tripName,
                daysArray: []
            }
            const tripCreateResponse = await axios.post("http://localhost:5000/trips/createTrip", tripCreatePayload, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            setLoading(true);
            console.log(tripCreateResponse)
        } catch (error: any) {
            console.log(error)
            setError(error.message || "Failed to load trips.");
        }
    }
    

    return (
        <div className='relative z-0 h-screen w-screen flex flex-col items-stretch gap-4'>
            <img className="absolute inset-0 w-full h-full object-cover z-0" src = {`${assetUrl}/world-map.jpg`} />
            <div className='z-10'>
                <NavBar></NavBar>
            </div>
            <div className='flex flex-row gap-4 py-4 px-8 z-10 overflow-y-auto'>
                <div className='flex flex-col border rounded-lg p-4 backdrop-blur-xs'>
                    <div className='text-4xl self-center p-2'>
                        Your Trips
                    </div>
                    <div className='overflow-y-auto'>
                        <div className= "grid grid-cols-1 p-6 gap-8 justify-items-center">
                            {trips.length > 0 ? (
                                trips.map((trip) => (
                                    <div
                                        key={trip._id}
                                        onClick={() => ""}
                                        className="
                                        p-6
                                        backdrop-blur-3xl
                                        border
                                        rounded-2xl
                                        cursor-pointer
                                        shadow-md
                                        hover:shadow-xl
                                        hover:scale-105
                                        transition
                                        "
                                    >
                                        <h2 className="text-white text-2xl font-bold italic">
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
                    </div>
                </div>

                <div className='backdrop-blur-xs border rounded-lg p-4 flex flex-1 flex-col z-20'>
                    <div className='flex justify-center text-4xl p-2'>
                        New Trip Creation
                    </div>
                    <div className='p-4 flex flex-1 flex-col text-3xl py-35 items-center'>
                        <h3 className='p-3'>
                            Where are we headed?
                        </h3>
                        <div className='flex flex-row gap-3'>
                            <input className='border px-3 py-1 text-2xl rounded-2xl' onChange={(e) => setTripName(e.target.value)} />
                            <a className='bg-amber-50 cursor-pointer rounded-xl p-1' onClick={createNewTrip}> Go </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}