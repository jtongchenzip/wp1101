import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async function (req, res) {
    // console.log("here")
    const contents = await Post.find().sort({ 'timestamp': -1 })
    // console.log(contents)
  
    if (contents.length) {
      res.status(200).send({
        message: 'success',
        data: contents
      })
    }
    else {
      res.status(403).send({
        message: 'error',
        data: null
      })
    }
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async function (req, res) {
    // console.log("here")
    // var postId = ;
    console.log(req.query.postId)
    const targetPost = await Post.findOne( {'postId' : req.query.postId } )
    console.log(targetPost)
  
    if (targetPost) {
      res.status(200).send({
        message: 'success',
        post: targetPost
      })
    }
    else {
      res.status(403).send({
        message: 'error',
        post: null
      })
    }
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async function (req, res) {
    // console.log("here")
    // console.log(req)
    // const contents = await Post.find().sort({ 'timestamp': 'desc' })
    var postId = req.body.postId
    var title = req.body.title
    var content = req.body.content
    var timestamp = req.body.timestamp
    const newPost = new Post( { postId, title, content, timestamp });

    newPost.save();
    if (newPost) {
        res.status(200).send({ message: 'success' })
    }
    else {
        res.status(403).send({ message: 'error' })
    }
})

// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async function (req, res) {
    // console.log("here")
    // var postId = ;
    // console.log(req.query.postId)
    // const targetPost = await Post.findOne( {'postId' : req.query.postId } )

    try {
        const response = await Post.deleteOne( {'postId' : req.query.postId } );
        var deletedCount = response.deletedCount
    } 
    catch (e) {
        print(e);
    }
    // console.log(targetPost)
  
    if (deletedCount) {
      res.status(200).send({
        message: 'success',
      })
    }
    else {
      res.status(403).send({
        message: 'error',
      })
    }
})

export default router