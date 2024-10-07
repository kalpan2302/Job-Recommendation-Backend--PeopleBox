const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const ConnectDB = require("./connection");
const UserProfileRoutes = require("./routes/Profile.routes")
dotenv.config();
const app = express();


const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Database Connection
ConnectDB();


//load data once

app.use("/user", UserProfileRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`);
});