const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require('http');
const cors = require("cors");
const bodyparser = require("body-parser")
const connectDB = require("./dbconnection");
require("dotenv").config();

const PORT = process.env.PORT || 6000
connectDB();

const app = express();

 
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.urlencoded({ extended: true }))


const AuthRoute = require("./Routes/AuthRoute");
const VendorRoute = require("./Routes/vendorRouts");
const ItemCategoryRoute = require("./Routes/ItemCategoryRoute");
const PurchaseRoute = require("./Routes/PurchaseRoute");
const OlddataRoute = require("./Routes/OlddataRoute");
const PaymentRoute = require("./Routes/PaymentRoute");
const UsersRoute = require("./Routes/UsersRoute")
const ItemCreationRoute = require("./Routes/ItemCreationRoute");
const BillUploadRoute = require("./Routes/BillUploadRoute");
const SettingsRoute = require("./Routes/SettingsRoute");
const AddroleRoute = require("./Routes/AddroleRoute");
const SalesRoute = require("./Routes/SalesRoute");

app.use("/v1/api", SalesRoute)
app.use("/v1/api", AddroleRoute);
app.use("/v1/api", SettingsRoute);
app.use("/v1/api", BillUploadRoute);
app.use("/v1/api", ItemCreationRoute);
app.use("/v1/api", UsersRoute);
app.use("/v1/api", PaymentRoute);
app.use("/v1/api", OlddataRoute);
app.use("/v1/api", PurchaseRoute);
app.use("/v1/api", ItemCategoryRoute);
app.use("/v1/api", VendorRoute);
app.use("/v1/api", AuthRoute);


app.get("/", (req, res) => {
    res.send(`server is running....  ନମସ୍କାର !!`);
    
});
app.get("/img", (req, res) => {
    res.redirect("https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630");
});



http.createServer(app).listen(PORT, () => {
    console.log(`server is started on port http://localhost:${PORT}`)
});