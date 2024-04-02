import mongoose from 'mongoose';
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO6_DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error conecting to mongo db")
    }
}
export default connectToMongoDB;