import React from 'react';
import { Scene, Entity } from 'aframe-react';

export default function HotelVRVideo() {
  const handleClick = () => {
    window.open('/videos/hotel-tour.mp4', '_blank');
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="text-center max-w-xl w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Virtual Tour Inside the Hotel (VR)
        </h2>

        {/* Video preview (no controls) */}
        <div
          onClick={handleClick}
          className="cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 transition hover:scale-105"
        >
          <video
            src="/videos/hotel-tour.mp4"
            muted
            playsInline
            preload="metadata"
            controls={false}
            className="w-full h-[400px] object-cover pointer-events-none"
          />
        </div>

        {/* Note */}
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Click the video to watch in full screen
        </p>
      </div>
    </div>
  );
}

