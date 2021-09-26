const Users = require("../models/users.model");

const checkUser = async(req, res, next, uid) => {
    const user = await Users.findById(uid);

    if(!user) {
        return res.status(404).json("user not found")
    }
    req.user = user;
    next();
}

const createPlaylist = async(req, res) => {
    const {user} = req;
    const {name} = req.body;

    user.playlists.push({name, videos:[]})
    await user.save((err, user) => {
        if(user) {
            res.status(200).json({success: true,playlists: user.playlists, message: "playlist created sucessfully"})
        }
        if(err) {
            res.status(500).json({success: false,message: "Something went wrong!"})
        }
    })
}

const deletePlaylist = async(req, res) => {
    const {user} = req;
    const {playlistId} = req.params;

    user.playlists = user.playlists.filter(playlist => playlist._id !== playlistId)
    await user.save((err, user) => {
        if(user) {
            res.status(200).json({success: true, playlists: user.playlists, message: "playlist delted sucessfully"})
        }
        if(err) {
            res.status(500).json({success: false, message: "something went wrong, couldn;t delete the playlist."})
        }
    })
}

const addToPlaylist = async(req, res) => {
    const {user} = req;
    const {playlistId, videoId} = req.params;

    user.playlists = user.playlists.map(playlist => {
        if(playlist._id == playlistId) {
            playlist.videos.push(videoId);
            return playlist;
        }
        return playlist;
    })


    await user.save(async(err, user) => {
        if(user) {
            const {playlists} = await user.execPopulate({path: "playlists", populate:{path:"videos",populate:"Videos"}})
            res.status(200).json({success: true, playlists, message: "video added sucessfully"});
        }
        if(err) {
            return res.status(500).json({success: false, message: "something went wrong with server."})
        }
    })
}

const removeFroPlaylist = async(req, res) => {
    const {user} = req;
    const {playlistId, videoId} = req.params;

    user.playlists = user.playlists.map(playlist => {
        if(playlist._id == playlistId) {
            playlist.videos.remove(videoId)
            return playlist;
        }
        return playlist;
    })

    await user.save(async(err, user) => {
        if(user) {
            const {playlists} = await user.execPopulate({path: "playlists", populate:{path: "videos", populate: "videos"}})
            return res.status(200).json({success: true, playlists, message: "video removed from playlist"})

        }
        if(err) {
            return res.status(500).json({success: false, message: "something went wrong with server "})
        }
    })
}

module.exports= {checkUser, createPlaylist, deletePlaylist, addToPlaylist, removeFroPlaylist}