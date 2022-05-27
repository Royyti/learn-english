const express = require(`express`);
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 9898;

process.env.jwtsecret = 'aasdj23iodj23dcj23podfjk23pfj23p';

const wordCtrl = require(`./controllers/word.ctrl`);
const statsCtrl = require(`./controllers/stats.ctrl`);
const authCtrl = require(`./controllers/auth.ctrl`);

app.use('/', express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(`/api/auth`, authCtrl);

app.use('*', function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(400).send();

    const [tokenType, jwtToken] = token.split(' ');
    try {
        jwt.verify(jwtToken, process.env.jwtsecret);
    } catch (ex) {
        console.log(ex);
        return res.status(400).send();
    }
    const { user } = jwt.decode(jwtToken);
    req.body.user = user;
    next();
})

app.use('/api/word', wordCtrl);
app.use(`/api/stats`, statsCtrl);

app.listen(PORT, () => console.log(`server started at port ${PORT}`))

