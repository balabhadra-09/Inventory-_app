const path = require("path");
const SettingsModel = require("../Models/SettingsModel")

exports.Settings = async (req, res) => {
    try {
      const folderPath = 'uploads/';
      let logo = '';
      let favIcon = '';
  
      if (req.files) {
        if (req.files.logo) {
          logo = path.join(folderPath, req.files.logo[0].filename).replace(/\\/g, '/');
        }
        if (req.files.favIcon) {
          favIcon = path.join(folderPath, req.files.favIcon[0].filename).replace(/\\/g,'/');
        }
      }
  
      const { applicationName, description, copyrightDetails } = req.body;
  
      if (!applicationName || !description || !copyrightDetails) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const trimQuotes = (value) => typeof value === 'string' ? value.replace(/^"|"$/g, '') : value;
  
      let settings = await SettingsModel.findOne();
  
      if (settings) {
        settings.applicationName = trimQuotes(applicationName)  || settings.applicationName;
        settings.description = trimQuotes(description) || settings.description;
        settings.copyrightDetails = trimQuotes(copyrightDetails) || settings.copyrightDetails;
        settings.logo = logo || settings.logo;
        settings.favIcon = favIcon || settings.favIcon;
  
        await settings.save();
  
        return res.status(200).json({
          message: "Settings updated successfully",
          data: settings
        });
      } else {
        const newSettings = new SettingsModel({
          applicationName:trimQuotes(applicationName),
          description:trimQuotes(description),
          copyrightDetails:trimQuotes(copyrightDetails),
          logo,
          favIcon
        });
  
        await newSettings.save();
  
        return res.status(200).json({
          message: "Settings created successfully",
          data: newSettings
        });
      }
    } catch (error) {
      console.error('Error handling settings:', error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  exports.setting = async (req, res) => {
    try {
       
      const settings = await SettingsModel.findOne();
      if (!settings || settings.length === 0) {
       throw new Error("Settings not found");
      }
      return res.status(200).json({
        success: true,
        data: settings,
      });
  
    } catch (error) {
      console.error("Error in getting settings:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  exports.deleteSetting = async (req, res) => {
    try {
        const { id } = req.params;  
        const setting = await SettingsModel.findByIdAndDelete(id); 
        if (!setting) {
           throw new Error("Settings not found");
        }
        return res.status(200).json({
            success: true,
            message: "Setting deleted successfully",
            data:setting
        });
    } catch (error) {
        console.error("Error in deleteSetting:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

  