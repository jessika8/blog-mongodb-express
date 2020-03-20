
const bcrypt = require('bcryptjs')
const User = require('../database/models/User')
const Session = require('../database/models/Session')
 
module.exports = (req, res) => {


    const { password} = req.body;
    
        
        
        if (password == process.env.ADMIN) {
            res.render('create')
            req.session.sessionID = req.sessionID;
                    req.session.save();
                    req.session.admin = true
    }
}
