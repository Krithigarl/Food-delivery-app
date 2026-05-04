import express from "express";
import { addFood, getFoods, deleteFood, updateFood } from "../controller/FoodControllers";
import { auth, adminMiddleware } from "../middleware/Auth";
import { getDashboard } from "../controller/DashboardControllers";
import { getOrders, updateOrder } from "../controller/OrderControllers";
import { deleteUser, getUsers } from "../controller/UserControllers";

// Dashboard route

const router = express.Router();
router.post("/add-food", auth, adminMiddleware, addFood);
router.get("/foods", getFoods);
router.delete("/food/:id", auth, updateFood);
router.delete("/food/:id", auth, deleteFood);
router.get("/dashboard", auth, getDashboard);
router.get("/order", auth,  getOrders);
router.put("/order/:id", auth, updateOrder);
router.get("/users",auth,getUsers);
router.delete("/users/:id", auth,deleteUser);
export default router;