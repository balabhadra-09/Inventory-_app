
const UsersModel = require("../Models/UsersModel")
const bcrypt = require('bcrypt');
const path = require('path');


exports.CreateUser = async (req, res) => {
  try {
    const folderPath = 'uploads/';
    let profilePicture = '';

    if (req.file) {
      profilePicture = path.join(folderPath, req.file.filename);
    }

    const { username, email, password, mobile, role, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All required fields (username, email, password) must be provided' });
    }

    
    const hashedPassword = await bcrypt.hash( password, 10);

    const trimQuotes = (value) => typeof value === 'string' ? value.replace(/^"|"$/g, '') : value;

    const newUser = new UsersModel({
      username: trimQuotes(username),
      email: trimQuotes(email),
      password: trimQuotes(hashedPassword),
      mobile,
      role: trimQuotes(role),
      address: trimQuotes(address),
      profilePicture,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Error in creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message,
    });
  }
};


exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token or session here if needed

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    console.error('Error in logging in user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to log in user',
      error: error.message,
    });
  }
};

 exports.GettAll = async (req, res) => {
   try {
     const users = await UsersModel.find(); 
     if (!users.length) {  
       return res.status(404).json({
         success: false,
         message: 'No users found',
       });
     }
 
     return res.status(200).json({
       success: true,
       data: users,
     });
   } catch (error) {
     console.error('Error fetching users:', error); 
     return res.status(500).json({
       success: false,
       message: 'Failed to fetch users',
       error: error.message,
     });
   }
 };
 
 
 exports.UsersGetById = async (req, res) => {
   try {
     const { id } = req.params;
     const user = await UsersModel.findById(id);
 
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }
 
     return res.status(200).json({
       success: true,
       data: user,
     });
   } catch (error) {
     console.error('Error fetching user by ID:', error);
     return res.status(500).json({
       success: false,
       message: "Internal server error",
       error: error.message,
     });
   }
 };
 

 exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const folderPath = 'uploads/';
    
    let profilePicturePath = '';
    if (req.file) {
      profilePicturePath = path.join(folderPath, req.file.filename);
    }
    
    const trimQuotes = (value) => typeof value === 'string' ? value.replace(/^"|"$/g, '') : value;
 
    Object.keys(req.body).forEach(key => {
      req.body[key] = trimQuotes(req.body[key]);
    });

    const user = await UsersModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
   

    if (req.body.password) {
      req.body.password = await bcrypt.hash( req.body.password, 10);
    }
  
    const updatedUser = await UsersModel.findByIdAndUpdate( 
      id, 
      { ...req.body, profilePicturePath }, 
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


 exports.deleteUsrs = async (req, res) => {
   try {
     const { id } = req.params; 
     const user = await UsersModel.findByIdAndDelete(id);  
 
     if (!user) {  
     }
 
     return res.status(200).json({
       success: true,
       message: "User deleted successfully",
       data: user,  
     });
   } catch (error) { 
     console.error('Error deleting user:', error);  
     return res.status(500).json({ 
       success: false,
       message: "Internal server error",
       error: error.message,
     });
   }
 };
 