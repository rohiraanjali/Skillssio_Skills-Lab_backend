const express = require('express');
const router = express.Router();
const {checkUser, deletePlaylist, addToPlaylist, removeFroPlaylist, createPlaylist} = require('../controllers/playlists.controller');


router.param('uid', checkUser)
router.route('/:uid').post(createPlaylist);
router.route('/:uid/:playlistId').delete(deletePlaylist);
router.route('/:uid/:playlistId/:videoId').post(addToPlaylist).delete(removeFroPlaylist)

module.exports = router;
