const Videos = require("../models/video.model") 
const getVideos = async (req, res) => {
	try {
		const videoresults = await Videos.find({});
		res.status(200).json({ videos: videoresults, success: true });
	} catch (error) 
	{
		res.status(500).json({
			success: false,
			message: 'Request failed please check errorMessage for more details',
			errorMessage: error.message,
		});
	}
}
	
	const getVideosById = async(req, res) => {
		try {
			const {videoId} = req.params;
			const video = await Videos.findById(videoId);
	
			console.log(video); 
			if(video) {
				res.status(200).json({videos: video , success: true})
			} else {
				res.status(404).json({success: false , message: "Video Not Found"})
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Request failed please check errorMessage for more details',
				errorMessage: error.message,
			});
		}
	} 

	const getUpdatedVideos = async(req, res) => {
		try {
			const VideoData = req.body;
			const videoUpdate = new Videos(VideoData);
			const updatedVideo = await videoUpdate.save();
			res.status(201).json({videos: updatedVideo , success: true})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Request failed please check errorMessage for more details',
				errorMessage: error.message,
			});
		}
	}


module.exports = {
	getVideos,
	getVideosById,
	getUpdatedVideos
}
