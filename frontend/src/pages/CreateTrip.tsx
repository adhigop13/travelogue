import {useState, useEffect} from 'react';
import type { TripType } from '../../../backend/src/types/trips';
import NavBar from './navBar';
import axios from 'axios';
import TripSideCards from './TripSideCards';
import TripCreateCards from './TripCreateCards';
import CreateDayTask from './CreateDayTask';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateTrip() {

    const [trips, setTrips] = useState<TripType[]>([]);
    const [latestCreatedTripId, setTripId] = useState<String | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    const navigate = useNavigate();

    const [createCardState, setCreateCardState] = useState<boolean>(true);

    const [createDayTaskState, setDayTaskState] = useState<boolean>(false);

    const day = "Day 1"; //dummy day. Need to ask for start date and no. of days from user, then pass it one by one.
    const date = "2026-07-05"   ////dummy date. Need to ask for start date and no. of days from user, then pass it one by one.

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

    

    return (
        <div className='relative z-0 h-screen w-screen flex flex-col items-stretch gap-4 pb-4'>
            <img className="absolute inset-0 w-full h-full object-cover z-0" src = {`${assetUrl}/world-map.jpg`} />
            <div className='z-10'>
                <NavBar></NavBar>
            </div>
            <div className='z-10 flex flex-row cursor-pointer'>
                <a className='text-white! hover:text-amber-800! rounded-2xl pl-10' onClick={() => navigate('/dashboard')}> Back </a>
            </div>
            <div className='flex flex-row flex-1 gap-4 px-8 z-10 overflow-y-auto'>
                <div className='flex flex-col border rounded-lg backdrop-blur-xs'>
                    <div className='text-4xl self-center pt-5 pb-2'>
                        Your Trips
                    </div>
                    <div className='overflow-y-auto'>
                        <TripSideCards trips={trips}></TripSideCards>
                    </div>
                </div>

                { createCardState && 
                <TripCreateCards setError={setError} setLoading={setLoading} setCreateCardState={setCreateCardState} setDayTaskState={setDayTaskState} setTripId={setTripId}
                ></TripCreateCards> 
                }
                { createDayTaskState && 
                    <CreateDayTask day={day} date={date} latestCreatedTripId= {latestCreatedTripId}/>
                }
                
            </div>
        </div>
        
    )
}