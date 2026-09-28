# 🛒 FreshKart — Full-Stack Grocery E-Commerce Platform

FreshKart is a **full-stack grocery e-commerce web application** built using the **MERN stack**. It provides customers with a complete online grocery shopping experience, including authentication, product browsing, cart management, address management, order placement, and online payments.

The application also includes a **seller dashboard** for managing products, inventory, and customer orders.

## 🌐 Live Demo

**[FreshKart — Live Application](https://freshkart-ecommerce-nugn.vercel.app/)**

**GitHub Repository:**
https://github.com/sudmon222/freshkart-ecommerce

---

## ✨ Features

### 👤 Customer Features

* User registration and login
* JWT-based authentication
* Secure HTTP-only authentication cookies
* Browse available grocery products
* Product category browsing
* Product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Manage delivery addresses
* Cash on Delivery (COD)
* Online payment using Stripe
* View order history
* Responsive user interface

### 🏪 Seller Features

* Seller authentication
* Protected seller dashboard
* Add new products
* Upload product images
* Cloudinary image storage
* Manage product availability
* View customer orders
* Manage product inventory

### ⚙️ Backend Features

* RESTful APIs using Express.js
* MongoDB database with Mongoose
* JWT authentication
* Password hashing using bcrypt
* Separate user and seller authentication middleware
* Stripe payment integration
* Stripe webhook handling
* Cloudinary image upload
* CORS configuration
* Environment-based configuration

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **React Hot Toast**
* **Vite**

## Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **Multer**
* **Cloudinary**
* **Stripe**
* **Cookie Parser**
* **CORS**
* **dotenv**

---

# 📁 Project Structure

```text
FreshKart/
│
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   └── seller/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── Server/                         # Node.js + Express backend
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── netlify.toml
└── package.json
```

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │     React Client     │
                    │  React + Tailwind    │
                    └──────────┬───────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │       Node.js        │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       ┌───────────┐     ┌────────────┐    ┌────────────┐
       │  MongoDB  │     │ Cloudinary │    │   Stripe   │
       │ Mongoose  │     │   Images   │    │  Payments  │
       └───────────┘     └────────────┘    └────────────┘
```

The frontend communicates with the backend through REST APIs. The backend handles authentication, business logic, database operations, image uploads, order processing, and payment integration.

---

# 🔐 Authentication Flow

```text
User Registration / Login
          ↓
Backend validates credentials
          ↓
Password verification using bcrypt
          ↓
JWT token generated
          ↓
JWT stored in HTTP-only cookie
          ↓
Authentication middleware
          ↓
Protected API requests
```

The application uses separate authentication middleware for regular users and sellers.

---

# 💳 Payment Flow

FreshKart supports both **Cash on Delivery** and **online Stripe payments**.

```text
Customer adds products
          ↓
Checkout
          ↓
Select payment method
          ↓
 ┌────────┴─────────┐
 │                  │
COD              Stripe
 │                  │
 ↓                  ↓
Create Order    Checkout Session
                    ↓
                Payment
                    ↓
             Stripe Webhook
                    ↓
             Update Payment
                 Status
```

---

# 🗄️ Database Models

### User

Stores customer information such as:

* Name
* Email
* Hashed password
* Cart information

### Product

Stores:

* Product name
* Description
* Price
* Offer price
* Product images
* Category
* Quantity
* Stock availability

### Address

Stores:

* User ID
* Name
* Email
* Street
* City
* State
* ZIP code
* Country
* Phone number

### Order

Stores:

* User ID
* Ordered products
* Quantity
* Total amount
* Delivery address
* Order status
* Payment type
* Payment status
* Timestamps

---

# 🔌 API Overview

## User APIs

| Method | Endpoint             | Purpose              |
| ------ | -------------------- | -------------------- |
| POST   | `/api/user/register` | Register a new user  |
| POST   | `/api/user/login`    | Login user           |
| GET    | `/api/user/is-auth`  | Check authentication |
| GET    | `/api/user/logout`   | Logout user          |

## Product APIs

| Method | Endpoint             | Purpose              |
| ------ | -------------------- | -------------------- |
| GET    | `/api/product/list`  | Get all products     |
| GET    | `/api/product/id`    | Get product by ID    |
| POST   | `/api/product/add`   | Add a product        |
| POST   | `/api/product/stock` | Update product stock |

## Cart APIs

| Method | Endpoint           | Purpose            |
| ------ | ------------------ | ------------------ |
| POST   | `/api/cart/update` | Update user's cart |

## Address APIs

| Method | Endpoint           | Purpose              |
| ------ | ------------------ | -------------------- |
| POST   | `/api/address/add` | Add delivery address |
| GET    | `/api/address/get` | Get user's addresses |

## Order APIs

| Method | Endpoint            | Purpose                |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/order/cod`    | Place COD order        |
| POST   | `/api/order/stripe` | Create Stripe checkout |
| GET    | `/api/order/user`   | Get user's orders      |
| GET    | `/api/order/seller` | Get seller orders      |

## Seller APIs

| Method | Endpoint              | Purpose                     |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/seller/login`   | Seller login                |
| GET    | `/api/seller/is-auth` | Check seller authentication |
| GET    | `/api/seller/logout`  | Seller logout               |

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/sudmon222/freshkart-ecommerce.git
cd freshkart-ecommerce
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

Open another terminal:

```bash
cd Server
npm install
```

---

# 🔑 Environment Variables

## Client

Create:

```text
client/.env
```

Example:

```env
VITE_CURRENCY=₹
VITE_BACKEND_URL=http://localhost:8000
```

For the deployed application, use the deployed backend URL.

## Server

Create:

```text
Server/.env
```

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

NODE_ENV=development

SELLER_EMAIL=your_seller_email
SELLER_PASSWORD=your_seller_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

> **Never commit `.env` files or secret API credentials to GitHub.**

---

# ▶️ Run Locally

## Start Backend

```bash
cd Server
npm run server
```

Backend:

```text
http://localhost:8000
```

## Start Frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# ☁️ Deployment

The FreshKart application is deployed using **Vercel**.

### Live Application

https://freshkart-ecommerce-nugn.vercel.app/

For deployment, the frontend and backend need to be configured with the appropriate environment variables and production API URLs.

Important production configuration includes:

* MongoDB connection string
* JWT secret
* Cloudinary credentials
* Stripe credentials
* Stripe webhook secret
* Backend API URL
* Frontend origin/CORS configuration

---

# 🔒 Security

FreshKart implements several security mechanisms:

* Password hashing with bcrypt
* JWT-based authentication
* HTTP-only authentication cookies
* Secure cookies in production
* User authentication middleware
* Seller authentication middleware
* Stripe webhook signature verification
* Environment variables for sensitive credentials
* CORS configuration

---

# 🧠 Key Technical Concepts Demonstrated

This project demonstrates practical experience with:

* Full-stack MERN architecture
* REST API development
* React component-based development
* React Context API
* Authentication and authorization
* JWT
* HTTP-only cookies
* MongoDB and Mongoose
* CRUD operations
* Cart and order management
* Payment gateway integration
* Stripe webhooks
* Cloudinary image storage
* File uploads with Multer
* Axios API communication
* Responsive UI development
* Frontend/backend separation
* Deployment and environment configuration

---

# 📚 What I Learned

While developing FreshKart, I gained practical experience in designing and connecting the different layers of a full-stack application.

### Frontend

* Building reusable React components
* Managing application state
* Creating protected routes
* Connecting React with REST APIs
* Building responsive interfaces

### Backend

* Designing REST APIs
* Creating Express middleware
* Implementing authentication
* Handling database operations
* Managing orders and cart data

### Database

* Designing MongoDB schemas
* Using Mongoose models
* Performing CRUD operations
* Managing relationships between users, products and orders

### Third-Party Services

* Stripe payment integration
* Stripe webhook processing
* Cloudinary image management

### Deployment

* Managing production environment variables
* Connecting frontend and backend services
* Deploying the application using Vercel

---

# 🔮 Future Improvements

Possible future improvements include:

* Product reviews and ratings
* Wishlist functionality
* Product search and advanced filtering
* Pagination
* Order tracking
* Seller analytics dashboard
* Email notifications
* Automated API testing
* Improved inventory management
* Admin dashboard
* Better logging and monitoring

---

# 📸 Screenshots

Add screenshots of the major application pages here:

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
├── cart.png
├── checkout.png
├── my-orders.png
└── seller-dashboard.png
```

Example:

```md
![FreshKart Home Page](./screenshots/home.png)
```

---

# 👨‍💻 Author

## Sudipta Kumar Mondal

**B.Tech — Computer Science & Engineering**
**Dev Bhoomi Uttarakhand University**

GitHub:
https://github.com/sudmon222

---

# ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Live Demo:**
https://freshkart-ecommerce-nugn.vercel.app/

**Source Code:**
https://github.com/sudmon222/freshkart-ecommerce
