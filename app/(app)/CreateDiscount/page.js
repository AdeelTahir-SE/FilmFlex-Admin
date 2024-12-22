import React, { useState } from 'react';

export default function ManageDiscount() {
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          discount,
          image,
          from,
          to
        })
      });
      const data = await response.json();
      console.log('Discount created:', data);
      // Reset form fields after successful submission
      setTitle('');
      setDiscount('');
      setImage('');
      setFrom('');
      setTo('');
    } catch (error) {
      console.error('Error creating discount:', error);
    }
  };

  return (
    <div>
      <h1>Create Discount</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Discount:</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>From:</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>To:</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Discount</button>
      </form>
    </div>
  );
}
