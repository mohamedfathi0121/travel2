import { useState, useEffect } from "react";

function NumberInput({ value, setValue, min = 0, max, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => setValue(Math.max(min, value - 1))}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-bold text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition"
      >
        <span>&#8595;</span>
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Math.max(min, Number(e.target.value)))}
        className="w-16 text-center border-2 border-gray-200 dark:border-gray-700 p-2 rounded-lg 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-blue-400 transition 
        [&::-webkit-inner-spin-button]:appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none 
        [appearance:textfield]"
      />

      <button
        type="button"
        aria-label="Increase"
        onClick={() =>
          setValue(
            max !== undefined ? Math.min(max, value + 1) : value + 1
          )
        }
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-bold text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition"
      >
        <span>&#8593;</span>
      </button>
    </div>
  );
}

export default function InquiryFormSection({ priceData, setBookingInfo }) {
  const [singleRooms, setSingleRooms] = useState(0);
  const [doubleRooms, setDoubleRooms] = useState(0);
  const [tripleRooms, setTripleRooms] = useState(0);
  const [members, setMembers] = useState(1);

  const singleRoomCost = Number(priceData?.price_single || 0);
  const doubleRoomCost = Number(priceData?.price_double || 0);
  const tripleRoomCost = Number(priceData?.price_triple || 0);

  const totalCost =
    singleRooms * singleRoomCost +
    doubleRooms * doubleRoomCost +
    tripleRooms * tripleRoomCost;

  // ✅ تحديث بيانات الحجز في ال state الأب
  useEffect(() => {
    if (typeof setBookingInfo === "function") {
      setBookingInfo({
        members,
        singleRooms,
        doubleRooms,
        tripleRooms,
        totalCost,
      });
    }
  }, [members, singleRooms, doubleRooms, tripleRooms, totalCost]);

  return (
    <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full my-12 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white tracking-tight">
        Booking Details
      </h2>
      <form className="space-y-6">
        {/* Number of Members */}
        <div>
          <label className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
            Number of Members
          </label>
          <NumberInput value={members} setValue={setMembers} min={1} />
        </div>

        {/* Room Types */}
        <div className="space-y-4">
          {[
            {
              label: `Single Room (EGP ${singleRoomCost})`,
              value: singleRooms,
              setValue: setSingleRooms,
              min: 0,
            },
            {
              label: `Double Room (EGP ${doubleRoomCost})`,
              value: doubleRooms,
              setValue: setDoubleRooms,
              min: 0,
            },
            {
              label: `Triple Room (EGP ${tripleRoomCost})`,
              value: tripleRooms,
              setValue: setTripleRooms,
              min: 0,
            },
          ].map((room) => (
            <div
              key={room.label}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3"
            >
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                {room.label}
              </label>
              <NumberInput
                value={room.value}
                setValue={room.setValue}
                min={room.min}
              />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 text-xl font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 rounded-lg py-4 shadow text-center">
          Total Cost: EGP {totalCost.toLocaleString()}
        </div>
      </form>
    </section>
  );
}
