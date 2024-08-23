import Image from 'next/image';
import '@/app/styles/ShowCard.css';

export default function ShowCard({ movie }) {
  
  return (
    <div className="card">
      <div className='poster'>
        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={700} />
      </div>
      <div className='content'>
        {/* <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p> */}
      </div>
    </div>
  );
}
