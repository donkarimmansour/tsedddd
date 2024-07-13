import mongoose from "mongoose";

const connect = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully.");
    
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;