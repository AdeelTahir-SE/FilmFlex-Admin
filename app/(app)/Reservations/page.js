import { useState } from "react";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        name: "",
        date: "",
        time: "",
        guests: "",
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReservation({ ...newReservation, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReservations([...reservations, newReservation]);
        setNewReservation({ name: "", date: "", time: "", guests: "" });
        setShowForm(false);
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Reservations</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <p className="text-gray-300 mb-4">
                    Manage your reservations efficiently with our easy-to-use system.
                </p>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancel" : "Create New Reservation"}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-400">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={newReservation.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-400">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newReservation.date}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-400">Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={newReservation.time}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-400">Number of Guests:</label>
                            <input
                                type="number"
                                name="guests"
                                value={newReservation.guests}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Save Reservation
                        </button>
                    </form>
                )}
                {reservations.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-300 mb-2">Your Reservations:</h2>
                        <ul className="space-y-2">
                            {reservations.map((reservation, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-700 p-3 rounded shadow"
                                >
                                    <p>
                                        <strong>Name:</strong> {reservation.name}
                                    </p>
                                    <p>
                                        <strong>Date:</strong> {reservation.date}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {reservation.time}
                                    </p>
                                    <p>
                                        <strong>Guests:</strong> {reservation.guests}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
