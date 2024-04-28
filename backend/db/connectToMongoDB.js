import mongoose from 'mongoose'; // Importing mongoose for MongoDB interaction

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        // Attempting to connect to the MongoDB database using the provided URL
        await mongoose.connect(process.env.MONGO6_DB_URL);
        console.log("Connected to MongoDB"); // Logging success message if connection is successful
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message); // Logging error message if connection fails
    }
}

export default connectToMongoDB; // Exporting the connectToMongoDB function
