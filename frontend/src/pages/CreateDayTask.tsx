import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../src/config/api";

export interface CreateDayTaskProp {
    date: Date | null,
    latestCreatedTripId: String | null,
    setDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setDayTaskState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateDayTask({date, latestCreatedTripId, setDate, setDayTaskState}: CreateDayTaskProp ) {
    const [showTime, setTime] = useState<boolean>(false);
    const [showLocation, setLocation] = useState<boolean>(false);
    const [showNote, setNote] = useState<boolean>(false);

    const [dayNumber, setDayNumber] = useState<number>(1);
    const [event, setEventInput] = useState<string>("");
    const [time, setTimeInput] = useState<string>("");
    const [location, setLocationInput] = useState<string>("");
    const [notes, setNoteInput] = useState<string>("");

    const notifySuccess = () => toast("Day created successfully!");
    const notifyFailure = (failureMessage: String) => toast(failureMessage);

    const navigate = useNavigate();
 
    async function handleTripSubmission() {
        try {
            const token = localStorage.getItem('token');
            // If no token, we shouldn't even try to create trip
            if (!token) {
                return;
            }

            if (!event.trim()) {
                setEventInput("Day " + dayNumber);
            }

            const bearerToken = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            }
            const responseDayCreated = await axios.post(`${API_BASE_URL}/trips/addDay`, {tripId: latestCreatedTripId, dayName: event, date:date, tasksArray: []}, bearerToken);
            const latestCreatedDay = responseDayCreated?.data?.latestDayAdded;
            const responseTaskCreated = await axios.post(`${API_BASE_URL}/trips/addTask/`, {dayId: latestCreatedDay, time: time, location: location, notes: notes}, bearerToken);

            notifySuccess()
            setTimeout(() => {
                navigate("/dashboard")
            }, 500)
        } catch (error:any) {
            notifyFailure(error.message);
        }
    }

    async function handleAddNewDayTask() {
        try {
            const token = localStorage.getItem('token');
            // If no token, we shouldn't even try to create trip
            if (!token) {
                return;
            }

            if (!event.trim()) {
                setEventInput("Day " + dayNumber);
            }

            const bearerToken = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            }

            const responseDayCreated = await axios.post(`${API_BASE_URL}/trips/addDay`, {tripId: latestCreatedTripId, dayName: event, date:date, tasksArray: []}, bearerToken);
            const latestCreatedDay = responseDayCreated?.data?.latestDayAdded;
            const responseTaskCreated = await axios.post(`${API_BASE_URL}/trips/addTask/`, {dayId: latestCreatedDay, time: time, location: location, notes: notes}, bearerToken);

            const currentDate = date;
            if (!currentDate) {
                return;
            }

            const nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + 1);

            setDate(nextDate);
            setTimeInput("");
            setEventInput("");
            setLocationInput("");
            setNoteInput("");
            setDayNumber(dayNumber + 1);
            notifySuccess();
        } catch (error:any) {
            notifyFailure(error.message);
        }
    }

    return (
        <div className='backdrop-blur-xs border rounded-lg p-4 flex flex-1 flex-col z-20'>
            <div className='flex justify-center text-4xl p-2'>
                Day {dayNumber}
            </div>
            <div className='flex flex-col flex-1 w-3/4 overflow-y-scroll'>
                <div className="flex flex-row gap-2">
                    <span className="text-red-400">Date: {date ? date.toDateString() : "No date"}</span>
                </div>
                <p className='italic text-xs text-slate-300 text-center pb-3'>
                    You can add multiple events for a day!
                </p>

                <div className="flex flex-row p-4 border rounded-2xl gap-4">
                    <div className='flex flex-col grow'>
                        <div className='flex flex-col gap-2 px-3 p-3'>
                            <div className='flex flex-row'>
                                <h3> Event </h3>
                                { !showTime && <a className='cursor-pointer border rounded-2xl px-2' onClick={() => setTime(true)}> Add Time </a>}
                                { !showLocation && <a className='cursor-pointer border rounded-2xl px-2' onClick={() => setLocation(true)}> Add Location </a>}
                                { !showNote && <a className='cursor-pointer border rounded-2xl px-2' onClick={() => setNote(true)}> Add Notes </a>}
                            </div>
                            <input className='border rounded-2xl px-2 mb-1.5' value={event} onChange={ (e) => setEventInput(e.target.value)}></input>
                        </div>
                        {showTime && <div className='flex flex-col gap-2 px-3'>
                            <h3> Time </h3>
                            <input className='border rounded-2xl px-2 mb-2.5' value={time} onChange={(e)=> setTimeInput(e.target.value)}></input>
                        </div>}
                        
                        {showLocation && <div className='flex flex-col gap-2 px-3 pb-3'>
                            <h3> Location </h3>
                            <input className='border rounded-2xl px-2 mb-2.5' value={location} onChange={(e)=> setLocationInput(e.target.value)}></input>
                        </div>}

                        {showNote && <div className='flex flex-col flex-1 w-3/4 gap-2 px-3 pb-3 min-h-0'>
                            <h3> Notes </h3>
                            <textarea className=' p-3 border flex-1 w-full px-2 text-black' value={notes} onChange={(e)=>setNoteInput(e.target.value)}></textarea>
                        </div> }

                    </div>

                    <div className="flex flex-col py-5 px-1 gap-2">
                        <button className="border rounded-2xl text-blue-500 bg-white! hover:bg-green-400! px-2 cursor-pointer" onClick={handleAddNewDayTask}>Add another day</button>
                        <button className="border rounded-2xl bg-white hover:bg-red-400! px-2 cursor-pointer" onClick={handleTripSubmission}>Complete Trip</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}