import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function VrCard({ image, videoUrl }) {
  return (
    <Link to="/vrplayer" state={{ videoUrl }}>
      <div className="flex items-center justify-center ">
        {/* Thumbnail */}
        <div className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
          <img
            src={image}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/60 transition-all duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
