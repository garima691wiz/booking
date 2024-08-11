import { createSlice,  } from "@reduxjs/toolkit";

const BookingSlice = createSlice({
  name: "BookingInformation",
  initialState: {
    bookingInfo: localStorage.getItem("bookingInfo")
    ? JSON.parse(localStorage.getItem("bookingInfo"))
    : [],

    movieInfo: localStorage.getItem("movieInfo")
      ? JSON.parse(localStorage.getItem("movieInfo"))
      : [],

    slotInfo: localStorage.getItem("slotInfo")
      ? JSON.parse(localStorage.getItem("slotInfo"))
      : [],

    seatInfo: localStorage.getItem("seatInfo")
      ? JSON.parse(localStorage.getItem("seatInfo"))
      : [],
  },
  reducers: {
    bookMovie(state, action) {
      state.movieInfo.splice(0, 1, {
        movie: action.payload,
      });
      localStorage.setItem("movieInfo", JSON.stringify(state.movieInfo));
    },

    bookSlot(state, action) {
      state.slotInfo.splice(0, 1, { 
        slot: action.payload });
      localStorage.setItem("slotInfo", JSON.stringify(state.slotInfo));
    },

    bookSeat(state, action) {
      state.seatInfo.splice(0, 1, { 
        seats: action.payload });
      localStorage.setItem("seatInfo", JSON.stringify(state.seatInfo));
    },

    Bookings(state, action) {
      state.bookingInfo.splice(0, 1, { 
        bookingInfos: action.payload });
      localStorage.setItem("bookingInfo", JSON.stringify(state.bookingInfo));
    },
  },
});

export default BookingSlice.reducer;

export const { bookMovie, bookSlot, bookSeat, Bookings } = BookingSlice.actions;
