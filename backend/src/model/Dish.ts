import mongoose, { Schema, Document } from 'mongoose';

export interface IDish extends Document {
  name: string;
  price: number;
  image: string;
}

const DishSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IDish>('Dish', DishSchema);
