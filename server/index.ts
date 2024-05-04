import mongoose from 'mongoose';
import { Nitro } from 'nitropack';

export default async (_nitroApp: Nitro) => {
    // TODO create Schema and test get
    try {
        // TODO move URI to env
        await mongoose.connect('mongodb+srv://admin:m4r4d0na4rm4nd0@cluster0.lkymb.mongodb.net/prode2022?retryWrites=true&w=majority')
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error", error)
    }
}