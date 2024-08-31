// import profile1 from '../../../assets/profileImg/profile2.jpg';
// import profile2 from '../../../assets/profileImg/profile3.jpg';
// import profile3 from '../../../assets/profileImg/profile 4.jpg';
// import profile4 from '../../../assets/profileImg/profile5.jpeg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import '@/app/styles/CastAvatarCard.css';
const avatarIcon = '/avatarIcon.png';
export default function CastAvatarCards( { movieId } ) {

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        // Fetch data from the API route using Axios
        axios.get('/api/casts', {
            params: {
                movieId: movieId
            },
        })
            .then((response) => {
                setCasts(response.data);
            })
            .catch((error) => {
                setError(error);
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='avatar-container'>
            <div className="avatar-group">
                <div className="avatar-hidden">
                    +{casts.length - 5}
                </div>
                    {casts.slice(0, 5).map((cast) => (
                        <div key={cast.id} className="avatar-card">
                            <div className='avatar-tooltip'>
                                <p className='cast-name'>{cast.name}</p>
                                <p className='cast-character'>{cast.character}</p>
                            </div>
                            <div className="avatar-popup">
                                <Image className='cast-img' src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`: avatarIcon} alt=""  width={200} height={200}/>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

