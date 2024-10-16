import mongoose from "mongoose";


export async function DatabaseConnection(): Promise<void>{
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

