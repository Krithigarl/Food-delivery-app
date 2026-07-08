import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db';
import dishRoutes from './src/routes/dishRoutes';
import cartRoutes from './src/routes/cartRoutes';
import customerRoutes from './src/routes/customerRoutes'
import userRoutes from './src/routes/userRoutes'
import otpRoutes from './src/routes/otpRoutes'
import adminRoutes from './src/routes/adminRoutes'
import orderRoutes from './src/routes/orderRoutes'
import admindashRoutes from './src/routes/admindash';
import reviewRoutes from './src/routes/reviewRoutes';
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/dishes', dishRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes)
app.use("/api/placeorder", customerRoutes);
app.use("/api", otpRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admindash", admindashRoutes);
app.use("/api/reviews", reviewRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
