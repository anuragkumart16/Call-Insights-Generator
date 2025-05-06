import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'


async function connectDb(){
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`MongoDB connected to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection failed, FILE: db/index.js',error);
        process.exit(1);
    }
}

export default connectDb