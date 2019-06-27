const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

//GET home route
app.get('/', express.static('static'));

// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem'),
    passphrase: 'P@55word'
}, app)
    .listen(443, () => {
        console.log("Server running on secured port!");
    });