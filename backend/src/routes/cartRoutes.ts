import { Router, Request, Response } from 'express';
import CartItem from '../model/CartItem';
import Dish from '../model/Dish';

const router = Router();

// GET /cart
router.get('/', async (req: Request, res: Response) => {
  try {
    const cart = await CartItem.find().populate('dish');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /cart - add dish to cart
router.post('/', async (req: Request, res: Response) => {
  const { dishId } = req.body;
  try {
    const existingItem = await CartItem.findOne({ dish: dishId });
    if (existingItem) {
      existingItem.qty += 1;
      await existingItem.save();
      return res.json(existingItem);
    }
    const newItem = new CartItem({ dish: dishId,qty: 1 });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /cart/:id - update qty
router.patch('/:id', async (req: Request, res: Response) => {
  const { type } = req.body; // "inc" or "dec"
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (type === 'inc') item.qty += 1;
    if (type === 'dec') item.qty -= 1;

    if (item.qty <= 0) {
  await CartItem.deleteOne({ _id: item._id });
  return res.json({ message: 'Item removed' });
}
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /cart/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
