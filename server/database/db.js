// import mongoose from 'mongoose';

// mongoose.connect('mongodb://127.0.0.1/blog');
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// export default db;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri=process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    // Increase the connection timeout to 30 seconds
  connectTimeoutMS: 30000,
  // Increase the socket timeout to 30 seconds
  socketTimeoutMS: 30000,
  }
});

const run=async()=> {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    
    // Send a ping to confirm a successful connection
    await client.db("blogVerse").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Return the client instance for further operations
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on failure
  }
}
run().catch(console.dir);

export default run;
