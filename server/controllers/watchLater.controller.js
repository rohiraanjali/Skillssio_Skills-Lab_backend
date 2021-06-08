const Users = require("../models/users.model");

const addToWatchLater = async(req, res) => {
const {uid, videoId} = req.params;
const user = await Users.findOne({_id: uid})

if(user.watchLater.find(vid => vid == videoId)) {
user.watchLater.remove(videoId);
user.watchLater.push(videoId);

await user.save (async(err, user) => {
    if(user) {
        const {watchLater} = await user.execPopulate({path: "watchLater", populate: "video"});
        return res.status(200).json({success: true, watchLater, message: "Video added successfully to watchLater"})
    }
    if(err) {
        return res.status(500).json({success: false, message: "Internal server error. Try adding again"})
    }
});
return;
}
user.watchLater.push(videoId);
await user.save (async(err,user) => {
    if(err){
    return res.status(500).json({success:false,message:"Internal server error"})
}
    if(user){
    const {watchLater} = await user.execPopulate({path:"watchLater",populate:"video"});
    return res.status(200).json({success: true, watchLater ,message:"video added successfully to watchLater"});
}
});
}
const removeFromWatchLater = async(req, res) => {
    const {uid,videoId} = req.params;
    const user = await Users.findOne({_id:uid});
    await user.watchLater.remove(videoId);
    await user.save(async(err,user) => {
    if(user){
    const {watchLater} = await user.execPopulate({path:"watchLater",populate:"video"});
        res.status(200).json({success:true,watchLater,message:"video removed successfully to watchLater"})
        }
        if(err){
        return res.status(505).json({success:false,message:"Internal server error"})
        }
    });
    }

module.exports = {addToWatchLater , removeFromWatchLater};