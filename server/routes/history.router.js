const express = require('express');
const router = express.Router();
const {addToHistory , removeFromHistory, getHistory} = require('../controllers/history.controller');

router.route('/:uid').get(getHistory)
router.route('/:uid/:videoId').post(addToHistory);
router.route('/:uid/:videoId').delete(removeFromHistory)

module.exports = router;
