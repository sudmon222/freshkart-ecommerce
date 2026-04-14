import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Stripe from 'stripe';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------ COD ORDER ------------------
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId;
        const {address, items } = req.body;
        if (!address || !items?.length) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Correct total calculation
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.round(amount * 0.02); // GST 2%

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: false
        });

        return res.json({ success: true, message: "Order placed successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------ STRIPE ORDER ------------------
export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        const { address, items } = req.body;
        const { origin } = req.headers;

        if (!address || !items?.length) {
            return res.json({ success: false, message: "Invalid data" });
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });

            amount += product.offerPrice * item.quantity;
        }

        amount += Math.round(amount * 0.02); // GST

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false
        });

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 1.02 * 100)  // INR → paise
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            payment_intent_data: {
                metadata: {
                    orderId: order._id.toString(),
                    userId
                }
            }
        });

        return res.json({ success: true, url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------ STRIPE WEBHOOK ------------------
export const stripeWebhooks = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        let orderId, userId;

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            orderId = session.metadata.orderId;
            userId = session.metadata.userId;

        } else if (event.type === "payment_intent.succeeded") {
            const intent = event.data.object;
            orderId = intent.metadata.orderId;
            userId = intent.metadata.userId;
        } else {
            return res.status(200).json({ received: true });
        }

        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        res.status(200).json({ received: true });

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

// ------------------ USER ORDERS ------------------
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;

        if (!userId) {
            return res.json({ success: false, message: "User ID missing" });
        }

        const orders = await Order.find({ userId })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ------------------ SELLER ALL ORDERS ------------------
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
