const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchma = Schema({
   
    username:{
        type:String,
        require:[true, " Username is required"],
        uniqe:true
    },
    password:{
        type:String,
        require:[true, "password is required"]
    },
},
{ timestamps: true });

module.exports = mongoose.model("Auth", AuthSchma);