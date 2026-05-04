import { Router, Request, Response } from "express";
import User from "../model/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router = Router();

const SECRET = "mysecretkey";

/* REGISTER */
router.post("/register", async (req: Request, res: Response) => {

  try {

    const { name, email, password,phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "user"
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

});


/* LOGIN */
router.post("/login", async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id,role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

});

export default router;