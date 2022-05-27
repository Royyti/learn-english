const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post(`/login`, function (req, res) {
    const { username, password } = req.body;
    const user = require('../data/users.json')
        .find(u => u.password === password && u.username === username);

    if (user) {
        const token = jwt.sign({
            user: user.username
        }, process.env.jwtsecret);
        res.send(token);
    } else {
        res.status(400).send();
    }
})

module.exports = authRouter;