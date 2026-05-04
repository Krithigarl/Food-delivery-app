import express, { Response } from "express";
import Order from "../model/Order";
import { AuthRequest } from "../types/types";




// ✅ GET ALL ORDERS
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().populate("userId", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}


// ✅ UPDATE ORDER STATUS
export const updateOrder =  async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ msg: "Update Failed" });
  }
}

