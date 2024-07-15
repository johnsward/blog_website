const mongoose = require('mongoose');

// Declare a variable to hold the connected database instance.
let cachedDb = null;

async function connectToDatabase() {
    // If the database connection is cached,
    // use it instead of creating a new connection.
    if (cachedDb) {
        console.log('Using existing database connection');
        return cachedDb;
    }

    // If no connection is cached, create a new one.
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB using the connection string from environment variables
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // Disable MongoDB driver buffering
    });

    console.log('New database connection created');

    // Cache the database connection and return it.
    cachedDb = db;
    return db;
}

module.exports = connectToDatabase;
