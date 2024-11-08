const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = Schema({
   vendorsname:{
        type:String,
        require:true
   },
   email:{
        type:String,
        require:true,
        uniqe:true
   },
   contactperson:{
        type:String,
        require:true
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

module.exports = mongoose.model("Vendor",VendorSchema );