 
const PaymentModel = require("../Models/PaymentModel");
const OutstandingPaymentModel = require("../Models/OutstandingPaymentModel");
const PurchaseModel = require("../Models/PurchaseModel")
 
 
 

// exports.AddPayment = async (req, res) => {
//     try {
//         const { vendor, purchaseOrder, paymentDate, paymentType, amount,totalPrice } = req.body;

//         if (!vendor || !purchaseOrder || !paymentType || amount === undefined) {
//             return res.status(400).json({ msg: 'Missing required fields' });
//         }

//         const parsedPaymentDate = paymentDate ? new Date(paymentDate) : undefined;
 
//         const newPayment = new PaymentModel({
//             vendor,
//             purchaseOrder,
//             paymentDate: parsedPaymentDate,
//             paymentType,
//             amount
//         });

//         await newPayment.save();

         
      
//         console.log('Request Body:', req.body);

        
//         console.log('Looking for Purchase ID:',);
//         const purchase = await PurchaseModel.findOne({ _id:purchaseOrder});

//         if (!purchase) {
//             return res.status(404).json({ msg: 'Purchase ID not found' });
//         }

  
//         const remainingAmount = totalPrice - newPayment.amount;

//         console.log('Total Price:', totalPrice);
//         console.log('Payment Amount:', newPayment.amount);
//         console.log('Calculated Remaining Amount:', remainingAmount);

         
//         const outstandingPayment = new OutstandingModel({
//             purchaseId: purchaseOrder,
//             vendorId:vendor,
//             totalPrice: totalPrice,
//             outStanding: remainingAmount
//         });

//         await outstandingPayment.save();

//         res.status(200).json({
//             msg: 'Outstanding payment calculated and saved successfully',
//             paymentData: newPayment,
//             outstandingData: outstandingPayment
//         });

//     } catch (error) {
//         console.error('Error adding payment:', error.message);
//         return res.status(500).json({ msg: 'Internal server error' });
//     }
// };


exports.AddPayment = async (req, res) => {
    try {
      const { vendor, purchaseOrder, paymentDate, paymentType, amount, totalPrice } = req.body;
  
      // Validate required fields
      if (!vendor || !purchaseOrder || !paymentType || amount === undefined || totalPrice === undefined) {
        return res.status(400).json({ msg: 'Missing required fields: vendor, purchaseOrder, paymentType, amount, totalPrice' });
      }
  
      // Parse paymentDate
      const parsedPaymentDate = paymentDate ? new Date(paymentDate) : undefined;
  
      // Create and save the new payment
      const newPayment = new PaymentModel({
        vendor,
        purchaseOrder,
        paymentDate: parsedPaymentDate,
        paymentType,
        amount
      });
  
      await newPayment.save();
  
      // Get the last inserted ID
      const lastInsertedId = newPayment._id;
  
      // Find or create an outstanding record
      let existingOutstanding = await PurchaseModel.findOne({ purchaseOrder });
  
      if (existingOutstanding) {
        // Update existing outstanding record
        existingOutstanding.outStanding = (existingOutstanding.outStanding || totalPrice) - amount;
        await existingOutstanding.save();
      }  
      const Outstanding = new OutstandingPaymentModel({
        purchaseOrder,
        paymentId: lastInsertedId,
        outStanding: totalPrice - amount
      });

       await Outstanding.save();
      return res.status(200).json({
        message: 'Payment added successfully and outstanding amount calculated.',
        data:Outstanding
      });
  
    } catch (error) {
      console.error('Error adding payment:', error.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  
  
  
  


 







exports.GetAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find();

        return res.status(200).json({
            msg: 'Payments retrieved successfully',
            data: payments
        });
    } catch (error) {
        console.error('Error retrieving payments:', error.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};


exports.GetPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await PaymentModel.findById(id);

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        return res.status(200).json({
            msg: 'Payment retrieved successfully',
            data: payment
        });
    } catch (error) {
        console.error('Error retrieving payment:', error.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};


exports.UpdatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { vendor, purchaseOrder, paymentDate, paymentType, amount } = req.body;

        if (!vendor || !purchaseOrder || !paymentType || amount === undefined) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const parsedPaymentDate = paymentDate ? new Date(paymentDate) : undefined;

        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            id,
            {
                vendor,
                purchaseOrder,
                paymentDate: parsedPaymentDate,
                paymentType,
                amount
            },
            { new: true, runValidators: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        return res.status(200).json({
            msg: 'Payment updated successfully',
            data: updatedPayment
        });
    } catch (error) {
        console.error('Error updating payment:', error.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.DeletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPayment = await PaymentModel.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        return res.status(200).json({
            msg: 'Payment deleted successfully',
            data: deletedPayment
        });
    } catch (error) {
        console.error('Error deleting payment:', error.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};


exports.GetOutstanding = async (req, res) => {
    try {
         

        const outstandingRecord = await OutstandingModel.findOne();

        if (!outstandingRecord) {
            return res.status(404).json({ msg: 'Purchase ID not found' });
        }

        res.status(200).json({
            success: true,
            msg: 'Outstanding amount fetched successfully',
            data: outstandingRecord

        });
    } catch (error) {
        console.error('Error fetching outstanding amount:', error.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};





