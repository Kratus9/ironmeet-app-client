import React, { useEffect, useState } from 'react';
import service from '../services/service.config';
import { Link } from "react-router-dom";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        
        const response = await service.get('/user/matches');

        // Actualiza el estado con la lista de matches.
        setMatches(response.data);
      } catch (error) {
        // Maneja el error y almacena el mensaje en el estado de error.
        setError('Error al obtener los matches. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error al obtener los matches:', error);
      }
    };

    // Llama a la función para obtener los matches cuando se monta el componente.
    fetchMatches();
  }, []); 

  return (
    <div className="matches-display">
      {matches.map((match, index) => (
        <div
          key={index}
          className="match-card"
          
        >
          <div className="img-container">
            <img src={match.image}  alt={match.name + " profile"} />
          </div>
          <div className='chat-container'>
          <h3>{match.name}</h3>
          <Link to={`/matches/${match._id}`}>Catch up!</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Matches;