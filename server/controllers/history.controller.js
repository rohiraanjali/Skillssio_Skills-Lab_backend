const Users = require("../models/users.model");

const addToHistory = async(req, res) => {
const {uid, videoId} = req.params;
const user = await Users.findOne({_id: uid})

if(user.history.find(vid => vid == videoId)) {
user.history.remove(videoId);
user.history.push(videoId);

console.log(user.history)

await user.save (async(err, user) => {
    if(user) {
        const {history} = await user.execPopulate({path: "history", populate: "video"});
        // console.log("video added successfully")
        return res.status(200).json({success: true, history, message: "Video added successfully"})
    }
    if(err) {
        // console.log("video not added successfully")
        return res.status(500).json({success: false, message: "Internal server error. Try adding again"})
    }
});
return;
}
user.history.push(videoId);
await user.save(async(err,user) => {
if(err){
    return res.status(500).json({success:false,message:"Internal server error"})
}
if(user){
    const {history} = await user.execPopulate({path:"history",populate:"video"});
    return res.status(200).json({success: true,history,message:"video added successfully"});
}
});
}


const removeFromHistory = async(req, res) => {
    const {uid,videoId} = req.params;
    const user = await Users.findOne({_id:uid});
    await user.history.remove(videoId);
    await user.save(async(err,user) => {
    if(user){
    const {history} = await user.execPopulate({path:"history",populate:"video"});
         res.status(200).json({success:true,history,message:"video removed successfully"})
       }
       if(err){
         return res.status(505).json({success:false,message:"Internal server error"})
       }
    });
 }


module.exports = {addToHistory , removeFromHistory};