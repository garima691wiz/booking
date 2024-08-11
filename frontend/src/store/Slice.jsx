import { createSlice,  } from "@reduxjs/toolkit";

// Define the Redux slice for booking information
const BookingSlice = createSlice({
  name: "BookingInformation",// Name of the slice
  initialState: {
    // Initialize the state with data from localStorage if available, otherwise use an empty array
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
     // Reducer for handling movie bookings
    bookMovie(state, action) {
        // Replace the current movie information with the new one
      state.movieInfo.splice(0, 1, {
        movie: action.payload,
      });
      // Save the updated movie information to localStorage
      localStorage.setItem("movieInfo", JSON.stringify(state.movieInfo));
    },

    // Reducer for handling slot bookings
    bookSlot(state, action) {
      // Replace the current seat information with the new one
      state.slotInfo.splice(0, 1, { 
        slot: action.payload });
        // Save the updated seat information to localStorage
      localStorage.setItem("slotInfo", JSON.stringify(state.slotInfo));
    },

     // Reducer for handling overall booking information
    bookSeat(state, action) {
        // Replace the current booking information with the new one
      state.seatInfo.splice(0, 1, { 
        seats: action.payload });
        // Save the updated booking information to localStorage
      localStorage.setItem("seatInfo", JSON.stringify(state.seatInfo));
    },

    Bookings(state, action) {
      state.bookingInfo.splice(0, 1, { 
        bookingInfos: action.payload });
      localStorage.setItem("bookingInfo", JSON.stringify(state.bookingInfo));
    },
  },
});

// Export the reducer for use in the store
export default BookingSlice.reducer;

// Export the actions for use in components
export const { bookMovie, bookSlot, bookSeat, Bookings } = BookingSlice.actions;
