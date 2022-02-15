const User = require('../../models/user');

async function getAllUser(req, res) {
    try {
        const user = await User.findAll();

        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
module.exports = getAllUser