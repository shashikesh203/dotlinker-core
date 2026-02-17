import mongoose from "mongoose";
import config from "../../config";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.commonConfig.mongoUri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export default connectToMongoDB;