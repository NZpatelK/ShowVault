import React from 'react';
import Backdrop from '@mui/material/Backdrop';

const VideoModal = ({ videoId, toggle, handleClose }) => {
    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, backdropFilter: 'blur(20px)', background: 'rgba(0, 0, 0, 0.4)' })}
                open={toggle}
                onClick={handleClose}
            >
                <iframe
                    width="800"
                    height="450"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </Backdrop>
        </div>
    );

};

export default VideoModal;
