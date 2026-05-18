import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  name: string;
  email: string;
  items: IOrderItem[];
  totalAmount: number;
  address: string;
  status:
    | "Placed"
    | "Confirmed"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    items: {
      type: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        }
      ],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);