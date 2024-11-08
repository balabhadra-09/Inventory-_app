const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SettingsSchema = new Schema({
    applicationName:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    copyrightDetails:{
        type:String,
        require:true
    },
    logo:{type:String},
    favIcon:{type:String}
});

module.exports = mongoose.model('Settings' , SettingsSchema);