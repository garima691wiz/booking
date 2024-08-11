import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRouter from './routes/bookingRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const mongodbURI = process.env.MONGODBURI;

// Check if MONGODBURI is defined
if (!mongodbURI) {
    console.error('MONGODBURI environment variable is not defined');
    process.exit(1); // Exit process with failure code
}

// Middleware setup
app.use(cors());
app.use(express.json());
app.use('/bookings', bookingRouter);

// Connect to MongoDB and start the server
mongoose.connect(mongodbURI)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Connected to mongodb database and server is running on port: ${PORT}`)
        )

    ).catch((err) => console.log(err))

