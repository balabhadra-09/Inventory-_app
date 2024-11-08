const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    username: { type: String, require: true,},
    email: { type: String, require: true },
    password: { type: String, require: true,},
    mobile: { type: Number, require: true },
    role: { type: String, require: true },
    address: { type: String, require: true },
    profilePicture: { type: String, require: true },
},
    { timestamps: true });

module.exports = mongoose.model("Users", UsersSchema);