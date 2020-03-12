
const bcrypt = require('bcryptjs')
const User = require('../database/models/User')
const Session = require('../database/models/Session')
 
module.exports = (req, res) => {


    const {email, password} = req.body;
    Session.findOne({email}, (error, user) => {
        console.log(user);
        
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.sessionID = req.sessionID;
                    req.session.save();

                    // req.session.userId = user._id
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


 // const getSessions = () => {
    //     return new Promise((resolve, reject) => {
    //         Session.find({}, (err, sessions) => {
    //             if (err) reject(err);
    
    //             resolve(sessions);
    //         });
    //     });
    // }
    // const checkSession = async(req, res, next) => {
    //     let sessions = await getSessions();
    
    //     for (const session of sessions) {
    //         if(JSON.parse(session.session).sessionID == req.sessionID) {
    //             next();
    //             return;
    //         }
    //     }
    //     res.send('You are not authorised to perform this action');
    // }

    // module.exports = checkSession;