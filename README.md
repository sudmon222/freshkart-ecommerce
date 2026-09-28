# FreshKart – Online Grocery Ordering System 🛒

A full-stack **online grocery ordering platform** built using the **MERN stack**. FreshKart allows customers to browse groceries, manage their cart, save delivery addresses, place orders using **Cash on Delivery or Stripe**, and track their orders. Sellers/Admins can manage products, inventory, and customer orders.

The project was developed as a B.Tech CSE project and follows a modular full-stack architecture using React, Node.js, Express.js, and MongoDB. 

## ✨ Features

### 👤 Customer Features

* 🔐 User registration and login
* 🔑 JWT-based authentication
* 🛍️ Browse and search grocery products
* 📂 Category-based product browsing
* 🔎 Product details with multiple images
* 🛒 Add, remove, and update cart items
* 💰 Automatic subtotal, tax and total calculation
* 📍 Add and manage multiple delivery addresses
* 📦 Place and track orders
* 🧾 View order history
* 💳 Cash on Delivery
* 💳 Online payment using Stripe

### 👨‍💼 Seller/Admin Features

* ➕ Add new products
* 🖼️ Upload multiple product images
* ✏️ Update product information
* 💰 Manage product prices and offer prices
* 📦 Manage stock availability
* 👀 Toggle product visibility
* 📋 View and manage customer orders

These customer and seller modules are described in the project's system design, including product, cart, order/payment, and admin/seller functionality. 

## 🛠️ Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| **React.js**     | Frontend UI           |
| **Node.js**      | Backend runtime       |
| **Express.js**   | REST API & server     |
| **MongoDB**      | Database              |
| **Mongoose**     | MongoDB ODM           |
| **JWT**          | Authentication        |
| **Stripe**       | Online payments       |
| **Cloudinary**   | Product image hosting |
| **Axios**        | API requests          |
| **Tailwind CSS** | Styling               |
| **React Router** | Frontend routing      |
| **Multer**       | Image upload handling |

The project documentation specifically identifies MongoDB, Express.js, React.js, Node.js, Axios, JWT, Multer, Stripe API, Tailwind CSS, and Nodemon as the main technologies and supporting tools. 

## 🏗️ Project Architecture

```text
                    ┌─────────────────┐
                    │     React.js    │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                         REST APIs
                             │
                    ┌────────▼────────┐
                    │    Express.js   │
                    │     + Node.js   │
                    └──────┬─────┬────┘
                           │     │
                    ┌──────▼─┐ ┌─▼────────┐
                    │ MongoDB│ │  Stripe  │
                    │Database│ │ Payments │
                    └────────┘ └──────────┘
```

The project uses a layered architecture in which the React client communicates with the Express/Node backend, which handles authentication, business logic, API routing and database operations. 

## 📂 Main Modules

```text
FreshKart
│
├── User Authentication
│   ├── Register
│   ├── Login
│   └── Profile
│
├── Product Management
│   ├── Product Listing
│   ├── Search & Filter
│   └── Product Details
│
├── Shopping Cart
│   ├── Add Product
│   ├── Update Quantity
│   └── Remove Product
│
├── Address Management
│   ├── Add Address
│   ├── Edit Address
│   └── Select Address
│
├── Orders
│   ├── COD Orders
│   ├── Online Orders
│   └── Order History
│
├── Payments
│   └── Stripe Checkout
│
└── Seller/Admin
    ├── Add Products
    ├── Manage Products
    ├── Manage Stock
    └── Manage Orders
```

## 🔐 Authentication & Security

FreshKart uses **JWT authentication** to protect user-specific and seller operations. JWT tokens are stored in secure cookies, and protected routes verify the token before allowing access. Passwords are stored using hashing rather than plain text. 

## 💳 Payment System

FreshKart supports two payment methods:

* **Cash on Delivery (COD)**
* **Online Payment using Stripe**

For Stripe payments, the backend creates a Checkout Session and passes relevant order information to Stripe. After successful payment, the payment status is updated in the order record. 

## 🔌 API Examples

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/user/register` | Register user                 |
| POST   | `/api/user/login`    | Login user                    |
| GET    | `/api/product/list`  | Get products                  |
| POST   | `/api/cart/add`      | Add product to cart           |
| POST   | `/api/order/cod`     | Place COD order               |
| POST   | `/api/order/stripe`  | Create Stripe payment session |

These endpoints are documented in the project's API summary. 

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/sudmon222/freshkart-ecommerce.git
cd freshkart-ecommerce
```

### 2. Install dependencies

Install dependencies for the frontend and backend according to the repository structure:

```bash
npm install
```

If the project has separate frontend/backend directories:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure Environment Variables

Create `.env` files for the required backend configuration.

Typical services required by the project include:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Use the exact variable names expected by the source code in your repository.

### 4. Start the application

Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev
```

Then open the local frontend URL shown by your development server.

## 📸 Application Screens

The project includes:

* 🏠 Homepage
* 🛍️ Product Details
* 🛒 Shopping Cart
* 💳 Online Payment
* ➕ Seller Product Addition
* 📋 Seller Product Management

The project report documents these screens in Chapter 5, including the homepage, product details, cart, Stripe payment flow, and seller panels.  

## 🎯 Project Objectives

* Provide a simple and user-friendly grocery shopping experience
* Enable efficient product and inventory management
* Implement secure authentication
* Support COD and online payments
* Provide transparent order summaries
* Build a responsive and scalable full-stack application

## 🔮 Future Scope

Possible future improvements include:

* 📱 Mobile application
* 🎟️ Coupon and discount system
* 🚚 Delivery personnel management
* 🔔 Order status notifications
* 📊 Advanced seller analytics
* 🤖 Predictive inventory suggestions
* 📍 Improved delivery tracking
* 🔐 OTP-based verification

The project report identifies delivery management, coupons, predictive inventory, notifications, and mobile-app expansion among the future enhancement areas. 

## 👨‍💻 Developer

**Sudipta Kumar Mondal**

B.Tech Computer Science & Engineering
Dev Bhoomi Uttarakhand University

* GitHub: **[@sudmon222](https://github.com/sudmon222)**
* Project: **[FreshKart](https://github.com/sudmon222/freshkart-ecommerce)**

## ⭐ Support

If you find this project useful, consider giving the repository a **⭐ Star** on GitHub!

---

### GitHub repository description

You can also use this as the **short description** beside the repository name:

> 🛒 Full-stack online grocery ordering system built with MERN stack, featuring JWT authentication, product & inventory management, shopping cart, order tracking, COD and Stripe payments.
