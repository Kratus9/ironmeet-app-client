import React, { useState, useEffect } from "react";
import service from "../services/service.config";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await service.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <img src={event.image}  alt={event.title} />
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;