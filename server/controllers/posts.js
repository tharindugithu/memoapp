
import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
import axios from 'axios'
export const getPost = async (req,res)=>{
    
    try {    
       
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)
         
    } catch (error) {
        res.status(401).json({message:error.message})
    }
 }

export const createPost = async (req,res)=>{
    
    
    const post = req.body
    if(String(req.userId).length>50){

        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                 "Authorization": `Bearer ${req.userId}`
             }
         }).then(async response=>{
            const newPost = new PostMessage({...post,creator:response.data.sub,createdAt:new Date().toISOString()})
    
            try {
             await newPost.save()
             res.status(201).json(newPost)
           } catch (error) {
              res.status(409).json({message:error.message})
           }
         })
      
    }else{
        const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
    
       try {
        await newPost.save()
        res.status(201).json(newPost)
      } catch (error) {
         res.status(409).json({message:error.message})
      }
    }
      
 }

export const updatePost = async(req,res)=>{
    
    const {id: _id} = req.params//rename id  to _id //get id in path post/124 id =124 like ths
    const post = req.body//upadated post details
    
    if(!mongoose.Types.ObjectId.isValid(_id)) {//check id is valid or not
     return res.status(404).send('No post with that id')
    }
    
    const upadatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})//get upated version of post new : true {You should set the new option to true to return the document after update was applied.}
    
    res.json(upadatedPost)
}

export const deletePost = async(req,res)=>{
    
    
    const {id} = req.params//rename id to _id //get id in path post/124 id =124 like ths
   
    
    if(!mongoose.Types.ObjectId.isValid(id)){ //check id is valid or not   
     return res.status(404).send('No post with that id')
    }
   
    await PostMessage.findByIdAndRemove(id)
    
    res.json({message:'Post deleted successfully'})
}

export const likePost = async (req, res) => {
    
    
    const { id } = req.params;
    
    
    if (!req.userId) {//asign userid in middlware
    
        return res.json({ message: "Unauthenticated" });
    
    }
    if(String(req.userId).length>50){
              axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                     "Authorization": `Bearer ${req.userId}`
                 }
             }).then(async response=>{
                if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
                     const post = await PostMessage.findById(id);
                     const index = post.likes.findIndex((id) => id ===String(response.data.sub));//check this user like the post or not , if he not liked return -
               if (index === -1) {
                     post.likes.push(response.data.sub);//adding to array one like
               } else {
                     post.likes = post.likes.filter((id) => id !== String(response.data.sub));
               }
                     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
                     res.status(200).json(updatedPost);
            }).catch(err=>{
                console.log(err.message)
            })
    }else{
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
         const post = await PostMessage.findById(id);
         const index = post.likes.findIndex((id) => id ===String(req.userId));//check this user like the post or not , if he not liked return -
    if (index === -1) {
          post.likes.push(req.userId);//adding to array one like
    } else {
          post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
          const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
          res.status(200).json(updatedPost);
    }
    

   
}