import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import dishRoutes from './routes/dishRoutes';
import cartRoutes from './routes/cartRoutes';
import customerRoutes from './routes/customerRoutes'
import userRoutes from './routes/userRoutes'
import otpRoutes from './routes/otpRoutes'
import adminRoutes from './routes/adminRoutes'
import orderRoutes from './routes/orderRoutes'
import admindashRoutes from './routes/admindash';
import reviewRoutes from './routes/reviewRoutes';
dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
	...(process.env.FRONTEND_URL || '').split(',').map((origin) => origin.trim()),
	'https://food-delivery-app-mu-ten.vercel.app',
	'http://localhost:3000',
	'http://localhost:5173',
].filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error(`CORS origin not allowed: ${origin}`));
	},
}));
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

export default app;

if (!process.env.VERCEL) {
	const PORT = Number(process.env.PORT) || 5000;
	app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}
