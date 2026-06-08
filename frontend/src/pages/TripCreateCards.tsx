import axios from "axios";
import { Datepicker } from "flowbite-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export interface TripCreateCardsProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateCardState: React.Dispatch<React.SetStateAction<boolean>>;
    setDayTaskState: React.Dispatch<React.SetStateAction<boolean>>;
    setTripId: React.Dispatch<React.SetStateAction<string | null>>;
    setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function TripCreateCards({
    setError,
    setLoading,
    setCreateCardState,
    setDayTaskState,
    setTripId,
    setDate
}: TripCreateCardsProps) {

    const toastSuccess = (tripName: string) => {
        toast.success(`Trip "${tripName}" created!`);
    };

    const toastFailure = (errorMessage: string) => {
        toast.error(errorMessage);
    };
    const createNewTrip = async() => {
        try {
            if (!tripName.trim()) {
                toastFailure("Trip name cannot be empty!")
            }
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
            toastSuccess(tripName);
            setTripId(tripCreateResponse.data.trip._id);     //Send back the trip id of latest created trip
            setTimeout(() => {
                setLoading(true);
                setCreateCardState(false);
                setDayTaskState(true);
                }, 500); 

        } catch (error: any) {
            console.log(error)
            setError(error.message || "Failed to load trips.");
        }
    }

    const [tripName, setTripName] = useState("");

    return (
        <div className='backdrop-blur-xs border rounded-lg p-4 flex flex-1 flex-col z-20 overflow-auto'>
            <div className='flex justify-center text-4xl p-2'>
                New Trip Creation
            </div>
            <div className='p-4 flex flex-col text-3xl py-35 items-center'>
                <h3 className='p-3'>
                    Where are we headed?
                </h3>
                <div className='flex flex-row gap-3'>
                    <input className='border px-3 py-1 text-l rounded-2xl' onChange={(e) => setTripName(e.target.value)} />
                    <Datepicker className="text-base w-1/4 p-1 grow " onChange={(selectedDate) => {setDate(selectedDate); console.log(selectedDate)}}/>
                    <a className='border-2 border-black text-white! cursor-pointer rounded-xl p-1 hover:bg-blue-200' onClick={createNewTrip}> Go </a>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}