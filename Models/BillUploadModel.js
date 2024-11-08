const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillUploadSchema = new Schema({
    purchaseOrder:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now,
        require:true
    },
    uploadFile:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("BillUpload", BillUploadSchema);

//  const parsedDate =  date ? new Date(date) : undefined;