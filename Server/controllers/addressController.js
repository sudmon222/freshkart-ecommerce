import Address from '../models/Address.js';

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;  // <-- userId comes from authUser middleware
        const address = req.body.address;

        if (!userId) {
            return res.json({ success: false, message: "User ID missing" });
        }

        const newAddress = await Address.create({
            userId,
            ...address
        });

        res.json({ success: true, message: "Address added", address: newAddress });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({userId});
        res.json({success: true, addresses});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}