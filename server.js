const express = require('express');
const {connect} = require('./dbConnection');
const {port} = require('./config/port.config');

connect();

const app = express();

app.use(express.json());
require('./router/auth.router')(app);
require('./router/catagory.route')(app);
require('./router/product.router')(app);

app.listen(port,()=>{
    console.log("server started at",port);
})