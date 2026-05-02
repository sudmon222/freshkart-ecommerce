import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not set");
            return;
        }

        mongoose.connection.on('connected',()=>console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/freshcart`)
    }catch(error){
        console.error(error.message);
    }
}

export default connectDB;
