import { useEffect, useState } from "react";
import { seats } from "../data";
import { lastBookingDetails } from "../api-helpers/Api-helpers";

const MyBookings = () => {
  const [bookingDetails, setBookingDetails] = useState({
    movie: "",
    slot: "",
    seats: {},
  });

  useEffect(() => {
    lastBookingDetails()
      .then((res) => setBookingDetails(res.details))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-72 h-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2 underline">
          My Bookings
        </h1>
        {bookingDetails.movie ? (
          <div className="space-y-1">
            <div className="flex gap-2 ">
              <p className="text-lg font-semibold text-gray-800">Movie:</p>
              <p className="text-lg text-gray-700 underline font-semibold">{bookingDetails.movie}</p>
            </div>
            <div className="flex gap-5 ">
              <p className="text-lg font-semibold text-gray-800">Slot:</p>
              <p className="text-lg underline text-gray-700 font-semibold">{bookingDetails.slot}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-lg font-semibold text-gray-800">Seats:</p>
              <ul className="flex flex-wrap gap-4">
  {seats.map((seatName, index) => (
    <li
      key={index}
      className={`text-lg text-gray-700 ${
        bookingDetails.seats[seatName] > 0
          ? "underline font-semibold"
          : ""
      }`}
    >
      {seatName}:{" "}
      {bookingDetails.seats[seatName] !== undefined
        ? Number(bookingDetails.seats[seatName])
        : "Not available"}
        </li>
          ))}
        </ul>
      </div>
          </div>
        ) : (
          <p className="text-lg text-center text-gray-700">
            No Previous Booking Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
