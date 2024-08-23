// src/app/page.js
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowCard from './components/ShowCard';
import styles from '@/app/page.module.css';


export default function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API route using Axios
    axios.get('/api/movies',{
      params: {
        filterType: 'popular'
      },
    })
      .then((response) => {
        console.log('Data:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {data ? (
        <div className={styles.grid}>
         {data.map((movie) => (
            // <p key={movie.id}>{movie.title}</p>
            <ShowCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
