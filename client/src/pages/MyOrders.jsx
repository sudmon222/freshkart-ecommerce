import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const { currency, axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (data.success) {
                setMyOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyOrders();
        }
    }, [user]);

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {myOrders.map((order) => (
                <div key={order._id}
                    className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
                >
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>Order ID: {order._id}</span>
                        <span>Payment: {order.paymentType}</span>
                        <span>Total Amount: {currency}{order.amount}</span>
                    </p>

                    {order.items.map((item, index) => {
                        const p = item.product || {};

                        // SAFE IMAGE HANDLING
                        const img =
                            p.images?.[0] ||
                            p.image?.[0] ||
                            "https://via.placeholder.com/100?text=No+Image";

                        return (
                            <div
                                key={index}
                                className={`relative bg-white text-gray-500/70 
                                ${order.items.length !== index + 1 && "border-b"} 
                                border-gray-300 flex flex-col md:flex-row md:items-center 
                                justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                            >

                                {/* IMAGE + TITLE */}
                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-primary/10 p-4 rounded-lg'>
                                        <img
                                            src={img}
                                            alt={p.name}
                                            className='w-16 h-16 object-cover'
                                        />
                                    </div>

                                    <div className='ml-4'>
                                        <h2 className='text-xl font-medium text-gray-600'>
                                            {p.name}
                                        </h2>
                                        <p>Category: {p.category}</p>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className='text-gray-800 text-lg'>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Status: {order.status || "Pending"}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                {/* AMOUNT */}
                                <p className='text-primary/85 text-lg font-medium'>
                                    Amount: {currency}{(p.offerPrice || 0) * item.quantity}
                                </p>

                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}

export default MyOrders
