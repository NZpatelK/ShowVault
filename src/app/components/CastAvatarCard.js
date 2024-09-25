import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '@/app/styles/CastAvatarCard.css';
const avatarIcon = '/avatarIcon.png';

const imgUrl = 'https://image.tmdb.org/t/p/original';
export default function CastAvatarCards({ movieId }) {
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/casts', {
          params: { movieId },
        });
        setCasts(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div className="avatar-container">
      <div className="avatar-group" style={{marginLeft: casts.length <= 5 ? '20px' : ''}}>
        {casts.length > 5 &&
          <div className="avatar-hidden">
            +{casts.length - 5}
          </div>
        }
        {casts.slice(0, 5).map((cast) => (
          <div key={cast.id} className="avatar-card">
            <div className="avatar-tooltip">
              <p className="cast-name">{cast.name}</p>
              <p className="cast-character">{cast.character}</p>
            </div>
            <div className="avatar-popup">
              <Image
                className="cast-img"
                src={cast.profile_path ? `${imgUrl}${cast.profile_path}` : avatarIcon}
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

