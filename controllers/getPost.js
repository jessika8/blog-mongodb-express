
const Post = require('../database/models/Post')
 
module.exports = async (req, res) => {

    
    const post = await Post.findById(req.params.id)

    // console.log(post);
    
    // console.log(post.description);
    
    let getHalfPostObj = {
        title: post.title,
        content: post.content,
        decription: post.description,
        image: post.image
    }


    res.render('post', {getHalfPostObj, postID: post._id})
  
}