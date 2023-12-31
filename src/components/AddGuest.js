// CreateEditGuestForm.js
import React, { useState } from 'react';

const AddGuest = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-6'>
      <label htmlFor="name">Guest Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        required
        className='border-2 border-gray-900'
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        required
        className='border-2 border-gray-900'
      />

      <label htmlFor="rsvp">RSVP</label>
      <select
        id="rsvp"
        name="rsvp"
        value={formData.rsvp || 'Attending'}
        onChange={handleChange}
        required
        className='border-2 border-gray-900'
      >
        <option value="Attending">Attending</option>
        <option value="Not Attending">Not Attending</option>
        <option value="Pending">Pending</option>
      </select>

      <label htmlFor="comments">Comments</label>
      <textarea
        id="comments"
        name="comments"
        value={formData.comments || ''}
        onChange={handleChange}
        className='border-2 border-gray-900'
      />

      <button type="submit" className='bg-blue-300 my-2 py-4 w-1/3'>Save</button>
    </form>
  );
};

export default AddGuest;
