import type { TripType } from "../../../backend/src/types/trips";

export interface TripSideCardsProp {
  trips: TripType[];
}

export default function TripSideCards(props: TripSideCardsProp) {
    const { trips } = props;
    return (
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
    )
}