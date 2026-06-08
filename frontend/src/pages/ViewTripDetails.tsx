import type React from "react";
import { useEffect, useState } from "react";
import type { TripType, PopulatedTrip } from "../../../backend/src/types/trips";
import axios from "axios";

export interface ViewTripDetailsProp {
    setTripInfoButton: React.Dispatch<React.SetStateAction<TripType | null>>
    tripId: string
}

export default function ViewTripDetails({ setTripInfoButton, tripId }: ViewTripDetailsProp) {
    // 1. Move the state inside the component
    const [fullTripDetails, setFullTripDetails] = useState<PopulatedTrip | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 2. Use useEffect to run the async fetch operation once on mount
    useEffect(() => {
        async function handleGetTripDetails() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No authentication token found.");
                    return;
                }

                const responseDayCreated = await axios.get("http://localhost:5000/trips/getTripDetails", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: { tripId }
                });

                setFullTripDetails(responseDayCreated.data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch trip details");
                console.log(err.message);
            }
        }

        handleGetTripDetails();
    }, [tripId]); // Trigger re-fetch only if tripId changes

    return (
        <div className="backdrop-blur-lg border rounded-lg p-4 flex flex-col w-2/3 h-2/3 mt-20">
            {/* Close button with fixed arrow syntax */}
            <a className="text-red-400! cursor-pointer pb-5" onClick={() => setTripInfoButton(null)}>
                Close
            </a>

            {/* Displaying information conditionally based on the network state */}
            {error && <p className="text-red-500">{error}</p>}
            
            {!fullTripDetails && !error && <p>Loading trip details...</p>}

            {fullTripDetails && (
                <div className="text-black text-left w-full mt-4 overflow-y-auto max-h-[80%]">
                    {/* Main Header Info */}
                    <h1 className="text-2xl font-bold mb-2">{fullTripDetails.tripName}</h1>
                    <p className="text-violet-600 mb-6">Owner: {fullTripDetails.tripOwner}</p>

                    {/* Looping through the Days Array */}
                    <div className="space-y-6">
                        {fullTripDetails.daysArray.length === 0
                        ? <div>No days planned yet for this trip!</div>
                        : fullTripDetails.daysArray.map((day) => (
                            <div key={day._id} className="border-l-4 border-blue-500 pl-4 py-1">
                                <h2 className="text-xl font-semibold text-blue-600">{day.dayName}</h2>
                                <p className="text-xs text-cyan-600 mb-2">
                                    {new Date(day.date).toLocaleDateString()}
                                </p>

                                {/* 2. Loop through the Tasks Array nested inside each Day */}
                                <div className="space-y-2 mt-3">
                                    {day.tasksArray.length > 0 ? (
                                        day.tasksArray.map((task) => (
                                            <div key={task._id} className="bg-gray-50 p-3 rounded-lg border">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-800">
                                                        📍 {task.location}
                                                    </span>
                                                    {task.time && (
                                                        <span className="text-xs bg-blue-100 text-gray-800 px-2 py-0.5 rounded">
                                                            🕒 {task.time}
                                                        </span>
                                                    )}
                                                </div>
                                                {task.notes && (
                                                    <p className="text-sm text-gray-600 mt-1 italic">
                                                        Notes: {task.notes}
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-800 italic pl-4">No tasks added for this day yet.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
