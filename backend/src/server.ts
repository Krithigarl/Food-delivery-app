import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import dishRoutes from './routes/dishRoutes';
import cartRoutes from './routes/cartRoutes';
import customerRoutes from './routes/customerRoutes'
import userRoutes from './routes/userRoutes'
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/dishes', dishRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/placeorder", customerRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
