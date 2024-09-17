// src/app/page.js
'use client';
import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/app/page.module.css';
import '@/app/styles/HomePage.css';
import LoadingCard from './components/LoadingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
        <Swiper className='swiper-container' style={{ padding: '50px 50px' }}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow]}>
          {data.map((movie) => (
            <Suspense key={movie.id} fallback={<LoadingCard />}>
              <SwiperSlide className='swiper-slide'>
                <ShowCard movie={movie} />
              </SwiperSlide>
            </Suspense>
          ))}
        </Swiper>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}
