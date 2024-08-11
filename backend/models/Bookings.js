import mongoose from "mongoose";


//This is the schema page for saving the booking data in the backend
const bookingSchema = new mongoose.Schema({
    movie: {
        type: String,
        required:true
    },

    slot: {
        type: String,
        required:true
    },

    seats: {
        A1: { type: Number },
        A2: { type: Number },
        A3: { type: Number },
        A4: { type: Number },
        D1: { type: Number },
        D2: { type: Number }, 
       
    }
});

export default mongoose.model("booking", bookingSchema)