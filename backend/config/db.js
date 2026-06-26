const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Modern Mongoose (v7+) no longer needs these options,
            // but keeping for backward-compat reference
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host} — DB: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

// Graceful disconnect on app termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed (app termination).');
    process.exit(0);
});

module.exports = connectDB;
