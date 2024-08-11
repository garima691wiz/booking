import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "./Slice";



const store = configureStore({
    reducer: {
        booking: BookingSlice
    },
});

export default store;