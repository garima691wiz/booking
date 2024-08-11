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
app.get('/jsonfile', (req, res) => {
    const filePath = path.join(__dirname, 'data.json'); // Adjust path as necessary

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Error reading file' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});
// Connect to MongoDB and start the server
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to MongoDB database and server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit process with failure code
    });



// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
