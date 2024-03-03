const admin = require('./config/admin.config');
const User = require("./model/user.model");
const bcrypt = require("bcrypt");
const {salt} = require('./config/hashSalt.config')

const init = async()=>{
    try{
        if(!await User.findOne({userType:admin.userType})){
            admin.password = bcrypt.hashSync(admin.password,salt)
            const result = await User.create(admin);
            console.log(result);
        }
        else{
            console.log("Admin already exist");
        }
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    init:init
}