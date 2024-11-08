 
const ItemCreationModel = require("../Models/ItemCreationModel");

exports.ItemCreate = async (req, res) => {
    try {
      const {itemId, categoryId, unitPrice, stockQuantity, gstRate, description,minimumlevel,maximumlevel } = req.body;
   
      if (!itemName || !unitPrice || !stockQuantity || !gstRate || minimumlevel === undefined || maximumlevel === undefined) {
        return res.status(400).json({ message: "Validation failed: all fields are required" });
      }
  
  
      const newItem = new ItemCreationModel({
        itemId,
        categoryId,
        unitPrice,
        stockQuantity,
        gstRate , 
        description,
        minimumlevel,
        maximumlevel
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Item created successfully', data: newItem });
    } catch (error) {
      console.error('Error creating item:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  exports.getAllItems = async (req, res) => {
    try {
      const items = await ItemCreationModel.find(); 
  
      if (items.length === 0) {  
        return res.status(404).json({ message: 'No items found' });
      }
  
      res.status(200).json({
        success: true,
        data: items,  
      });
    } catch (error) {
      console.error('Error fetching items:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  exports.getItemById = async (req, res) => {
    try {
      const { id } = req.params;
     
      const item = await ItemCreationModel.findById(id);
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
   
      return res.status(200).json({
        success: true,
        data: item, 
      });
    } catch (error) {
      console.error('Error retrieving item:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  exports.updateItem = async (req, res) => {
    try {
      const { id } = req.params;
      
      const updatedItem = await ItemCreationModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found or update failed' });
      }
  
      res.status(200).json({
        message: 'Item updated successfully',
        data: updatedItem,
      });
    } catch (error) {
      console.error('Error updating item:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  exports.updateStock = async (req, res) => {
    try {
      const updates = req.body;
  
      const results = await Promise.all(updates.map(async ({ itemId, quantity }) => {
        if (!itemId || isNaN(quantity)) {
          return { itemId, message: 'Invalid itemId or quantity' };
        }
  
        const updatedItem = await ItemCreationModel.findByIdAndUpdate(
          {_id:itemId},
          { $inc: { stockQuantity: Number(quantity) } },
          { new: true, runValidators: true }
        );
        
        return {
          itemId,...(updatedItem && { data: updatedItem })
           };
      }));
  
      return res.status(200).json({ message: 'Items updated succssfully', results });
    } catch (error) {
      console.error('Error updating items:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  exports.StockDecrease = async (req, res) => {
    try {
      const updates = req.body;
  
      const results = await Promise.all(updates.map(async ({ itemId, quantity }) => {
        if (!itemId || isNaN(quantity)) {
          return { itemId, message: 'Invalid itemId or quantity' };
        }
  
        const updatedItem = await ItemCreationModel.findByIdAndUpdate(
          {_id:itemId},
          { $inc: { stockQuantity: -Number(quantity) } },
          { new: true, runValidators: true }
        );
        
        return {
          itemId,...(updatedItem && { data: updatedItem })
           };
      }));
  
      return res.status(200).json({ message: 'Items updated succssfully', results });
    } catch (error) {
      console.error('Error updating items:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  
  exports.deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await ItemCreationModel.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found or delete failed' });
      }
  
      res.status(200).json({
        message: 'Item deleted successfully',
        data: deletedItem,
      });
    } catch (error) {
      console.error('Error deleting item:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  