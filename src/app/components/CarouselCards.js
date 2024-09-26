import { lazy, Suspense } from 'react';
import LoadingCard from '@/app/components/LoadingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const ShowCard = lazy(() => import('./ShowCard'));

const CarouselCards = ({ data, handleVideoModal }) => {

    return (
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
                        <ShowCard movie={movie} handleVideoModal={handleVideoModal} />
                    </SwiperSlide>
                </Suspense>
            ))}
        </Swiper>
    );
};

export default CarouselCards;
