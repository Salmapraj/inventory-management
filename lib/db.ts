import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URL!;

let cached = global as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.mongoose.conn) return cached.mongoose.conn;

  cached.mongoose.promise = mongoose.connect(MONGODB_URI);
  cached.mongoose.conn = await cached.mongoose.promise;

  return cached.mongoose.conn;
}
 