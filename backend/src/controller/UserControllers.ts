import express, { Response } from "express";
import User from "../model/User";

import { AuthRequest } from "../types/types";




// ✅ GET ALL USERS
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    // 🔐 Optional admin check
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const users = await User.find().select("-password"); // hide password

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}


// ✅ DELETE USER
export const deleteUser =  async (req: AuthRequest, res: Response) => {
  try {
    // 🔐 Admin check
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Delete Failed" });
  }
}
