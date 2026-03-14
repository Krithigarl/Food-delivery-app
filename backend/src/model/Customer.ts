import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  streetname: string;
  city: string;
  pincode: number;
  payment: string;
}

const CustomerSchema: Schema = new Schema(
  {
    streetname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      enum: ["cod", "upi"],   // allowed values
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);