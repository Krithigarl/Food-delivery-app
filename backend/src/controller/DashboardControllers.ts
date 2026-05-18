import express, { Request, Response } from "express";
import { Router } from "express";

import User from "../model/User";
import Food from "../model/Food";
import Order from "../model/Myorder";


// Define Order Type (important for TypeScript)
interface IOrder {
  totalAmount: number;
}

// GET Dashboard Data
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const totalUsers: number = await User.countDocuments();
    const totalFoods: number = await Food.countDocuments();
    const totalOrders: number = await Order.countDocuments();

    const orders: IOrder[] = await Order.find();

    const revenue: number = orders.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);

    res.json({
      totalUsers,
      totalFoods,
      totalOrders,
      revenue,
    });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

