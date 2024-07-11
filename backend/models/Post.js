const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
   imageUrls: { 
        type: [String],
        required: false,
    },
    videoUrls: {
        type: [String],
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    label: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Post', postSchema);
