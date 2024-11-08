const SalesModel = require("../Models/SalesModel");

exports.AddSales = async (req,res) => {
     try {
        const {party,salesDate,items} = req.body;
        if (!party ||!salesDate ) {
            throw new Error("all field are require");
        };
        const Addsales = new SalesModel(req.body);
        await Addsales.save();
        return res.status(200).json({
            message:"Add sales succesfully",
            data:Addsales
        })
     } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
     }
};

exports.getSales = async (req,res) => {
    try {
        const sales = await SalesModel.find();
        if (!sales) {
            throw new Error(" sales are not found");
        };
        return res.status(200).json({
            success:true,
            data:sales
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}