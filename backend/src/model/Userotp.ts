import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define Interface
export interface IUser extends Document {
  email: string;
  otp: string;
  otpExpiry: Date;
}

// 2. Create Schema
const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true }
});

// 3. Create Model
const User: Model<IUser> = mongoose.model<IUser>("Userotp", userSchema);

// 4. Export
export default User;