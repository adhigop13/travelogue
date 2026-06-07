import type React from "react";
import type { TripType } from "../../../backend/src/types/trips";

export interface ViewTripDetailsProp {setTripInfoButton: React.Dispatch<React.SetStateAction<TripType | null>>}

export default function ViewTripDetails({setTripInfoButton}: ViewTripDetailsProp) {

    return (
        <div className="backdrop-blur-sm border rounded-lg p-4 flex w-2/3 h-2/3 mt-20">
            <a>hi</a>
            <a>bye</a>
        </div>
    )
}