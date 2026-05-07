import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();

const port = process.env.PORT || 8000;
await connectDB();
connectCloudinary();

const defaultAllowedOrigins = [
    'http://localhost:5173',
    'https://freshkart-ecommerce-bzbf.vercel.app',
    'https://freshkart-ecommerce.vercel.app'
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) || [];

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];
const vercelPreviewPattern = /^https:\/\/freshkart-ecommerce(?:-[a-z0-9-]+)?\.vercel\.app$/;

const corsOptions = {
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            vercelPreviewPattern.test(origin)
        ) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// Middleware Configuration
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());

app.get('/', (req, res) => res.send('API is working!'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

if (process.env.VERCEL !== '1') {
    app.listen(port, () => {
        console.log(`PORT connected on ${port}`);
    });
}

export default app;
