const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/canteen42',
});

const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const testPgConnection = async () => {
  try {
    const client = await pgPool.connect();
    console.log('PostgreSQL connected');
    client.release();
    return true;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    return false;
  }
};

module.exports = {
  pgPool,
  connectMongoDB,
  testPgConnection
};
