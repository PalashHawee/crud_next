import mongoose from "mongoose";

//connecting mongodb
const connectMongoDB =async ()=>{
    try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected");
} catch (e) {   
    console.log(e.message)
}
}

export default connectMongoDB;
