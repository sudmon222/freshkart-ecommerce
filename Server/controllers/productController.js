import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        if (!images || images.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        const imagesUrl = [];
        for (let img of images) {
            const uploaded = await cloudinary.uploader.upload(img.path, {
                resource_type: "image"
            });
            imagesUrl.push(uploaded.secure_url);
        }

        await Product.create({
            ...productData,
            images: imagesUrl   // MUST MATCH FRONTEND
        });

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Get Product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get Single Product : /api/product/id
export const productById = async (req, res) => {
    try {
        const id = req.params.id || req.query.id || req.body.id;
        const product = await Product.findById(id);
        res.json({success: true, product});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { inStock, quantity: inStock ? 1 : 0 }, 
            { new: true }
        );

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Stock Updated", product: updatedProduct });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
