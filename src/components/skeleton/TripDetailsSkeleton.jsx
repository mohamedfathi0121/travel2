import React from "react";

const TripDetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-4 space-y-6 animate-pulse flex flex-col bg-background">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-4 gap-4 mt-7">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-input"></div>
        ))}
      </div>

      {/* ✅ Trip Title */}
      <div className="space-y-2  flex flex-col items-center  rounded-lg p-4 bg-input">
        <div className="h-6 w-1/3 rounded "></div>
        <div className="h-4 w-1/4 rounded "></div>
      </div>

      {/* ✅ Trip Video + Gallery */}
      <div className="flex flex-col lg:flex-row gap-6 bg-input p-4 rounded-lg">
        <div className="h-64 w-full lg:w-2/3 rounded-lg"></div>
        <div className="h-64 w-full lg:w-1/3 rounded-lg"></div>
      </div>

      {/* ✅ Trip Description */}
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-input"></div>
        ))}
      </div>

      {/* ✅ Price Includes / Not Includes */}
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-1/4 rounded bg-input"></div>
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-3 w-3/4 rounded bg-input"></div>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ Price Table */}
      <div className="space-y-3">
        <div className="h-6 w-48 rounded bg-input"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg shadow bg-header-background">
            <thead>
              <tr className="bg-input">
                {[...Array(4)].map((_, i) => (
                  <th key={i} className="py-3 px-4 text-left h-8 rounded"></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(4)].map((_, colIndex) => (
                    <td key={colIndex} className="py-3 px-4 h-10">
                      <div className="h-4 rounded bg-input"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Booking Section */}
      <div className="space-y-4">
        <div className="h-6 w-1/4 rounded bg-input"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-10 w-full rounded bg-input"></div>
        ))}
      </div>

      {/* ✅ Fixed Book Now Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 h-12 w-40 rounded-full shadow-lg z-50 bg-button-primary"></div>
    </div>
  );
};

export default TripDetailsSkeleton;
