import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('MONGO_URI is not configured');
  }

  await mongoose.connect(mongoURI, {
    autoIndex: false
  });

  console.log('MongoDB connected');
};
