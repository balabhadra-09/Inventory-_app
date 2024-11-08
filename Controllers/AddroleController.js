const AddroleModel = require("../Models/AddroleModel");

exports.AddNewrole = async (req,res) => {
    try {
        const {role,description,permissions} = req.body;
        if(!role ||!description){
            throw new Error("All field are required");
            
        }
        const newAddrole = new AddroleModel(req.body);
        await newAddrole.save();
        return res.status(200).json({
            message:"Addrole creating successfully",
            data:newAddrole
        })
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
};

exports.GetAllsRole = async (req,res) => {
     try {
        const Addrole = await AddroleModel.find();
        if (!Addrole) {
            throw new Error("data not found");
            
        }
        return res.status(200).json({
            success:true,
            data:Addrole
        })
     } catch (error) {
        return res.status(500).json({
            message:"intenl server error"
        })
     }
}

exports.GetRoleById = async (req,res) => {
     try {
        const { id } = req.params;
        const Addrole = await AddroleModel.findById(id);
        if(!Addrole){
            throw new Error("no data found");
        }
        return res.status(200).json({
            success:true,
            data:Addrole
        });
     } catch (error) {
        return res.status(400).json({
            message:"No data Fetch or internal server error"
        })
     }
};

exports.UpdateRole = async (req,res) => {
    try {
        const { id } = req.params;
        const existingRole = await AddroleModel.findByIdAndUpdate(id, req.body, {new:true , runValidators:true});
        if (!existingRole) {
            throw new Error("role not found")
        };
        return res.status(200).json({
            mesage:"Role updated successfully",
            data:existingRole
        })
    } catch (error) {
        return res.status(500).json({
            message:"  internal server error"
        })
    }
};

exports.deleteRole = async (req,res) => {
    try {
        const { id } = req.params;
        const role = await AddroleModel.findByIdAndDelete(id);
        if (!role) {
            throw new Error("Role nor found")
        };
        return res.status(200).json({
            message:"role delete successfully",
            data:role
        })
    } catch (error) {
        return res.status(500).json({
            message:"  internal server error"
        })
    }

}