import jwt from 'jsonwebtoken';
import { getAuthCookieOptions, getCookieOptions } from '../utils/cookieOptions.js';

// Seller Login : /api/seller/login
export const sellerLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.cookie('sellerToken', token, getAuthCookieOptions());
            return res.json({success: true, message: "Logged In!"});
        }
        else{
            return res.json({success: false, message: "Invalid Credentials!"});
        }
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Check Seller Auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success: true});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message}); 
    }
}

// Check Seller Logout : /api/seller/logout
export  const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', getCookieOptions());
        return res.json({success: true, message: 'Admin Logged Out!'});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
