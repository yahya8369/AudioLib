const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SongSchema = mongoose.Schema({
    name : {type:String,required: true},

    singer : {type:String,required: true},

    categoryId : {type:Schema.Types.ObjectId,
         ref:"category" , 
         required: true},

    albumId : {type:Schema.Types.ObjectId,
         ref:"Album" ,
         required: true},

    createdDate : {type: Date, default: Date.now()},
    

    __v:{type :Number,select:false}
});

module.exports = mongoose.model('Song', SongSchema);