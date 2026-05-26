import mongoose from "mongoose";

export const mongoDBConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("mongodb connected");
        }
    catch(error){
        console.error("mongodb connection error", error);
        process.exit(1)
    }
    
};
