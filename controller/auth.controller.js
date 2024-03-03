const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const { salt } = require('../config/hashSalt.config');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/secretKey.config');


const singnUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const result = await User.create(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const signIn = async(req,res)=>{
    try {
        const data = await User.findOne({userId:req.body.userId});
        if(bcrypt.compareSync(req.body.password,data.password)){
            const token = jwt.sign({userId:req.body.userId},secret,{expiresIn:'7d'})
            res.status(200).send({userId:req.body.userId,token:token});
            return;
        }
        else{
            res.status(401).send({message:"Wrong Password"})
            return;
        }
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}




module.exports = {
    signUp: singnUp,
    signIn:signIn
}