import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function HotelGallery() {
  const images = [
    "https://flyingcarpetholidays.com/files/large/622166190-%D9%81%D9%86%D8%AF%D9%82-%D9%81%D8%A7%D9%84%D9%83%D9%88%D9%86-%D9%87%D9%8A%D9%84%D8%B2-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE---%D8%A7%D9%84%D9%85%D8%B7%D8%B9%D9%85.jpg",
    "https://flyingcarpetholidays.com/files/large/161227368-%D9%81%D9%86%D8%AF%D9%82-%D9%81%D8%A7%D9%84%D9%83%D9%88%D9%86-%D9%87%D9%8A%D9%84%D8%B2-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE.jpg",
    "https://flyingcarpetholidays.com/files/large/1267958430-%D9%81%D9%86%D8%AF%D9%82-%D9%83%D9%88%D9%86%D9%83%D9%88%D8%B1%D8%AF-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE.jpg",
    "https://flyingcarpetholidays.com/files/large/48035786-%D9%81%D9%86%D8%AF%D9%82-%D9%83%D9%88%D9%86%D9%83%D9%88%D8%B1%D8%AF-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE-%D8%AD%D9%85%D8%A7%D9%85-%D8%A7%D9%84%D8%B3%D8%A8%D8%A7%D8%AD%D9%87.jpg",
    "https://flyingcarpetholidays.com/files/large/285403540-%D9%81%D9%86%D8%AF%D9%82-%D8%A8%D8%A7%D8%B1%D9%88%D8%AA%D9%8A%D9%84-%D8%A3%D9%83%D9%88%D8%A7-%D8%A8%D8%A7%D8%B1%D9%83-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE---%D8%A7%D9%84%D9%85%D8%B3%D8%A8%D8%AD.jpg",
    "https://flyingcarpetholidays.com/files/large/891827-%D9%81%D9%86%D8%AF%D9%82-%D8%A8%D8%A7%D8%B1%D9%88%D8%AA%D9%8A%D9%84-%D8%A3%D9%83%D9%88%D8%A7-%D8%A8%D8%A7%D8%B1%D9%83-%D8%B4%D8%B1%D9%85-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE---%D8%A7%D9%84%D9%85%D8%B7%D8%B9%D9%85.jpg",
  ];

  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const openImage = index => {
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

  return (
    <div className="my-6 relative">
      <h3 className="text-2xl font-semibold mb-4 text-center text-text-primary">Hotel Photo Gallery</h3>

      {/* سهم اليسار */}
      <button
        onClick={scrollLeft}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 shadow-md transition duration-300 z-10"
      >
        <FaChevronLeft />
      </button>

      {/* سهم اليمين */}
      <button
        onClick={scrollRight}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 shadow-md transition duration-300 z-10"
      >
        <FaChevronRight />
      </button>

      {/* الصور */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll overflow-y-hidden space-x-4 px-10 py-2 hide-scrollbar"
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Hotel Image ${index + 1}`}
            onClick={() => openImage(index)}
            className="w-72 h-48 object-cover rounded-xl shadow-md flex-shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ))}
      </div>

      {/* Popup Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <FaTimes />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            <FaChevronLeft />
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

    </div>
  );
}
