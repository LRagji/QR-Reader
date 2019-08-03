const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const basicAuth = require('express-basic-auth')
let apppassword = "laukik";

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'Imb4T3st4',
    unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
    return 'Your donot have permission to view/use this app, please contact support for the same.'
}

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'user');
    const passwordMatches = basicAuth.safeCompare(password, apppassword);

    return userMatches & passwordMatches;
}

//GET home route
app.get('/', express.static('static'));

app.get('/console', (req, res) => {
    if (req.query.p == undefined) {
        res.status(404).end();
        return;
    }

    apppassword = req.query.p;
    res.send("Password Changed sucessfully.");
});

// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem'),
    passphrase: 'P@55word'
}, app)
    .listen(8080, () => {
        console.log("Server running on secured port!");
    });