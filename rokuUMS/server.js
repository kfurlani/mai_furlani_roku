const express = require('express');
const app = express();

const port = process.env.PORT || 5056;

//This bit of config enables our express app to read incoming data payloads
//via our routes - the user data we pass in via the fetch call ib the login component
//we can use a JSIN encodes object or URL patameters / form data to pass our user data in 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/ums', require('./routes/api'));

app.listen(port, () => {
    console.log(`ums is running at port ${port}`);
})