const mongoose = require("mongoose");
const SalesSchema = new mongoose.Schema({
    party: { type: String, require: true },
    salesDate: { type: Date, default: Date.now, require: true },
    items: [
        {
            itemId: { type: String },
            itemName: { type: String },
            quantity: { type: Number },
            category: { type: String }
        }
    ]

});

module.exports = mongoose.model('Sales', SalesSchema)