const express = require('express');
const uuidv4 = require('uuid').v4;
const fs = require(`fs`);
const os = require(`os`);

const statsRouter = express.Router();

statsRouter.get(`/`, function (req, res) {
    const statsUser = JSON.parse(fs.readFileSync(`./data/user1.json`, 'utf-8'));


    res.send(statsUser);


})

module.exports = statsRouter;