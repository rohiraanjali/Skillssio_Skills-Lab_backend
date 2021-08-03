const express = require('express');
const router = express.Router();
const { getVideos, getVideosById , getUpdatedVideos} = require('../controllers/video.controller');

router.route('/').get(getVideos).post(getUpdatedVideos)
router.route('/:videoId').get(getVideosById);



module.exports = router;
