const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
})

const Videos = new mongoose.model("Video",VideoSchema)
module.exports = Videos;
// phle insert wala function use krke tumko ise data dalna pdega backend me
// phir api bnaao get wali
// or frotend me call kro simple
// ok toh jo yeh apna index.js me dummy data le rhe wo mai videos ka poora data phle ek alag file me daaldu yha??
//  data kaha hai?