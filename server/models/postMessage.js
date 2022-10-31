import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    given_name:String, 
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date().toString(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;