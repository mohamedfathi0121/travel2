import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import paris from "../assets/popular-section-images/paris.png";
import tokyo from "../assets/popular-section-images/tokyo.png";
import london from "../assets/popular-section-images/London.png";
import sydney from "../assets/popular-section-images/sydney.png";
import rome from "../assets/popular-section-images/rome.png";
import Header from "../components/header";
import Footer from "../components/footer";

export default function LandingPage() {
  const popularDestinations = [
    { city: "Paris", img: paris },
    { city: "Tokyo", img: tokyo },
    { city: "Sydney", img: sydney },
    { city: "Rome", img: rome },
    { city: "London", img: london },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* <Helmet>
        <title>AdventureCo - Find Your Next Adventure</title>
        <meta
          name="description"
          content="Discover unique trips, explore cities, and book your perfect getaway with AdventureCo."
        />
      </Helmet> */}



      <section className="relative flex justify-center items-center py-12 px-4 md:px-20">
        <div
          className="w-[80%] h-[500px] bg-cover bg-center rounded-l relative overflow-hidden"
          style={{ backgroundImage: `url('/src/assets/hero.png')` }}
        >
          <div className="absolute inset-0 bg-opacity-40 z-0" />
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <h1 className="text-grey text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Find your next adventure
            </h1>
            <p className="mb-4 md:mb-6 text-sm md:text-base drop-shadow-md">
              Discover unique trips & book your perfect getaway today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <input
                type="text"
                placeholder="Where to?"
                className="px-4 py-2 w-60 md:w-72 rounded shadow focus:outline-none text-sm mb-2 sm:mb-0 bg-white bg-opacity-90 text-gray-900 placeholder-gray-600"
              />
              <button className="sm:ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-10 md:py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Trips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          <TripCard
            img="/src/assets/1.png"
            title="Hiking in the Alps"
            desc="Explore the breathtaking views of the Alps with experienced guides."
          />
          <TripCard
            img="/src/assets/2.png"
            title="Relaxing Beach Getaway"
            desc="Unwind in paradise with crystal-clear waters and luxurious accommodations."
          />
          <TripCard
            img="/src/assets/3.png"
            title="City Exploration Tour"
            desc="Discover the best urban culture and iconic landmarks of bustling city."
          />
        </div>
      </section>

      <section className="w-full px-6 md:px-16 py-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {popularDestinations.map(({ city, img }, i) => (
            <Link
              key={i}
              to={`/destinations/${city.toLowerCase()}`}
              className="rounded overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer block"
            >
              <img
                src={img}
                alt={city}
                loading="lazy"
                className="w-full h-40 object-cover transform hover:scale-105 transition duration-300"
              />
              <p className="text-center text-base mt-2 font-medium text-gray-700 hover:text-blue-600">
                {city}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

function TripCard({ img, title, desc }) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <img src={img} alt={title} loading="lazy" className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
   
    </div>
  );
}
