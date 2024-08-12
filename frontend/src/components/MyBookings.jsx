import { useEffect, useState } from "react";
import { seats } from "../data";
import { lastBookingDetails } from "../api-helpers/Api-helpers";

const MyBookings = () => {
   // State to store booking details
  const [bookingDetails, setBookingDetails] = useState(null);

   // Fetch the last booking details when the component mounts
  useEffect(() => {
    lastBookingDetails()
      .then((res) => setBookingDetails(res.details)) // Set the booking details from the API response
      .catch((err) => console.log(err));// Log any errors during data fetching
  }, []);

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-72 h-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-3 underline">
          My Bookings
        </h1>
        
        {bookingDetails ? (
           // Render booking details if available
          <div className="space-y-1">
            <div className="flex gap-2 ">
              <p className="text-lg font-semibold text-gray-800">Movie:</p>
              <p className="text-lg text-gray-700 underline font-semibold">
                {bookingDetails.movie || "N/A"}</p> {/* Display movie name or "N/A" if not available */}
            </div>
            <div className="flex gap-5 ">
              <p className="text-lg font-semibold text-gray-800">Slot:</p>
              <p className="text-lg underline text-gray-700 font-semibold">
                {bookingDetails.slot || "N/A"}</p> {/* Display time slot or "N/A" if not available */}
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-lg font-semibold text-gray-800">Seats:</p>
              <ul className="flex flex-wrap gap-4">
                {seats.map((seatName, index) => (
                  <li
                    key={index}
                    className={`text-lg text-gray-700 ${
                      bookingDetails.seats && bookingDetails.seats[seatName] > 0
                        ? "underline font-semibold"
                        : ""
                    }`}
                  >
                    {seatName}:{" "}
                    {bookingDetails.seats && bookingDetails.seats[seatName] !== undefined
                      ? Number(bookingDetails.seats[seatName])// Display the number of seats booked
                      : "Not available"} {/* Show "Not available" if no seats booked */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
             // Display message if no booking details are found
          <p className="text-lg text-center text-gray-700">
            No Previous Booking Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
