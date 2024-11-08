const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const ItemCreationSchema = new Schema({
    itemName:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true
    },
    unitPrice:{
        type:Number,
        require:true
    },
    stockQuantity:{
        type:Number,
        require:true
    },
    gstRate:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    minimumlevel:{
        type:Number,
        require:true
     },
     maximumlevel:{
        type:Number,
        require:true
     }
});

module.exports = mongoose.model("ItemCreation" , ItemCreationSchema)