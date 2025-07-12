import 'aframe';
import { Scene } from 'aframe-react';

export default function HotelVRVideo() {
  return (
    <div className="my-6">
      <h3 className="text-2xl font-semibold mb-4 text-center"> Virtual Hotel Tour (VR)</h3>
      <div className="rounded-xl shadow-lg overflow-hidden">
        <Scene embedded>
          <a-assets>
            <video
              id="hotelTour"
              src="/videos/hotel-tour.mp4"  // ← مسار الفيديو
              autoPlay
              loop
              muted
              crossOrigin="anonymous"
              playsInline
            ></video>
          </a-assets>

          <a-video
            src="#hotelTour"
            width="16"
            height="9"
            position="0 1.6 -4"
            rotation="0 0 0"
          ></a-video>
        </Scene>
      </div>
    </div>
  );
}
