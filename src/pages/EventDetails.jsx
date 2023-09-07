import { useState, useEffect } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  console.log(eventId);
  const [imagePreview, setImagePreview] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);

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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, []);

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

  return (
    <div>
      <div className="logo">
        <img src="src/assets/IronMeet logo-fotor-bg-remover-2023090792810.png" alt="Logo" />
        <img src="./src/assets/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <h2>EventDetails</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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

        <div>
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

        <div>
          <label>Image:</label>
          {isEditing ? (
            <div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          ) : (
            <img src={eventData.image} alt={eventData.title} />
          )}
        </div>
        <button type="submit" disabled={!isEditing}>
          Save
        </button>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

export default EventDetails;
