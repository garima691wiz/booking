import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";

//Controller-1 (creats a new booking and add it to the database)
export const newBooking = async (req, res, next) => {
   const { movie, slot, seats } = req.body;

   let booking;
   try {
      booking = new Bookings({
         movie,
         slot,
         seats,
      });
      booking = await booking.save();
   } catch (err) {
      return console.log(err);
   }

   if (!booking) {
      return res.status(500).json({ message: "Unable to create booking" })
   }

   return res.status(200).json({ booking: booking, message:"Booking Successfull" })
};

//Controller-2 (getting the last booking details)
export const lastBookingDetails = async (req, res, next) => {
   let details;
   try {
      details = await Bookings.find().sort({ _id: -1 }).limit(1)
   } catch (err) {
      return console.log(err);
   }
   if (!details) {
      return res.status(500).json({ details: null, message: "No previous booking found!" })
   } else {

      return res.status(200).json({ details: details[0] })
   }
}