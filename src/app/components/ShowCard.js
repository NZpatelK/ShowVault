import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '@/app/styles/ShowCard.css';

export default function ShowCard({ movie }) {

  const [isLogoDisplayed, setIsLogoDisplayed] = useState(true);
  const [logo, setLogo] = useState(null);
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API route using Axios
    axios.get('/api/movies', {
      params: {
        logo: movie.id
      },
    })
      .then((response) => {
        setLogo(response.data.logo);
        setPoster(response.data.poster);
        setIsLogoDisplayed(true);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="card">
      <div className='poster'>
        <Image src={`https://image.tmdb.org/t/p/w500${poster || movie.poster_path}`} alt={movie.title} width={500} height={700} />
      </div>
      <div className='content'>
        {isLogoDisplayed ? <Image src={`https://image.tmdb.org/t/p/original${logo}`} alt={movie.title} width={300} height={300} onError={() => setIsLogoDisplayed(false)} /> : null}
        {/* <h2>{movie.title}</h2> */}
        {/* <p>{movie.overview}</p> */}
        {/* <p>Rating: {movie.vote_average}</p> */}
      </div>
    </div>
  );
}
