const mongoose = require('mongoose');
 
const SessionSchema = new mongoose.Schema({
    expires: Date,
    session: String
});
 
 
 
module.exports = mongoose.model('sessions', SessionSchema);