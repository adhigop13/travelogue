import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface CreateDayTaskProp {
    day: String,
    date: String,
    latestCreatedTripId: String | null
}
export default function CreateDayTask({day, date, latestCreatedTripId}: CreateDayTaskProp ) {
    const [showTime, setTime] = useState<boolean>(false);
    const [showLocation, setLocation] = useState<boolean>(false);
    const [showNote, setNote] = useState<boolean>(false);

    const [event, setEventInput] = useState<String>("");
    const [time, setTimeInput] = useState<String>("");
    const [location, setLocationInput] = useState<String>("");
    const [notes, setNoteInput] = useState<String>("");

    const notifySuccess = () => toast("Day created successfully!");
    const notifyFailure = (failureMessage: String) => toast(failureMessage);
 
    async function handleDayTaskCreation() {
        try {
            const token = localStorage.getItem('token');
            // If no token, we shouldn't even try to create trip
            if (!token) {
                return;
            }

            if (!event.trim() || event.trim() == "") {
                setEventInput(day);
            }

            const bearerToken = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            }
            const responseDayCreated = await axios.post("http://localhost:5000/trips/addDay", {tripId: latestCreatedTripId, dayName: day, date:date, tasksArray: []}, bearerToken);
            const latestCreatedDay = responseDayCreated?.data?.latestDayAdded;
            const responseTaskCreated = await axios.post("http://localhost:5000/trips/addTask/", {dayId: latestCreatedDay, time: time, location: location, notes: notes}, bearerToken);

            notifySuccess();
        } catch (error:any) {
            notifyFailure(error.message);
        }
    }

    return (
        <div className='backdrop-blur-xs border rounded-lg p-4 flex flex-1 flex-col z-20'>
            <div className='flex justify-center text-4xl p-2'>
                Day 1
            </div>
            <div className='flex flex-col flex-1 w-3/4'>
                <h3 className='p-3 text-red-400 text-l'>
                    Date : 12th March 2027
                </h3>
                <p className='italic text-xs text-slate-300 text-center pb-3'>
                    You can add multiple events for a day!
                </p>

                <div className='flex flex-col p-4 border rounded-2xl gap-4'>
                    <div className='flex flex-col gap-2 px-3 p-3'>
                        <div className='flex flex-row gap-3'>
                            <h3> Event </h3>
                            { !showTime && <a className='cursor-pointer border rounded-2xl bg-white' onClick={() => setTime(true)}> Add Time </a>}
                            { !showLocation && <a className='cursor-pointer border rounded-2xl bg-white' onClick={() => setLocation(true)}> Add Location </a>}
                            { !showNote && <a className='cursor-pointer border rounded-2xl bg-white' onClick={() => setNote(true)}> Add Notes </a>}
                            <a className="bg-white rounded-2xl border p-1 cursor-pointer" onClick={handleDayTaskCreation}> Submit </a>
                        </div>
                        <input className='border rounded-2xl px-2 w-1/4' onChange={(e) => setEventInput(e.target.value)}></input>
                    </div>
                    {showTime && <div className='flex flex-col gap-2 px-3 pb-3 w-1/4'>
                        <h3> Time </h3>
                        <input className='border rounded-2xl px-2' onChange={(e)=> setTimeInput(e.target.value)}></input>
                    </div>}
                    
                    {showLocation && <div className='flex flex-col w-1/4 gap-2 px-3 pb-3'>
                        <h3> Location </h3>
                        <input className='border rounded-2xl px-2' onChange={(e)=> setLocationInput(e.target.value)}></input>
                    </div>}

                    {showNote && <div className='flex flex-col flex-1 w-3/4 gap-2 px-3 pb-3 min-h-0'>
                        <h3> Notes </h3>
                        <textarea className=' p-3 border flex-1 w-full px-2' onChange={(e)=>setNoteInput(e.target.value)}></textarea>
                    </div> }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}