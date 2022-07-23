const mongoose = require("mongoose");
 
const postSchema = new mongoose.Schema({
    author: String,
    location: String,
    image: String,
    description:String,
    date: String,
    likes: Number,
});

const postModal = mongoose.model("postdata", postSchema);
module.exports =postModal;