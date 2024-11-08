const mongoose = require("mongoose");
const  OutstandingPaymentSchema = new mongoose.Schema({
    paymentId: { type: String},
    outStanding: { type: Number }
});

module.exports = mongoose.model('OutstandingPaymen', OutstandingPaymentSchema);