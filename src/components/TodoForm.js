import React, { useState, useEffect, useRef } from "react";
import bin from "../icons/bin.svg";
import plus from "../icons/plus.svg";
import pencil from "../icons/pencil.svg";

function TodoForm(props) {
  const [formData, setFormData] = useState({
    eventName: props.edit ? props.edit.eventName : "",
    eventLocation: props.edit ? props.edit.eventLocation : "",
    eventDescription: props.edit ? props.edit.eventDescription : "",
    eventCategory: props.edit ? props.edit.eventCategory : "",
  });

  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    eventName: false,
    eventLocation: false,
    eventDescription: false,
    eventCategory: false,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clearing the corresponding error when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const errors = {
      eventName: !formData.eventName,
      eventLocation: !formData.eventLocation,
      eventDescription: !formData.eventDescription,
      eventCategory: !formData.eventCategory,
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const addEvent = async () => {
    const isValid = validateForm();

    if (!isValid) {
      // If the form is not valid, return without adding the event
      return;
    }

    const newEvent = {
      id: Math.floor(Math.random() * 10000),
      ...formData,
    };

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    setEventsList((prevList) => [...prevList, newEvent]);

    setFormData({
      eventName: "",
      eventLocation: "",
      eventDescription: "",
      eventCategory: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEvent();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="flex flex-col gap-2">
          <label htmlFor="event_name">Event Name</label>
          <input
            placeholder="Enter Event name"
            value={formData.eventName}
            onChange={handleChange}
            name="eventName"
            className={`todo-input border-2 w-1/4 ${
              formErrors.eventName ? "border-red-500" : ""
            }`}
            ref={inputRef}
            required
          />
          {formErrors.eventName && (
            <span className="text-red-500">Event Name is required</span>
          )}

          <label htmlFor="event_location">Event Location</label>
          <input
            placeholder="Enter location"
            value={formData.eventLocation}
            onChange={handleChange}
            name="eventLocation"
            className={`todo-input border-2 w-1/4 ${
              formErrors.eventLocation ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.eventLocation && (
            <span className="text-red-500">Event Location is required</span>
          )}

          <label htmlFor="event_description">Event Description</label>
          <input
            placeholder="Event Description"
            value={formData.eventDescription}
            onChange={handleChange}
            name="eventDescription"
            className={`todo-input border-2 w-1/4 ${
              formErrors.eventDescription ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.eventDescription && (
            <span className="text-red-500">Event Description is required</span>
          )}

          <label htmlFor="event_category">Event Category</label>
          <input
            placeholder="Event Category"
            value={formData.eventCategory}
            onChange={handleChange}
            name="eventCategory"
            className={`todo-input border-2 w-1/4 ${
              formErrors.eventCategory ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.eventCategory && (
            <span className="text-red-500">Event Category is required</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`todo-button bg-purple-200 px-6 py-4 my-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Adding Event..." : "Add Event"}
        </button>
      </form>

      <EventList eventsList={eventsList} />
    </>
  );
}

export default TodoForm;

const EventList = ({ eventsList }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const openEditDialog = (event) => {
    setSelectedEvent(event);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const openAddMemberDialog = (event) => {
    setSelectedEvent(event);
    setAddMemberDialogOpen(true);
  };

  const closeDialogs = () => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setAddMemberDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEdit = () => {
    // Perform edit action here
    console.log("Editing event:", selectedEvent);
    closeDialogs();
  };

  const handleDelete = () => {
    // Perform delete action here
    console.log("Deleting event:", selectedEvent);
    closeDialogs();
  };

  const handleAddMember = () => {
    // Perform add member action here
    console.log("Adding member to event:", selectedEvent);
    closeDialogs();
  };

  return (
    <div>
      <h2>Events List:</h2>
      <div>
        {eventsList.map((event) => (
          <div key={event.id} className="py-2 px-4">
            <div className="flex gap-2">
              <p onClick={() => openDeleteDialog(event)} className="">
                <img src={bin} alt={""} className="" />
              </p>
              <p onClick={() => openEditDialog(event)} className="">
                <img src={pencil} alt={""} className="" />
              </p>
              <p onClick={() => openAddMemberDialog(event)} className="">
                <img src={plus} alt={""} className="" />
              </p>
            </div>

            <ul className="list-disc">
              <li>Name: {event.eventName}</li>
              <li>Location: {event.eventLocation}</li>
              <li>Description: {event.eventDescription}</li>
              <li>Category: {event.eventCategory}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="dialog">
          <h3>Edit Event</h3>
          {/* Add form elements for editing event */}
          <button onClick={handleEdit}>Save</button>
          <button onClick={closeDialogs}>Cancel</button>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && (
        <div className="dialog">
          <h3>Delete Event</h3>
          <p>Are you sure you want to delete this event?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeDialogs}>Cancel</button>
        </div>
      )}

      {/* Add Member Dialog */}
      {isAddMemberDialogOpen && (
        <div className="dialog">
          <h3>Add Member to Event</h3>
          {/* Add form elements for adding a member to the event */}
          <button onClick={handleAddMember}>Add Member</button>
          <button onClick={closeDialogs}>Cancel</button>
        </div>
      )}
    </div>
  );
};


