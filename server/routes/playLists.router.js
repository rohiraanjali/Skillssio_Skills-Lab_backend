const express = require('express');
const router = express.Router();
const {checkUser, createPlayList, deletePlayList, addToPlayList, removeFromPlayList} = require('../controllers/playLists.controller');


router.param('uid', checkUser)
router.route('/:uid').post(createPlayList);
router.route('/:uid/:playListId').delete(deletePlayList);
router.route('/:uid/:playListId/:videoId').post(addToPlayList).delete(removeFromPlayList)

module.exports = router;
