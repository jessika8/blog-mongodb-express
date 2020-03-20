const Post = require('../database/models/Post')

module.exports = async (req, res) => {

    if (req.session.admin == true) {
   Post.findByIdAndDelete({'_id': req.params.postID}, (err)=>{
// console.log(err);
// console.log(req.params.id);
   } )
}

  res.render('delete')
}