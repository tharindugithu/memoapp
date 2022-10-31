import React from "react";
import Post from "./Post/Post";
import { Grid } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core'
import useStyle from './styles'
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyle()

  return (
    !posts.length ? <CircularProgress /> : (//if there no post lenth runnig spinner ,if have lenth loading grid{post./length = 0 it mean false then !false mean true }
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts