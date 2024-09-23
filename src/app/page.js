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

export default function HomePage() {
  const [data, setData] = useState(null);
  const [welcomeData, setWelcomeData] = useState({
    'now_playing': null,
    'upcoming': null,
    'trending': null,
    'popular': null,
    'top_rated': null,
  });
  const [resultData, setResultData] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);
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

  }, [ ]);

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    try {
      let response;
      if (query) (
        response = await axios.get('/api/movies', {
          params: { query: query },
        })
      )
      else (
        response = await axios.get('/api/movies', {
          params: { filterType: 'popular' },
        })
      )
      setResultData(response.data);
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
      { welcomeData.popular  || !isLoading ? (
        Object.keys(welcomeData).map((filterType) => (
          <div className={styles.welcomeContent} key={filterType}>
            <h1>{filterType}</h1>
            <CarouselCards data={welcomeData[filterType]} />
          </div>
        ))
 
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}
