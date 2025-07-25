// ...existing code...
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a global variable to persist the cache across hot reloads in development
let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  (global as any).mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
// ...existing code...

export default dbConnect;
