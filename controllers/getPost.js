
const Post = require('../database/models/Post')
 
module.exports = async (req, res) => {
//     const post = await Post.findById(req.params.id);
//     res.render("post", {
//         post
//     });
// }
// app.get('/post/:id', async (req, res) => {
    // console.log(req.params.id);
    
    const post = await Post.findById(req.params.id)

    console.log(post.description);
    
    let myFuckingObj = {
        title: post.title,
        content: post.content,
        decription: post.description,
        image: post.image
    }


    res.render('post', {myFuckingObj})
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
}