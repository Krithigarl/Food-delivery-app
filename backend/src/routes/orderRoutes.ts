import express, {
  Request,
  Response,
} from "express";

import Order from "../model/Myorder";

import sendEmail from "../utils/sendMailer";

const router = express.Router();


// CREATE ORDER
router.post(
  "/create",
  async (req: Request, res: Response) => {

    try {

      const {
        userId,
        name,
        email,
        items,
        totalAmount,
        address,
      } = req.body;


      // Validation
      if (
        !userId ||
        !name ||
        !email ||
        !items ||
        !totalAmount ||
        !address
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }


      // Create Order
      const order = await Order.create({
        userId,
        name,
        email,
        items,
        totalAmount,
        address,
      });


      // Send Email (do not block order creation if email fails)
      try {
        await sendEmail({
          to: email,
          subject: "Order Confirmation",
          text: `
Hello ${name},

Your order has been placed successfully.

Order Amount: ₹${totalAmount}

Delivery Address:
${address}

Current Status:
Placed

Thank you for ordering with us 
          `,
        });
      } catch (emailError) {
        console.error("Order created but email failed:", emailError);
      }


      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error,
      });

    }
  }
);


// GET ALL ORDERS
router.get(
  "/",
  async (req: Request, res: Response) => {

    try {

      const orders = await Order.find();

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch orders",
      });

    }
  }
);


// UPDATE ORDER STATUS
router.put(
  "/:id/status",
  async (req: Request, res: Response) => {

    try {

      const { status } = req.body;


      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );


      if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }


      // Send Status Update Email
      await sendEmail({

        to: updatedOrder.email,

        subject: "Order Status Updated",

        text: `
Hello ${updatedOrder.name},

Your order status has been updated.

Current Status:
${status}

Thank you for using Food Delivery App 🍕
        `,
      });


      res.json({
        success: true,
        message: "Status updated",
        updatedOrder,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Failed to update status",
        error,
      });

    }
  }
);

export default router;