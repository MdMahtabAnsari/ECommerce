const mongoose = require('mongoose');
const {Schema} = mongoose;

const catagorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    product:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }]
},{timestamps:true,versionKey:false})

module.exports = mongoose.model('Catagory',catagorySchema);

