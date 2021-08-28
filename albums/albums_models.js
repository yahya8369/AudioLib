const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nbTrack: Number,
    __v:{type:Number,select:false}
  },
  
);

module.exports = mongoose.model("Album", AlbumSchema);