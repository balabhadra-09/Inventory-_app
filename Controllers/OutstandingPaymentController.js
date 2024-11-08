const OutstandingModel = require("../Models/OutstanadingModel");
const PaymentModel = require("../Models/PaymentModel");



exports.Outstanding = async (req, res) => {
    try {
        const { purchaseId, paymentId, totalPrice } = req.body;

        if (!purchaseId || !paymentId || totalPrice === undefined) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const payment = await PaymentModel.findOne({ _id: paymentId });
        if (!payment) {
            return res.status(404).json({ msg: 'Payment ID not found' });
        }

        const remainingAmount = totalPrice - payment.amount;

        console.log('Total Price:', totalPrice);
        console.log('Payment Amount:', payment.amount);
        console.log('Calculated Remaining Amount:', remainingAmount);

        
        const outstandingPayment = new OutstandingModel({
            purchaseId: purchaseId,
            paymentId: paymentId,
            totalPrice: totalPrice,
            outStanding: remainingAmount
        });

        await outstandingPayment.save();

        
        res.status(200).json({
            msg: 'Outstanding payment calculated and saved successfully',
            data: outstandingPayment
        });
    } catch (error) {
        console.error('Error calculating outstanding payment:', error.message);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
};

exports.GetOutstanding = async (req,res) => {
    try {
        const outstanding = await OutstandingModel.find();
        if (!outstanding) {
            throw new Error("No data found");
        } 
        return res.status(200).json({
            success:true,
            data:outstanding
        })
        
    } catch (error) {
        console.error('Error outstanding:', error.message);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
    
}
