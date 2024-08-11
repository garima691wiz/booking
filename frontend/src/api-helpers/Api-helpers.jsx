import axios from "axios";

export const newBooking = async (data) => {
  const res = await axios
    .post("/bookings/", {
      movie: data.movie,
      slot: data.slot,
      seats: data.seats,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const lastBookingDetails = async () => {
  const res = await axios
    .get("/bookings/lastbooking")
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected error");
  }

  const resData = await res.data;
  return resData;
};
