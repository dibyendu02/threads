import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGO_URL) return console.log("mongo url not found");

    if(isConnected) return console.log("already connected with DB");

    try {
        mongoose.connect(process.env.MONGO_URL);

        console.log("connected with DB");
    } catch (error) {
        console.log(error);
    }

}