const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const posts = await Post.find({});
    
    let postObject = []
   

    for (const post of posts) {
        console.log(post.title);

        let objb= {
            title: post.title,
            content: post.content,
            description: post.decription,
            username:post.username,
            createdAt: post.createdAt,
            image: post.image,

        }
        postObject.push(objb);
    }
    
  
    res.render('post', {postObject})

}


 
// module.exports = async (req, res) => {
// //     const post = await Post.findById(req.params.id);
// //     res.render("post", {
// //         post
// //     });
// // }
// // app.get('/post/:id', async (req, res) => {
//     // console.log(req.params.id);
    
//     const post = await Post.findById(req.params.id)

//     console.log(post.description);
    
//     let myFuckingObj = {
//         title: post.title,
//         content: post.content,
//         decription: post.description,
//         image: post.image
//     }


//     res.render('post', {myFuckingObj})
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// }