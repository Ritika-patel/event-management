import React, { useState, useEffect, useRef } from "react";
import bin from "../icons/bin.svg";
import plus from "../icons/plus.svg";
import pencil from "../icons/pencil.svg";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TodoForm(props) {
  const [formData, setFormData] = useState({
    eventName: props.edit ? props.edit.eventName : "",
    eventLocation: props.edit ? props.edit.eventLocation : "",
    eventDescription: props.edit ? props.edit.eventDescription : "",
    eventCategory: props.edit ? props.edit.eventCategory : "",
  });

  const [isEdit, setIsEdit] = useState(false);

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
      return;
    }

    if (isEdit === true) {
      const index = formData.id;

      const updatedEventsList = [...eventsList];
      updatedEventsList[index] = {
        eventName: formData.id,
        eventName: formData.eventName,
        eventLocation: formData.eventLocation,
        eventDescription: formData.eventDescription,
        eventCategory: formData.eventCategory,
      };

      setEventsList(updatedEventsList);

      setIsEdit(false);
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 10000),
        ...formData,
      };

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);

      setEventsList((prevList) => [...prevList, newEvent]);
    }

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
          {isEdit ? "Edit Event" : "Add Event"}
        </button>
      </form>

      <EventList
        eventsList={eventsList}
        setEventsList={setEventsList}
        setFormData={setFormData}
        formData={formData}
        setIsEdit={setIsEdit}
      />
    </>
  );
}

export default TodoForm;

const EventList = ({
  eventsList,
  setEventsList,
  setFormData,
  formData,
  setIsEdit,
}) => {
  const navigate = useNavigate();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [isViewListOpen, setViewListOpen] = useState(false);

  const [guestList, setGuestList] = useState([]);

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
    setViewListOpen(false);
    setSelectedEvent(null);
  };

  const handleEdit = (selectedEvent) => {
    // Fill the form fields with the selected event's data
    setIsEdit(true);
    setFormData({
      id: selectedEvent.id,
      eventName: selectedEvent.eventName,
      eventLocation: selectedEvent.eventLocation,
      eventDescription: selectedEvent.eventDescription,
      eventCategory: selectedEvent.eventCategory,
    });

    closeDialogs();
  };

  const handleDelete = (eventId) => {
    const updatedEventsList = [...eventsList].filter(
      (event) => event.id !== eventId
    );
    setEventsList(updatedEventsList);
    closeDialogs();
  };

  return (
    <div>
      <h2>Events List:</h2>
      <div>
        {eventsList.map((event) => (
          <div key={event.id} className="py-2 px-4">
            <div className="flex items-center gap-2">
              <p onClick={() => openDeleteDialog(event)} className="">
                <img src={bin} alt={""} className="" />
              </p>
              <p onClick={() => openEditDialog(event)} className="">
                <img src={pencil} alt={""} className="" />
              </p>
              <p onClick={() => openAddMemberDialog(event)} className="">
                <img src={plus} alt={""} className="" />
              </p>
              <button
                className="bg-purple-400 text-white rounded-xl p-2 "
                onClick={() => setViewListOpen(true)}
              >
                view guest
              </button>
            </div>

            <ul className="list-disc">
              <li>id: {event.id}</li>
              <li>Name: {event.eventName}</li>
              <li>Location: {event.eventLocation}</li>
              <li>Description: {event.eventDescription}</li>
              <li>Category: {event.eventCategory}</li>
            </ul>

            <div>
              {/* Edit Dialog */}
              {isEditDialogOpen && (
                <div className="dialog bg-purple-50 p-4 w-[500px] absolute top-[40%] left-[30%]">
                  <h3>Edit Event</h3>
                  <p>Are you sure you want to Edit this event?</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-red-500 px-4 py-2 text-white"
                      onClick={() => handleEdit(selectedEvent)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue-500 px-4 py-2 text-white"
                      onClick={closeDialogs}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Delete Dialog */}
              {isDeleteDialogOpen && (
                <div className="dialog bg-purple-50 p-4 w-[500px] absolute top-[40%] left-[30%]">
                  <h3>Delete Event</h3>
                  <p>Are you sure you want to delete this event?</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-red-500 px-4 py-2 text-white"
                      onClick={() => handleDelete(selectedEvent.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 px-4 py-2 text-white"
                      onClick={closeDialogs}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Add Member Dialog */}
              {isAddMemberDialogOpen && (
                <GuestForm
                  initialValues={event}
                  guestList={guestList}
                  setGuestList={setGuestList}
                  closeDialogs={closeDialogs}
                />
              )}

              {/* Add Member Dialog */}
              {isViewListOpen && (
                <ViewGuest guestList={guestList} setGuestList={setGuestList} closeDialogs={closeDialogs} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewGuest = ({ guestList, setGuestList,closeDialogs }) => {
  return (
    <div className="flex flex-col gap-2 p-6 absolute top-[20%] left-[40%] bg-purple-50 w-[600px]">
      {guestList.length < 0 ? (
        <div>No guest added</div>
      ) : (
        <div className="flex flex-col gap-4">
          {guestList.map((guest, index) => (
            <ul key={index} className="list-disc">
              <li>name: {guest.name}</li>
              <li>email: {guest.email}</li>
              <li>rsvp: {guest.rsvp}</li>
              <li>comments: {guest.comments}</li>
            </ul>
          ))}

<button className="bg-red-300 my-2 py-4 w-1/3" onClick={closeDialogs}>
          Cancel
        </button>

        </div>
      )}
    </div>
  );
};

const GuestForm = ({ guestList, setGuestList, closeDialogs }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rsvp: "",
    comments: "",
  });

  const addEvent = () => {
    setGuestList((prevList) => [...prevList, formData]);
    setFormData({
      name: "",
      email: "",
      rsvp: "",
      comments: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEvent();
    } catch (error) {
      console.error("Error adding event:", error);
    }

    console.log("formData", formData);
    console.log("guestList", guestList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-6 absolute top-[20%] left-[40%] bg-purple-50 w-[600px]"
    >
      <label htmlFor="name">Guest Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        required
        className="border-2 border-gray-900"
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        required
        className="border-2 border-gray-900"
      />

      <label htmlFor="rsvp">RSVP</label>
      <select
        id="rsvp"
        name="rsvp"
        value={formData.rsvp || "Attending"}
        onChange={handleChange}
        required
        className="border-2 border-gray-900"
      >
        <option value="Attending">Attending</option>
        <option value="Not Attending">Not Attending</option>
        <option value="Pending">Pending</option>
      </select>

      <label htmlFor="comments">Comments</label>
      <textarea
        id="comments"
        name="comments"
        value={formData.comments || ""}
        onChange={handleChange}
        className="border-2 border-gray-900"
      />

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-300 my-2 py-4 w-1/3">
          Save
        </button>

        <button className="bg-red-300 my-2 py-4 w-1/3" onClick={closeDialogs}>
          Cancel
        </button>
      </div>
    </form>
  );
};
