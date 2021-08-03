const Users = require("../models/users.model");

const addToHistory = async(req, res) => {
   const {uid,videoId} = req.params;
   const user = await Users.findOne({_id:uid});
   console.log(user.history)
   console.log(user.history.find(vid => vid == videoId))
   if(user.history.find(vid => vid == videoId)){
      await user.history.remove(videoId);
      user.history.push(videoId);
      await user.save(async(err,user) => {
            if(user){
               const {history} = await user.execPopulate({path:"history",populate:"videos"});
               return res.status(200).json({success: true,history,message:"video added successfully"});
            }
            if(err){
               return res.status(500).json({success:false,message:"Internal server error"});
            }
      });
      return;
   }
   user.history.push(videoId);
   await user.save(async(err,user) => {
      if(err){
         return res.status(505).json({success:false,message:"Internal server error"})
      }
      if(user){
         const {history} = await user.execPopulate({path:"history",populate:"videos"});
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

const getHistory = async (req, res) => {
   const {uid} = req.params;
   const user = await Users.findById(uid);
   res.json({history: user.history});
}

module.exports = {addToHistory , removeFromHistory, getHistory}; 