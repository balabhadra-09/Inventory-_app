const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemCategorySchma =new Schema({
    categoryname:{
        type:String,
        require:true
    },
    categorycode:{
        type:Number,
        require:true
    },

   email:{
        type:String,
        require:true,
        uniqe:true
   },
   mobile:{
        type:String,
        require:true
   },
   address:{
        type:String,
         require:true
   },
   description:{
        type:String,
    require:true
   }
  
},
{ timestamps: true });

module.exports = mongoose.model("ItemCategory", ItemCategorySchma);