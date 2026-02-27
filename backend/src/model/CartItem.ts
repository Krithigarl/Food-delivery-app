import mongoose, { Schema, Document } from 'mongoose';
import { IDish } from './Dish';

export interface ICartItem extends Document {
  dish: IDish['_id'];
  Name: IDish['name']
  qty: number;
}

const CartItemSchema: Schema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
  qty: { type: Number, required: true, default: 1 },
});

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);
