const Session = require('../database/models/Session')

const getSessions = () => {
    return new Promise((resolve, reject) => {
        Session.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        })
    })
}

const checkSession = async(req)=> {
    let sessions = await getSessions();

    if(sessions.length == 0) {
       return false
    }

    for (const doc of sessions) {
        if(req.session.sessionID == JSON.parse(doc.session).sessionID) {
            return true
        }
    }

    return false;
}

module.exports = checkSession
