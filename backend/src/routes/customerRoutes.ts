import { Router, Request, Response } from "express";
import Customer from "../model/Customer";

const router = Router();

// /* GET customers */
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

/* POST customer (React form data) */
router.post("/", async (req: Request, res: Response) => {
  try {

    const { streetname, city, pincode, payment } = req.body;

    const newCustomer = new Customer({
      streetname,
      city,
      pincode,
      payment
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer saved", data: newCustomer });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;