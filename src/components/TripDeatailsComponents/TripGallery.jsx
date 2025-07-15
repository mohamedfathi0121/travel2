import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function TripGallery({ images = [] }) {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  if (!images.length) {
    return (
      <div className="text-center text-gray-500 text-lg mt-4">
        No images available for this trip.
      </div>
    );
  }

  return (
    <div className="my-6 relative">
      <h3 className="text-2xl font-semibold mb-4 text-center text-text-primary">Trip Photo Gallery</h3>

      <button onClick={scrollLeft} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 shadow-md transition duration-300 z-10">
        <FaChevronLeft />
      </button>

      <button onClick={scrollRight} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 shadow-md transition duration-300 z-10">
        <FaChevronRight />
      </button>

      <div ref={scrollRef} className="flex overflow-x-scroll overflow-y-hidden space-x-4 px-10 py-2 hide-scrollbar">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Trip Image ${index + 1}`}
            onClick={() => openImage(index)}
            className="w-72 h-48 object-cover rounded-xl shadow-md flex-shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button onClick={closeImage} className="absolute top-4 right-4 text-white text-3xl">
            <FaTimes />
          </button>
          <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">
            <FaChevronLeft />
          </button>
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-2xl" />
          <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">
            <FaChevronRight />
          </button>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
