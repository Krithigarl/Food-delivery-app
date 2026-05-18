import express from "express";

import Order from "../model/Myorder";

const router = express.Router();


// DASHBOARD ANALYTICS
router.get("/analytics", async (req, res) => {

  try {

    // Total Orders
    const totalOrders = await Order.countDocuments();

    
    // Total Revenue
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );


    // Delivered Orders
    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });


    // Pending Orders
    const pendingOrders = await Order.countDocuments({
      status: {
        $ne: "Delivered",
      },
    });


    // Status Counts
    const placed = await Order.countDocuments({
      status: "Placed",
    });

    const preparing = await Order.countDocuments({
      status: "Preparing",
    });

    const outForDelivery = await Order.countDocuments({
      status: "Out for Delivery",
    });


    res.json({
      totalOrders,
      totalRevenue,
      deliveredOrders,
      pendingOrders,

      statusData: {
        placed,
        preparing,
        outForDelivery,
        delivered: deliveredOrders,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Analytics fetch failed",
    });

  }
});

export default router;