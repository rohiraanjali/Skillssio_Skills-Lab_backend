const express = require('express');
const router = express.Router();
const {addToWatchLater , removeFromWatchLater} = require('../controllers/watchLater.controller');

router.route('/:uid/:videoId').post(addToWatchLater);
router.route('/:uid/:videoId').delete(removeFromWatchLater)

module.exports = router;
