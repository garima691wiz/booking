import express from "express";
import { lastBookingDetails, newBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);
bookingRouter.get("/lastbooking", lastBookingDetails);

export default bookingRouter;