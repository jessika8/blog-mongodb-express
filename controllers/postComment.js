const Comment = require('../database/models/Comment');


module.exports = (req, res) => {
   console.log(req.params);
   
    let comment = new Comment ({
        username: req.session.username,
        // email:req.body.email,
        comment: req.body.comment,
        postID: req.params.postID,
        createdAt: new Date()

    })
    comment.save();
    // console.log(comment);
    

    req.session.sessionID = req.sessionID;
    req.session.save();
    
    res.redirect(`/post/${req.params.postID}`)

};