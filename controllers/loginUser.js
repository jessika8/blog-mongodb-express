
const bcrypt = require('bcryptjs')
const User = require('../database/models/User')
 
module.exports = (req, res) => {
    const {email, password} = req.body;

    console.log('!!11!!11!11!1!11!!1!1');
    
    console.log(req.session);
    
    // try to find the user

    User.findOne({email}, (error, user) => {
        console.log(user);
        
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    // store user session.
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
}
