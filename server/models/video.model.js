const mongoose = require("mongoose");
require("mongoose-type-url");

const videoSchema = new mongoose.Schema({

    avatar: {
        type: String,
    },
    channelName: {
        type: String,
        required: 'channel information is required',
        default: true,
    },
    level: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    videoID: {
        type: String,
        required: true,
        unique: true
    },
    videoTitle: {
        type: String,
        required: ' video information is required',
        default: true
    }
});
const Videos = mongoose.model("Video", videoSchema);
module.exports = Videos;