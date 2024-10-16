import mongoose from "mongoose";


const DatabaseConnection = async ()=>{
  const MONGO_URI = process.env.MONGO_URI || "";
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log('Connected to MongoDB');
  } catch (error) {
    
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = DatabaseConnection;
