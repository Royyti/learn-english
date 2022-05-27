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

    const translateWord =
    {
        "englishword": req.body[`englishword`],
        "hebrewword": req.body[`hebrewword`]
    }
    const userTrans = {
        "sourceWord": req.body[`englishword`],
        "correctCounter": 0,
        "wrongCounter": 0
    }
    console.log(userTrans)
    //const userFile = require(`user1.json`);
    const userFile = JSON.parse(fs.readFileSync(`./data/user1.json`, 'utf-8'));

    const uIdx = userFile.findIndex(e => e.sourceWord === translateWord.englishword);


    wIdx = word.findIndex(e => e == translateWord.englishword);
    console.log(wIdx);
    if (translateWord.hebrewword === wordHe[wIdx]) {
        if (uIdx > -1) {
            userFile[uIdx].correctCounter++;
            console.log(uIdx)
            fs.writeFileSync('./data/user1.json', JSON.stringify(userFile));
            res.send("succes");

        }
        else {
            userTrans.correctCounter++;
            userFile.push(userTrans)
            console.log(userFile)
            fs.writeFileSync('./data/user1.json', JSON.stringify(userFile));
            res.send(true);
        }

    }
    else {
        if (uIdx > -1) {
            userFile[uIdx].wrongCounter++
            fs.writeFileSync('./data/user1.json', JSON.stringify(userFile));
            res.send(`not succes`)

        }
        else {
            userTrans.wrongCounter++;
            userFile.push(userTrans)
            fs.writeFileSync('./data/user1.json', JSON.stringify(userFile));
            res.send(false);
        }

    }

})



module.exports = wordRouter; 