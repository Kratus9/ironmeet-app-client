import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [addedEvent, setAddedEvent] = useState(false);

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
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="event-container p-1">
        {events.map((event) => (
          <Link to={`/events/${event._id}/details`} key={event._id} >
          <div
            className="event-card"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <li>
              <h3 className="location-h3">{event.title}</h3>
              <p className="location-p">{event.location}</p>
            </li>
          </div>
              </Link>
        ))}
        <div className="event-btn-container">
        <button className="event-btn">
          <Link to={"/events/new-event"}>Create Event!</Link>
        </button>
        </div>
      </div>
    </div>
  );
}

export default Events;
