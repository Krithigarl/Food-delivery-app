import { Request, Response } from "express";
import Dish from "../model/Dish";

// Add Dish
export const addFood = async (req: Request, res: Response) => {
  const food = new Dish(req.body);
  await food.save();
  res.json(food);
};

// Get Foods
export const getFoods = async (_req: Request, res: Response) => {
  const data = await Dish.find();
  res.json(data);
};

//Update Dish
export const updateFood = async (req:Request,res:Response) => {
  const updated = await Dish.findByIdAndUpdate(req.params.id,req.body,{new: true});
  res.json(updated);
}

// Delete Dish
export const deleteFood = async (req: Request, res: Response) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};