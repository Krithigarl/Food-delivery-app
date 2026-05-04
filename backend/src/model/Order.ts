import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Interface for Order Document
export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  totalAmount: number;
  status: string;
  createdAt: Date;
}

// 2. Schema
const orderSchema: Schema<IOrder> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Model
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;