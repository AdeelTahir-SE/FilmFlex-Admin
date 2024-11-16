import React, { useState } from 'react';

export default function CreateMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const movieData = {
      title,
      description,
      releaseDate,
      genre,
    };

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        alert('Movie created successfully!');
        // Reset form fields
        setTitle('');
        setDescription('');
        setReleaseDate('');
        setGenre('');
      } else {
        alert('Failed to create movie.');
      }
    } catch (error) {
      console.error('Error creating movie:', error);
      alert('An error occurred while creating the movie.');
    }
  };

  return (
    <section className="flex flex-col p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Create Movie</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Movie Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <button type="submit" className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Create Movie
        </button>
      </form>
    </section>
  );
}
