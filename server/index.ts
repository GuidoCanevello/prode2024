import mongoose from 'mongoose';
import { Nitro } from 'nitropack';

export default async (_nitroApp: Nitro) => {
    // TODO create Schema and test get
    try {
        // TODO move URI to env
        const mongoURI = process.env.MONGO_URI;
        const isPipeline = process.env.IS_PIPELINE == "true" ?? false;

        if (!isPipeline && mongoURI != undefined) {
            await mongoose.connect(mongoURI);
            console.log("Connected to MongoDB");            
        }
    } catch (error) {
        console.log("Error", error)
    }
}