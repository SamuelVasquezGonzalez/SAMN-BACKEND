import mongoose from "mongoose";
import { MONGO_URI } from '../config/envConfig'

const db = mongoose.connection;

export const conectarDb = async (): Promise<void> => {
    try {
        const mongoUri = MONGO_URI
        if(!mongoUri) {
            console.log(`The environment variable is not defined`)
            process.exit(1)
        }

        mongoose.connect(mongoUri, {dbName: "samn"})
            .catch((err) => {
                throw new Error(`I didn't connect to the db, check your credentials, ${err}`)
            });

        db.on("open", () => {
            console.log("The database has been connected")
        });

    } catch (err) {
        console.log(`There was an error with the database: ${err}`)
    }
}

conectarDb()