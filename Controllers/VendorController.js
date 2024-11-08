
 const VendorModel = require("../Models/VendorModel")



exports.Addvendors = async (req, res) => {
    try {
        const { vendorsname, email, contactperson, mobile, address, description } = req.body;
        if (!vendorsname || !email || !contactperson || !mobile || !address || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const vendor = await VendorModel.findOne({ email });
        if (vendor) {
            return res.status(401).json({
                success: false,
                message: "Vendor already exits"
            })
        }
        const newvendor = new VendorModel({
            vendorsname,
            email,
            contactperson,
            mobile,
            address,
            description
        });
        await newvendor.save();

        return res.status(200).json({
            success: true,
            message: "Add stock succefully by vendor",
            data: newvendor
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully add stock by vendor"
        })
    }
}


// get all stocks
exports.GetAllvendors = async (req, res) => {
    try {
        const vendor = await VendorModel.find();
        if (!vendor) {
            return res.status(400).json({
                success: false,
                message: "Vendors are not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully get stock",
            data: vendor
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully find stocks"
        })
    }
}

//get stock by id
exports.GetvendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendors = await VendorModel.findById(id)
        if (!vendors) {
            return res.status(404).json({
                success: false,
                message: "unable to fetch data"
            })
        };
        return res.status(200).json({
            success: false,
            message: "suuccefully fetch data",
            data: vendors
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully find by id stocks"
        })
    }
}

//update stock by id

exports.UpdatevendorsById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await VendorModel.findByIdAndUpdate(id, req.body,  { new: true, runValidators: true });
        if (!vendor) {
            return res.status(401).json({
                success: false,
                message: "vendor is not found to update"
            })
        };
        return res.status(200).json({
            success: true,
            message: " update succssfully",
            data: vendor
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully update"
        })
    }
}

// delete stock by id
exports.DeletevendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendordata = await VendorModel.findByIdAndDelete(id);
        if (!vendordata) {
            return res.status(401).json({
                success: false,
                message: "vendor is not found to delete"
            })
        };
        return res.status(200).json({
            success: true,
            message: "delete succssfully",
            data: vendordata
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully delete"
        })
    }
}

 