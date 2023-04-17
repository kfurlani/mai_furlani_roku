const express = require('express');
const app = express();

const port = process.env.PORT || 3003;
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.use('/ums', require('./routes/index'));

app.listen(port, ()=> {
    console.log(`app is running on ${port}`);
})