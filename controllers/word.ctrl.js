const express = require('express');
const uuidv4 = require('uuid').v4;
const fs = require(`fs`);
const os = require(`os`);
const word = fs.readFileSync(`./nouns-50.txt`, `utf-8`).split(os.EOL);
console.log(word);
const wordHe = fs.readFileSync(`./nouns-50-he.txt`, `utf-8`).split(os.EOL);
console.log(wordHe);
const wordRouter = express.Router();



wordRouter.get(`/`, function (req, res) {

    const randomWordNo = Math.floor(Math.random() * (word.length));
    console.log(randomWordNo, word[randomWordNo], wordHe[randomWordNo]);

    res.send(word[randomWordNo]);


})
wordRouter.post(`/`, function (req, res) {

    const { user, englishword, hebrewword } = req.body;
    const translateWord =
    {
        "englishword": englishword,
        "hebrewword": hebrewword
    }
    const userTrans = {
        "sourceWord": englishword,
        "correctCounter": 0,
        "wrongCounter": 0
    }
    console.log(userTrans)

    let userFile = [];
    const userFilePath = `./data/${user}.json`;
    try {
        const file = fs.readFileSync(userFilePath, 'utf-8');
        userFile = JSON.parse(file);
    } catch (ex) {
        fs.writeFileSync(userFilePath, '[]');
    }

    const uIdx = userFile.findIndex(e => e.sourceWord === translateWord.englishword);


    wIdx = word.findIndex(e => e == translateWord.englishword);
    console.log(wIdx);
    if (translateWord.hebrewword === wordHe[wIdx]) {
        if (uIdx > -1) {
            userFile[uIdx].correctCounter++;
            console.log(uIdx)
            fs.writeFileSync(userFilePath, JSON.stringify(userFile));
            res.send("succes");

        }
        else {
            userTrans.correctCounter++;
            userFile.push(userTrans)
            console.log(userFile)
            fs.writeFileSync(userFilePath, JSON.stringify(userFile));
            res.send(true);
        }

    }
    else {
        if (uIdx > -1) {
            userFile[uIdx].wrongCounter++
            fs.writeFileSync(userFilePath, JSON.stringify(userFile));
            res.send(`not succes`)

        }
        else {
            userTrans.wrongCounter++;
            userFile.push(userTrans)
            fs.writeFileSync(userFilePath, JSON.stringify(userFile));
            res.send(false);
        }

    }

})



module.exports = wordRouter; 