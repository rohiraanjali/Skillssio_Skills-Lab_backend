const Users = require("../models/users.model");

const checkUser = async(req , res, next, uid) => {
const user = await Users.findById(uid);
if(!user) {
    return res.status(401).json({message: "User nor found."})
}
req.user = user;
next();
}

const createPlayList = async(req, res) => {
    const {user} = req;
    const {name} = req.body;

    user.playLists.push({name, video:[]})
    await user.save((err, user) => {
        if(user) {
            res.status(200).json({success: true, playLists: user.playLists, message: "Playlist created successfully"})
        }
        if(err) {
            res.status(500).json({success: false, message: "Some server error in creating playlist, Try again."})
        }
    })
}

const deletePlayList = async(req, res) => {
    const {user} = req;
    const {playListId} = req.params;

    user.playLists = user.playLists.filter(playList => playList._id != playListId);
    await user.save((err, user) => {
        if(user) {
            res.status(200).json({success: true, playLists: user.playLists, message: "playList deleted successfully"})
        }
        if(err) {
            res.status(500).json({success: false, message: "Unable to delete due to server error :( Try again."})
        }
    })
}

const addToPlayList = async(req, res) => {
    const {user} = req;
    const {playListId, videoId} = req.params;

    user.playLists = user.playLists.map(playList => {
        if(playList._id == playListId) {
            playList.videos.push(videoId);
            return playList;
        }
        return playList;
    })

    await user.save(async(err,user) => {

        if(user) {
            const {playLists} = await user.execPopulate({path: "playLists", populate: {path: "videos", populate: "videos"}})
            res.status(200).json({success: true, playLists, message: "Video added to playlist successfully"})
        }
        if(err) {
            res.status(200).json({success: false, message: "Failed to add Video to playlist. Try again."})
        }
    })
}

const removeFromPlayList = async(req, res) => {
    const {user} = req;
    const {playListId, videoId} = req.params;

    user.playLists = user.playLists.map(playList => {
        if(playList._id == playListId) {
            playList.videos.remove(videoId);
            return playList;
        }
        return playList;
    })
    await user.save(async(err,user) => {

        if(user) {
            const {playLists} = await user.execPopulate({path: "playLists", populate: {path: "videos", populate: "videos"}})
            res.status(200).json({success: true, playLists, message: "Video removed from playlist"})
        }
        if(err) {
            res.status(200).json({success: false, message: "Failed to remove Video from playlist. Try again."})
        }
    })
}

module.exports = {checkUser, createPlayList, deletePlayList, addToPlayList, removeFromPlayList};