import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Image from 'next/image';
import '@/app/styles/ShowCard.css';
import CastAvatarCards from './CastAvatarCard';

const imgUrl = 'https://image.tmdb.org/t/p/original';
const videoUrl = 'https://www.youtube.com/watch?v=';

export default function ShowCard({ movie }) {
  const [logo, setLogo] = useState(null);
  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/movies', {
          params: { logo: movie.id },
        });
        setLogo(response.data.logo);
        setPoster(response.data.poster);
        setVideo(response.data.video);
        setShowLogo(true);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [movie.id]);

  return (
    <div className="card">
      <div className="poster">
        <Image
          src={`${imgUrl}${poster || movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={700}
        />
      </div>
      <div className="content">
        <div className="header">
          {showLogo ? (
            <Image
              src={`${imgUrl}${logo}`}
              alt={movie.title}
              width={300}
              height={300}
              onError={() => setShowLogo(false)}
            />
          ) : (
            <h2>{movie.title || "No Title"}</h2>
          )}
          <a className='trailer' href={`${videoUrl}${video}`}><FontAwesomeIcon className='play-icon' icon={faCirclePlay} /> Play Trailer</a>
        </div>
        <div className="sub-content">
          <p className="overview">{movie.overview}</p>
          <CastAvatarCards movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
