const mongoose = require('mongoose');
const {init} = require('./initAdmin');
const {uri} = require('./config/dbURL.config');

const connect = async ()=>{
    try{
        console.log(uri);
        await mongoose.connect(uri);
        console.log("DB is connected");
        init();

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    connect:connect
}