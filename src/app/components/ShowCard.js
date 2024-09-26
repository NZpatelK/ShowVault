import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Image from 'next/image';
import '@/app/styles/ShowCard.css';
import '@/app/styles/LoadingCard.css';
import CastAvatarCards from './CastAvatarCard';

const imgUrl = 'https://image.tmdb.org/t/p/original';

export default function ShowCard({ movie, handleVideoModal }) {
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
    <div className='card'>
      <div className="poster">
        {movie.poster_path ? <Image
          src={`${imgUrl}${poster || movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={700}
          loader={
            ({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 10}`
          }
        /> : <h1 className='no-poster'> No Poster </h1>}
      </div>
      <div className="content">
        <div className="header">
          {showLogo ? (
            <Image
              src={`${imgUrl}${logo}`}
              alt={movie.title}
              width={300}
              height={300}
              loader={
                ({ src, width, quality }) =>
                  `${src}?w=${width}&q=${quality || 10}`
              }
              onError={() => setShowLogo(false)}
            />
          ) : (
            <h2>{movie.title || "No Title"}</h2>
          )}
          <div>
            <button className='trailer' onClick={() => handleVideoModal(true, video)}><FontAwesomeIcon className='play-icon' icon={faCirclePlay} /> Play Trailer</button>
            <div className="ratingContainer">
              <Rating name="read-only" value={movie.vote_average / 2} precision={0.1} readOnly size="small" />
              <p>{(movie.vote_average/2).toFixed(1)}/5</p>
            </div>
          </div>
        </div>
        <div className="sub-content">
          <p className="overview">{movie.overview}</p>
          <CastAvatarCards movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
