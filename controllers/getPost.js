
const Post = require('../database/models/Post')
const Comment = require('../database/models/Comment')


 
module.exports = async (req, res) => {


    const comments = await Comment.find({postID: req.params.postID});
    
    let commentObject = []
   

    for (const comment of comments) {
        console.log(comment.comment);

        let objb= {
            comment: comment.comment,
            username: comment.username,
            createdAt: comment.createdAt,

        }
        commentObject.push(objb);
    }

    
    const post = await Post.findById(req.params.postID)

    // console.log(post);
    
    // console.log(post.description);
    
    let getHalfPostObj = {
        title: post.title,
        content: post.content,
        decription: post.description,
        username: post.username,
        image: post.image
    }


    res.render('post', {getHalfPostObj, postID: post._id, commentObject})
  
}