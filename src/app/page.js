// src/app/page.js
'use client';
import { lazy, useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/app/page.module.css';
import '@/app/styles/HomePage.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import CarouselCards from './components/CarouselCards';
import ShowCard from './components/ShowCard';
import LoadingCard from './components/LoadingCard';

export default function HomePage() {
  const [welcomeData, setWelcomeData] = useState({
    'now_playing': null,
    'upcoming': null,
    'trending': null,
    'popular': null,
    'top_rated': null,
  });
  const [resultData, setResultData] = useState(null);
  const [query, setQuery] = useState('');
  // const [isQuerying, setIsQuerying] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchWelcomeData = async () => {
      setIsLoading(true);
      try {
        const promises = Object.keys(welcomeData).map((filterType) =>
          fetchWelcomeDataForFilterType(filterType)
        );
        await Promise.all(promises);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchWelcomeDataForFilterType = async (filterType) => {
      try {
        const response = await axios.get('/api/movies', {
          params: { filterType },
        });
        setWelcomeData((prevWelcomeData) => ({
          ...prevWelcomeData,
          [filterType]: response.data,
        }));
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchWelcomeData();

  }, []);

  const handleClickQueryButton = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (query) (
        response = await axios.get('/api/movies', {
          params: { query: query },
        })
      )
      else (
        setResultData(null)
      )
      console.log(response.data);
      setResultData(response.data);
    } catch (error) {
      setError(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {error && <p>Error: {error.message}</p>}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchBar} onChange={(e) => setQuery(e.target.value)} />
        <button className={styles.button} onClick={handleClickQueryButton} >Search</button>
      </div>
      {welcomeData && !isLoading ? (
        resultData ?
          <div className={styles.resultsContainer}>
            <div className={styles.results}>
              {resultData.map((movie) => (
                <ShowCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
          : Object.keys(welcomeData).map((filterType) => (
            welcomeData[filterType] ?
              <div className={styles.welcomeContent} key={filterType}>
                <h1>{filterType.replace(/_/g, ' ')}</h1>
                <CarouselCards data={welcomeData[filterType]} />
              </div>
              :
              null
          ))

      ) : (
        <div className={styles.resultsContainer}>
          <div className={styles.results}>
            {Array.from({ length: 20 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
