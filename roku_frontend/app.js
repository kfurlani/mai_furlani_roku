const express = require('express');
const app = express();

const port = process.env.PORT || 3012;

app.use(express.static('public'));

app.use('/ums', require('./routes/api'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})