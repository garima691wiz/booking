import axios from "axios";

export const newBooking = async (data) => {

  // Sending a POST request to create a new booking
  const res = await axios
    .post("/bookings/", {
      movie: data.movie, // Movie selected by the user
      slot: data.slot,   // Time slot selected by the user
      seats: data.seats, // Seats selected by the user
  })
    .catch((err) => console.log(err));// Log any error that occurs during the request

    // Check if the response status is not 200 (indicating an error)
  if (res.status !== 200) {
    return console.log("Unexpected Error");// Log an error message if the status is not 200
  }

  // Retrieve the data from the response
  const resData = await res.data;
  return resData; // Return the data from the response
};

// Function to fetch details of the last booking
export const lastBookingDetails = async () => {
  // Sending a GET request to fetch the last booking details
   const res = await axios
    .get("/bookings/lastbooking")
    .catch((err) => console.log(err));// Log any error that occurs during the request

    // Check if the response status is not 200 (indicating an error)

  if (res.status !== 200) {
    return console.log("Unexpected error");
  }
  // Retrieve the data from the response
  const resData = await res.data;
  return resData;  // Return the data from the response
};
