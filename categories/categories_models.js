const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name : {type:String,required: true},
    description : String,
    createdDate : {type: Date, default: Date.now()},
    updatedDate : Date,
    __v:{type :Number,select:false}
})

module.exports = mongoose.model('Category', CategorySchema);