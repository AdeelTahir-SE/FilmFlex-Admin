import { useState } from "react";

export default function MovieForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rating: "",
        year: "",
        genre: "",
        duration: "",
        image: "",
        trailerLink: "",
        seats: "",
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccessMessage(null); // Reset success message

        try {
            const response = await fetch("/api/movies", {
                method: "POST",
                body: new URLSearchParams(formData), // Mimic form submission
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit form");
            }

            setSuccessMessage("Movie submitted successfully!");
            setFormData({
                title: "",
                description: "",
                rating: "",
                year: "",
                genre: "",
                duration: "",
                image: "",
                trailerLink: "",
                seats: "",
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-red-600">Add a New Movie</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Year:</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Trailer Link:</label>
                    <input
                        type="text"
                        name="trailerLink"
                        value={formData.trailerLink}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Seats:</label>
                    <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-black border border-red-600 text-white"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-red-600 text-white font-bold rounded hover:bg-red-700">
                    Submit
                </button>
            </form>
        </div>
    );
}
