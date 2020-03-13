
module.exports = (req, res) => {
    if (req.session.sessionID) {
        return res.render("create");
    }
 
    res.redirect('/auth/login')
};

// module.exports = (req, res) => {
//     res.render("create");
// };