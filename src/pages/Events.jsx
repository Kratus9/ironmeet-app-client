import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";

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
      <div className="logo">
        <img
          src="IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="event-container">
        <h2>Events</h2>
        {events.map((event) => (
          <div key={event._id}>
            <li>
              <h3>{event.title}</h3>
              <Link to={`/events/${event._id}/details`}>
                <div>
                  <img src={event.image} alt={event.title} width={100} />
                </div>
              </Link>
              <p>{event.location}</p>
            </li>
          </div>
        ))}
        <button className="event-btn">
          <Link to={"/events/new-event"}>Create Event!</Link>
        </button>
      </div>
    </div>
  );
}

export default Events;
