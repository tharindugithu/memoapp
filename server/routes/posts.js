import express from 'express'
import {getPost,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/',getPost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)//update document with id
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)//for 1 like we checking


export default router;