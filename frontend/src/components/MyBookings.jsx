import { useEffect, useState } from "react";
import { seats } from "../data";
import { lastBookingDetails } from "../api-helpers/Api-helpers";

// MyBookings component to display the user's last booking details
const MyBookings = () => {
   // State to hold the booking details fetched from the API
  const [bookingDetails, setBookingDetails] = useState({
    movie: "",
    slot: "",
    seats: {},
  });

   // Fetch the last booking details when the component mounts
  useEffect(() => {
    lastBookingDetails()
    .then((res) => setBookingDetails(res.details)) // Update the state with the fetched booking details
    .catch((err) => console.log(err)); // Log any errors during the fetch process
}, []); // Empty dependency array ensures this runs only once when the component mounts


  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-72 h-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-3 underline">
          My Bookings
        </h1>
        {/* Display the booking details if available, otherwise show a message */}
        {bookingDetails.movie ? (
          <div className="space-y-1">
            <div className="flex gap-2 ">
              <p className="text-lg font-semibold text-gray-800">Movie:</p>
              <p className="text-lg text-gray-700 underline font-semibold">{bookingDetails.movie}</p>
            </div>

             {/* Slot detail */}
            <div className="flex gap-5 ">
              <p className="text-lg font-semibold text-gray-800">Slot:</p>
              <p className="text-lg underline text-gray-700 font-semibold">{bookingDetails.slot}</p>
            </div>

              {/* Seats detail */}
            <div className="flex justify-between gap-2">
              <p className="text-lg font-semibold text-gray-800">Seats:</p>
              <ul className="flex flex-wrap gap-4">
  {seats.map((seatName, index) => (
    <li
      key={index}
      className={`text-lg text-gray-700 ${
        bookingDetails.seats[seatName] > 0
          ? "underline font-semibold"// Highlight seats that were booked
          : ""
      }`}
    >
      {seatName}:{" "}
      {bookingDetails.seats[seatName] !== undefined
      ? Number(bookingDetails.seats[seatName]) // Display the number of seats booked
      : "Not available"}
</li>
          ))}
        </ul>
      </div>
          </div>
        ) : (
            // Message displayed if no previous booking is found
          <p className="text-lg text-center text-gray-700">
            No Previous Booking Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
