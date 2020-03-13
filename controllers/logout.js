module.exports = (req, res) => {
    req.session.destroy((err) => {
        
    });
    res.render('logout')
}