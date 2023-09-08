import React, { useState, useEffect, useContext } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth.context";


function EventDetails() {
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const { eventId } = useParams();
  
  const [imagePreview, setImagePreview] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [addedEvent, setAddedEvent] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const locations = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

useEffect(() => {
  const fetchEventDetails = async () => {
    try {
      const response = await service.get(`/events/${eventId}/details`);
      setEventData(response.data);

      if (response.data.owner === activeUserId) {
        setIsCreator(true);
      }
      
      
      const user = await service.get("/user/profile");
      if (user.data.events.includes(eventId)) {
        setAddedEvent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchEventDetails();
}, [eventId, activeUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEventData({
      ...eventData,
      image: imageFile,
    });

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.put(`/events/${eventId}/edit`, eventData);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      await service.delete(`/events/${eventId}/delete`);
      navigate("/events");
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const handleAddEvent = async () => {
    try {
      await service.post(`/user/addOrRemoveFavEvent/${eventId}`);
      setAddedEvent(!addedEvent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <form onSubmit={handleSubmit} className="profile-container">
        <div>
          {isEditing ? (
            <div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="event-img-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="event-img-container">
              <img
                src={eventData.image}
                alt={eventData.title}
                className="event-img"
              />
            </div>
          )}
        </div>

        <div className="txt-cont">
          <label>Title:</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
            />
          ) : (
            <span>{eventData.title}</span>
          )}
        </div>

        <div className="txt-cont">
          <label>Location:</label>
          {isEditing ? (
            <select
              name="location"
              value={eventData.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          ) : (
            <span>{eventData.location}</span>
          )}
        </div>

        <div className="txt-cont">
          <label>Description:</label>
          {isEditing ? (
            <textarea
              type="text"
              name="description"
              value={eventData.description}
              onChange={handleChange}
            />
          ) : (
            <span>{eventData.description}</span>
          )}
        </div>
      </form>
      <div className="btn-event-details-container">
        {isCreator ? (
          <>
            <button
              className="event-btn-details"
              type="submit"
              disabled={!isEditing}
            >
              Save
            </button>
            <button
              className="event-btn-details"
              type="button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button className="event-btn-details" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          <button
            className={` ${
              addedEvent ? "event-btn-details" : "fuchsia-btn-event-details"
            }`}
            type="button"
            onClick={handleAddEvent}
          >
            {addedEvent ? "Join!" : "You are in!"}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
