// src/app/page.js
'use client';
import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
// import ShowCard from './components/ShowCard';
import styles from '@/app/page.module.css';
import LoadingCard from './components/LoadingCard';

const ShowCard = lazy(() => import('./components/ShowCard'));


export default function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/movies', {
          params: {
            filterType: 'popular'
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    try {
      const response = await axios.get('/api/movies', {
        params: { query: query },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={styles.container}>
      {error && <p>Error: {error.message}</p>}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchBar} onChange={handleQueryChange} />
        <button className={styles.button}>Search</button>
      </div>
      {data || !isLoading ? (
        <div className={styles.flexGrid} style={{ padding: '50px 50px' }}>
          {data.map((movie) => (
            <Suspense key={movie.id} fallback={<LoadingCard />}>
              <ShowCard movie={movie} />
            </Suspense>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}
