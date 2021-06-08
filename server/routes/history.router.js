const express = require('express');
const router = express.Router();
const {addToHistory , removeFromHistory} = require('../controllers/history.controller');

router.route('/:uid/:videoId').post(addToHistory);
router.route('/:uid/:videoId').delete(removeFromHistory)

module.exports = router;
