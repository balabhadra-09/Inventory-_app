 
 const mongoose = require("mongoose")

const connectDB = async() => {
     try {
        const client = await mongoose.connect(process.env.MONGO_URI)
        if(!client){
            throw new error("Invalid DB url")
        }
        console.log(`DB connection succesfully:${mongoose.connection.host}`)
     } catch (error) {
      console.log("DB connection failed");
     }
}
module.exports = connectDB



//:${mongoose.connection.host}