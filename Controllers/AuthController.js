
const AuthModel = require("../Models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await AuthModel.findOne({ username });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
       
        const newUser = new AuthModel({
            username,
            password: hashPassword
        });

        await newUser.save();
    
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        console.error("Error in createUser:", error.message);  
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

 exports.userLogin = async (req,res) => {
    try {
        const {username, password } = req.body;

        if (!username || !password) {
            throw new Error("All fields are required");
        }
        const user = await AuthModel.findOne({username});
        if (!user) {
            throw new Error("User not found");
        };
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw new Error("Invalid credentials");
            
        };
        const token = jwt.sign({_id:user._id}, process.env.SECRETE_KEY, {expiresIn:process.env.EXPIRE_IN});
        res.status(200).json({
            message:"succefully",
            data:user ,token
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
 };

