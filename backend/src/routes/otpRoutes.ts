import express, { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import Userotp, { IUser } from "../model/Userotp";

const router: Router = express.Router();

// Generate OTP (string is better for comparison)
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
router.post("/send-otp", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: { email: string } = req.body;

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    let user: IUser | null = await Userotp.findOne({ email });

    if (!user) {
      user = new Userotp({ email, otp, otpExpiry: expiry });
    } else {
      user.otp = otp;
      user.otpExpiry = expiry;
    }

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL!,
        pass: process.env.PASSWORD!
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Login",
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
});

// Verify OTP
router.post("/verify-otp", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp }: { email: string; otp: string } = req.body;

    const user: IUser | null = await Userotp.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
});

export default router;