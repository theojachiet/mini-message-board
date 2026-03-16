const db = require('../db/queries');

async function createUser(req, res) {
    try {
        await db.addUser(req.body.username, req.body.password)
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createUser,
}