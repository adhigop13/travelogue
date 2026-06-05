import axios from "axios";
import { useState } from "react";

export interface TripCreateCardsProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateCardState: React.Dispatch<React.SetStateAction<boolean>>;
    setDayTaskState: React.Dispatch<React.SetStateAction<boolean>>;
    setTripId: React.Dispatch<React.SetStateAction<String | null>>;
}

export default function TripCreateCards({
    setError,
    setLoading,
    setCreateCardState,
    setDayTaskState,
    setTripId
}: TripCreateCardsProps) {
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
            setCreateCardState(false);
            setDayTaskState(true);
            setTripId(tripCreateResponse.data.trip._id);     //Send back the trip id of latest created trip
            console.log("Backend response:", tripCreateResponse)
            console.log(tripCreateResponse.data.trip.id)
        } catch (error: any) {
            console.log(error)
            setError(error.message || "Failed to load trips.");
        }
    }

    const [tripName, setTripName] = useState("");
    return (
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
    )
}