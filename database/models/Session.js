const mongoose = require('mongoose');
 
const SessionSchema = new mongoose.Schema({
    id: String,
    expires: Date,
    session: String
});
 
 
 
module.exports = mongoose.model('Session', SessionSchema);