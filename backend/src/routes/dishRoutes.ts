import { Router, Request, Response } from 'express';
import Dish from '../model/Dish';

const router = Router();

// GET /dishes
router.get('/', async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
