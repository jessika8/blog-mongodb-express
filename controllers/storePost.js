
const path = require('path')
const Post = require('../database/models/Post')
 
module.exports = (req, res) => {
    const {image} = req.files;
    // image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: image.data.toString('base64'),
        }, (error, post) => {
            res.redirect("/");
        });
    // })
}