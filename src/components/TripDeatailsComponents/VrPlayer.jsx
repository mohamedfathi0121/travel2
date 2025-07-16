import "aframe";
import React, { useEffect, useRef, useState } from "react";
import { X, Play, Pause } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const VrPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Get video element reference after it's loaded
    const video = document.getElementById("vr-video");
    videoRef.current = video;

    // Update progress bar
    video.addEventListener("timeupdate", () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    });

    // Set initial playing state based on video element's autoplay
    setIsPlaying(video.autoplay);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = e => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const videoUrl = location.state?.videoUrl;

  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-[9999]">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous route
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <a-scene embedded vr-mode-ui="enabled: true">
          <a-assets>
            <video
              id="vr-video" // Keep the ID for reference
              src={videoUrl}
              autoPlay
              loop="true"
              crossOrigin="anonymous"
            ></video>
          </a-assets>
          <a-videosphere src="#vr-video" radius="5000"></a-videosphere>
        </a-scene>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-3xl">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full mb-4"
          />
          <div className="flex justify-center">
            <button
              onClick={handlePlayPause}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VrPlayer;
