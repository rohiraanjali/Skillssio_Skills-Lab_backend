const Users = require("../models/users.model");

console.log(addToLikedVideos)

const addToLikedVideos = async(req, res) => {
const {uid, videoId} = req.params;
const user = await Users.findOne({_id: uid})

if(user.likedVideos.find(vid => vid == videoId)) {
user.likedVideos.remove(videoId);
user.likedVideos.push(videoId);

await user.save (async(err, user) => {
    console.log(likedVideos)
    if(user) {
        const {likedVideos} = await user.execPopulate({path: "likedVideos", populate: "video"});
        return res.status(200).json({success: true, likedVideos, message: "Video added successfully to likedVideos"})
    }
    if(err) {
        return res.status(500).json({success: false, message: "Internal server error. Try adding again"})
    }
});
return;
}
user.likedVideos.push(videoId);
await user.save (async(err,user) => {
    if(err){
    return res.status(500).json({success:false,message:"Internal server error"})
}
    if(user){
    const {likedVideos} = await user.execPopulate({path:"likedVideos",populate:"video"});
    return res.status(200).json({success: true, likedVideos ,message:"video added successfully to likedVideos"});
}
});
}
const removeFromLikedVideos = async(req, res) => {
    const {uid,videoId} = req.params;
    const user = await Users.findOne({_id:uid});
    await user.likedVideos.remove(videoId);
    await user.save(async(err,user) => {
    if(user){
    const {likedVideos} = await user.execPopulate({path:"likedVideos",populate:"video"});
        res.status(200).json({success:true,likedVideos,message:"video removed successfully to likedVideos"})
        }
        if(err){
        return res.status(505).json({success:false,message:"Internal server error"})
        }
    });
    }

module.exports = {addToLikedVideos , removeFromLikedVideos};