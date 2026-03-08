import { useEffect, useState } from 'react';
import type { Trip } from '../../../backend/src/types/trips';

export default function Dashboard() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

                const data: Trip[] = await response.json();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Simple redirect
    };

    if (loading) return <div style={{ padding: '20px' }}>Syncing with Travelogue...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>My Itineraries</h1>
                <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            </div>

            <hr />

            {trips.length > 0 ? (
                <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                    {trips.map((trip) => (
                        <div key={trip._id} style={{ 
                            border: '1px solid #ddd', 
                            padding: '20px', 
                            borderRadius: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                                ✈️ {trip.tripName}
                            </h2>
                            <p style={{ color: '#666' }}>
                                <strong>Plan:</strong> {trip.daysArray.length} days scheduled
                            </p>
                            <small style={{ color: '#999' }}>Trip ID: {trip._id}</small>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>No trips found.</h3>
                    <p>When you add a trip via the API, it will appear here.</p>
                </div>
            )}
        </div>
    );
}