const { userSchema } = require('../models');

async function postLogin(req, res) {
    const neededFields = ['username', 'password'];
    const form = req.body;
    const missingFields = neededFields.filter(field => !form[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ error: `Missing fields: ${missingFields.join(', ')}` });
    }
    try {
        // let user = await userSchema.find({ username: form.username, password: form.password });
        // console.log(user)
        // if (user) {
        //     res.send(user);
        // } else {
        //     res.status(401).send({ error: 'Error logging in' });
        // }
        let user = await userSchema.findOne({ username: form.username, password: form.password });
        if (!user) throw new Error('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message || 'Error logging in' });
    }
}

module.exports = {
    postLogin
}