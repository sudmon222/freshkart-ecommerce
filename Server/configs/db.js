import mongoose from "mongoose";

let connectionPromise;

const getDatabaseUri = () => {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
        throw new Error("MONGODB_URI is not set");
    }

    // Preserve an explicit database name from the environment.
    if (/mongodb(\+srv)?:\/\/[^/]+\/[^?]+/.test(uri)) {
        return uri;
    }

    return `${uri.replace(/\/+$/, "")}/freshcart`;
};

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        mongoose.connection.on("connected", () => console.log("Database Connected"));
        mongoose.connection.on("error", (error) =>
            console.error("MongoDB connection error:", error.message)
        );

        connectionPromise = mongoose.connect(getDatabaseUri(), {
            serverSelectionTimeoutMS: 30000
        });
    }

    try {
        await connectionPromise;
        return mongoose.connection;
    } catch (error) {
        connectionPromise = null;
        throw error;
    }
};

export default connectDB;
