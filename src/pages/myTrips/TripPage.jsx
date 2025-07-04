import { useState } from "react";
// import { Helmet } from "react-helmet";
import TripTabs from "./TripTabs";
import TripCard from "./TripCard";
import aImage from "../../assets/a.jpg";
import cImage from "../../assets/c.jpg";

const tripData = {
  Approved: [
    {
      title: "Business Trip to San Francisco",
      date: "Oct 20 – Oct 25",
      image: aImage,
    },
    {
      title: "Conference in New York",
      date: "Nov 15 – Nov 18",
      image: cImage,
    },
  ],
  Completed: [],
  Cancelled: [],
  "Not Approved": [],
};

function TripPage() {
  const [currentTab, setCurrentTab] = useState("Approved");

  return (
    <>
      {/* <Helmet>
        <title>My Trips</title>
        <meta
          name="description"
          content="View and manage your upcoming trips"
        />
      </Helmet> */}

      <div className="w-full max-w-[90%] mx-auto p-6 font-sans bg-background min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-text-primary">My Trips</h1>
        <TripTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div>
          <h2 className="text-lg font-medium mb-4 text-text-primary">
            {currentTab} Trips
          </h2>
          {tripData[currentTab].length > 0 ? (
            tripData[currentTab].map((trip, idx) => (
              <TripCard key={idx} {...trip} />
            ))
          ) : (
            <p className="text-text-secondary">
              No {currentTab.toLowerCase()} trips.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default TripPage;
