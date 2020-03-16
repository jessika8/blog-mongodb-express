const Post = require('../database/models/Post')

module.exports = async (req, res) => {


    // const result = await Post.findByIdAndDelete(req.params.id)
    // console.log(result.id);
    // console.log(req.params.postID);
    
   Post.findByIdAndDelete({'_id': req.params.postID}, (err)=>{
// console.log(err);
// console.log(req.params.id);
   } )

  res.render('delete')
}