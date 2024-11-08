const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    vendor: { type: String, required: true },
    purchaseOrder: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentType: { type: String, required: true },
    amount: { type: Number, required: true },
    outStanding :{ type:Number}
},
{ timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);