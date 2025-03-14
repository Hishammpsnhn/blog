import mongoose from "mongoose";

const dbConfig = async() => {
  try {
    const config = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connected Successfully");
  } catch (error) {
    console.log("Mongo Connection Failed");
    process.exit(1);
  }
};
export default dbConfig;
