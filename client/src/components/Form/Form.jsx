import React from "react";
import useStyle from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState } from "react";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//get the current id of post

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const classes = useStyle()
    const dispatch = useDispatch()
    const location = useLocation()
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)//check 
    //when we create the post id is auto genarated but we update post id is not in there (inside const post)s
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) {
            setPostData(post)
        }

    }, [post])//call only post value changing time
    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, given_name: user?.result?.given_name }))//if current id is not nul that mean create post then dispatch action
        } else {
            dispatch(createPost({ ...postData, given_name: user?.result?.given_name }))//if current id = 0 then create post
        }
        clear()
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: null });
    };

    if (!user?.result?.given_name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >
                    {currentId ? 'Editing' : 'Creating'} a memory
                </Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />


                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />


                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>

        </Paper>
    )
}

export default Form