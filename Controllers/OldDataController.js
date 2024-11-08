
const csv = require("csvtojson");
const path = require('path');

const ItemCreationModel = require("../Models/ItemCreationModel");

exports.OldataUpload = async (req, res) => {
  try {
    const folderPath = 'uploads/';
    let filePath = '';


    if (req.file) {
      filePath = path.join(folderPath, req.file.filename).replace(/\\/g, '/');
    }

    if (!filePath) {
      return res.status(400).json({ message: "Please provide a valid CSV/Excel file" });
    }

    const jsonArray = await csv().fromFile(filePath);

    const newItems = await ItemCreationModel.insertMany(jsonArray);

    return res.status(200).json({
      message: "File uploaded, data processed and successfully",
      data: newItems
    });
  } catch (error) {
    console.error('Error processing file:', error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};




