const User = require('../database/models/User')
 
module.exports = (req, res) => {
    // User.create(req.body, (error, user) => {
    //     if (error) {
    //         return res.redirect('/auth/register')
    //     }
    //     res.redirect('/')
    // })

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    res.redirect('/')
}