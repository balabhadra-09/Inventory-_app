 
const BillUploadModel = require("../Models/BillUploadModel");
const path = require("path")

exports.BillUpload = async (req, res) => {
    try {
        const folderPath = 'uploads/';
        let uploadFile = '';   

       
        if (req.file) {
            uploadFile = path.join(folderPath, req.file.filename).replace(/\\/g, '/');
        }
        const { purchaseOrder, date } = req.body;
        if (!purchaseOrder || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
 
        const parsedDate =  date ? new Date(date) : undefined
      
 
        const newBillUpload = new BillUploadModel({
            purchaseOrder,
            date: parsedDate,  
            uploadFile
        });

      
        await newBillUpload.save();
 
        return res.status(200).json({
            success: true,
            message: "Bill uploaded successfully!",
            data: newBillUpload
        });
    } catch (error) {
        console.error('Error uploading bill:', error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}; 