const express = require(`express`);
const app = express();
const PORT = 9898;

const fs = require(`fs`);
const os = require(`os`);
const word = fs.readFileSync(`./nouns-50.txt`, `utf-8`).split(os.EOL);
const wordHe = fs.readFileSync(`./nouns-50-he.txt`, `utf-8`).split(os.EOL);


const wordCtrl = require(`./controllers/word.ctrl`);
const statsCtrl = require(`./controllers/stats.ctrl`)

app.use('/', express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/api/word', wordCtrl);

app.use(`/api/stats`, statsCtrl);

app.listen(PORT, () => console.log(`server started at port ${PORT}`))

