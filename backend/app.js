import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingRouter from "./routes/bookingRoutes.js";
dotenv.config();


//paste mongodbURI = "mongodb://127.0.0.1:27017/bookings" 

const mongodbURI = process.env.MONGODBURI
const app = express();
const PORT = 8080;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/bookings", bookingRouter);

mongoose.connect(mongodbURI)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Connected to mongodb database and server is running on port: ${PORT}`)
        )

    ).catch((err) => console.log(err))