const express = require('express');
const router = express.Router();
const {removeFromLikedVideos, addToLikedVideos} = require('../controllers/likedVideos.controller');

router.route('/:uid/:videoId').post(addToLikedVideos);
router.route('/:uid/:videoId').delete(removeFromLikedVideos)

module.exports = router;
