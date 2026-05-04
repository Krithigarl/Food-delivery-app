import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
     phone: {
      type: Number,
      required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>("User", UserSchema);