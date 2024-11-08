 
const PurchaseModel = require("../Models/PurchaseModel");

const CreatePurchase = async (req, res) => {
  try {
    const { vendor, items, purchaseDate, totalPrice} = req.body;

    if (!vendor || !items || !purchaseDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Item array is required and cannot be empty',
      });
    }

    const newPurchase = new PurchaseModel({
      vendor,
      items,
      purchaseDate,
      totalPrice
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      message: 'Purchase added successfully',
      data: newPurchase,
    });
  } catch (error) {
    console.error('Error in adding purchase:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add purchase',
      error: error.message,
    });
  }
}

const GetPurchase = async (req, res) => {
  try {
    const purchases = await PurchaseModel.find();
    if (!purchases) {
      return res.status(401).json({
        success: false,
        message: "purchase are not found"
      })
    }
    return res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get purchase details',
      error: error.message,
    });
  }
}


module.exports = {
  CreatePurchase,
  GetPurchase
}