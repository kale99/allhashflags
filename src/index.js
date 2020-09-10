require('./bot')
const express = require('express');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.use('/', express.static(path.join(__dirname)));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.listen(PORT, () => console.log('All hashflags is alive!'));










