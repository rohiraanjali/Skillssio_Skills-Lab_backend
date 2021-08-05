const express = require('express');
const router = express.Router();
const {checkUser, createPlayList, deletePlayList, addToPlayList, removeFromPlayList} = require('../controllers/playlists.controller');


router.param('uid', checkUser)
router.route('/:uid').post(createPlayList);
router.route('/:uid/:playlistId').delete(deletePlayList);
router.route('/:uid/:playlistId/:videoId').post(addToPlayList).delete(removeFromPlayList)

module.exports = router;
