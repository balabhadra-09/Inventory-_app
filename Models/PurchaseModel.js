const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = Schema({
     vendor:{
        type:String,
        require:true
     },
     items:[{
      itemName: {type:String},
      category:{type:String},
      unitPrice:{type:String},
      gstRate:{type:Number},
      itemPrice:{type:Number},
      quantity:{type:Number}
     }],
     purchaseDate:{
        type:Date,
        require:true
     },
    
     totalPrice:{type:String , require:true}
},
{ timestamps: true });

module.exports = mongoose.model("Purchase",PurchaseSchema);